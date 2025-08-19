-- Ensure UUID extension is enabled for chatbot_sessions table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Check if chatbot tables exist and create if missing
DO $$
BEGIN
    -- Create chatbot_sessions table if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'chatbot_sessions') THEN
        CREATE TABLE public.chatbot_sessions (
            id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID,
            session_start_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            session_end_at TIMESTAMP WITH TIME ZONE,
            session_key TEXT,
            status TEXT NOT NULL DEFAULT 'active'
        );
        
        -- Enable RLS
        ALTER TABLE public.chatbot_sessions ENABLE ROW LEVEL SECURITY;
        
        -- Create policies
        CREATE POLICY "Allow public inserts on chatbot_sessions" 
        ON public.chatbot_sessions 
        FOR INSERT WITH CHECK (true);
        
        CREATE POLICY "Allow session owner to read sessions" 
        ON public.chatbot_sessions 
        FOR SELECT USING (
            (user_id IS NOT NULL AND user_id = auth.uid()) OR 
            (user_id IS NULL AND session_key = current_setting('app.current_session_key', true))
        );
    END IF;
    
    -- Create chatbot_messages table if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'chatbot_messages') THEN
        CREATE TABLE public.chatbot_messages (
            id BIGSERIAL PRIMARY KEY,
            session_id UUID NOT NULL,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        );
        
        -- Enable RLS
        ALTER TABLE public.chatbot_messages ENABLE ROW LEVEL SECURITY;
        
        -- Create policies
        CREATE POLICY "Allow user to read their own messages" 
        ON public.chatbot_messages 
        FOR SELECT USING (is_session_owner(session_id));
        
        CREATE POLICY "Allow user to create messages in their own session" 
        ON public.chatbot_messages 
        FOR INSERT WITH CHECK (is_session_owner(session_id));
    END IF;
END
$$;