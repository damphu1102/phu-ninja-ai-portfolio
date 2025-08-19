-- Kích hoạt extension `uuid-ossp` để sử dụng hàm uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bảng 1: students - Lưu trữ thông tin ứng viên
CREATE TABLE public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK (email LIKE '%@%'),
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    cv_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'interviewed', 'accepted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Bảng 2: chatbot_sessions - Quản lý các phiên trò chuyện
CREATE TABLE public.chatbot_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.students(id) ON DELETE SET NULL,
    session_start_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    session_end_at TIMESTAMP WITH TIME ZONE,
    session_key TEXT UNIQUE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'ended'))
);

-- Bảng 3: chatbot_messages - Lưu trữ lịch sử tin nhắn
CREATE TABLE public.chatbot_messages (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    session_id UUID NOT NULL REFERENCES public.chatbot_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Bảng 4: app_settings - Lưu trữ cấu hình chung
CREATE TABLE public.app_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT
);

-- Tạo chỉ mục để tăng tốc độ truy vấn
CREATE INDEX idx_students_email ON public.students(email);
CREATE INDEX idx_chatbot_messages_session_id ON public.chatbot_messages(session_id);

-- Tạo hàm trigger để tự động cập nhật session_end_at
CREATE OR REPLACE FUNCTION public.update_session_end_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'ended' AND OLD.status IS DISTINCT FROM 'ended' THEN
        NEW.session_end_at := NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Gán trigger vào bảng chatbot_sessions
CREATE TRIGGER on_session_status_change
BEFORE UPDATE ON public.chatbot_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_session_end_at();

-- Kích hoạt RLS trên bảng tin nhắn
ALTER TABLE public.chatbot_messages ENABLE ROW LEVEL SECURITY;

-- Tạo hàm trợ giúp để kiểm tra quyền sở hữu phiên
CREATE OR REPLACE FUNCTION public.is_session_owner(p_session_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    is_owner BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM public.chatbot_sessions s
        WHERE s.id = p_session_id
          AND (
            (s.user_id IS NOT NULL AND s.user_id = auth.uid())
            OR
            (s.user_id IS NULL AND s.session_key = current_setting('app.current_session_key', true))
          )
    ) INTO is_owner;
    RETURN is_owner;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Tạo chính sách RLS cho phép người dùng ĐỌC tin nhắn của chính họ
CREATE POLICY "Allow user to read their own messages"
ON public.chatbot_messages
FOR SELECT
USING (public.is_session_owner(session_id));

-- Tạo chính sách RLS cho phép người dùng TẠO MỚI tin nhắn trong phiên của họ
CREATE POLICY "Allow user to create messages in their own session"
ON public.chatbot_messages
FOR INSERT
WITH CHECK (public.is_session_owner(session_id));

-- Enable RLS cho students table để cho phép public insert
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Policy cho phép INSERT công khai (để form có thể submit)
CREATE POLICY "Allow public inserts on students"
ON public.students
FOR INSERT
WITH CHECK (true);

-- Policy cho phép SELECT (nếu cần admin xem)
CREATE POLICY "Allow authenticated selects on students"
ON public.students
FOR SELECT
USING (auth.role() = 'authenticated');

-- Enable RLS cho chatbot_sessions
ALTER TABLE public.chatbot_sessions ENABLE ROW LEVEL SECURITY;

-- Policy cho phép INSERT công khai cho sessions
CREATE POLICY "Allow public inserts on chatbot_sessions"
ON public.chatbot_sessions
FOR INSERT
WITH CHECK (true);

-- Policy cho phép SELECT sessions
CREATE POLICY "Allow session owner to read sessions"
ON public.chatbot_sessions
FOR SELECT
USING (
    (user_id IS NOT NULL AND user_id = auth.uid())
    OR
    (user_id IS NULL AND session_key = current_setting('app.current_session_key', true))
);