import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const { message, sessionId, sessionKey } = await req.json();

    console.log('Received chat request:', { message, sessionId, sessionKey });

    // Validate required fields
    if (!message || (!sessionId && !sessionKey)) {
      return new Response(
        JSON.stringify({ error: 'Thiếu thông tin yêu cầu' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    let currentSessionId = sessionId;

    // If no sessionId provided, create a new session for anonymous user
    if (!currentSessionId && sessionKey) {
      // First try to find existing session with this key
      const { data: existingSession } = await supabase
        .from('chatbot_sessions')
        .select('id')
        .eq('session_key', sessionKey)
        .eq('user_id', null)
        .single();

      if (existingSession) {
        currentSessionId = existingSession.id;
      } else {
        // Create new session with retry logic for unique constraint violations
        let retryCount = 0;
        const maxRetries = 3;
        
        while (retryCount < maxRetries) {
          const uniqueSessionKey = `${sessionKey}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
          
          const { data: newSession, error: sessionError } = await supabase
            .from('chatbot_sessions')
            .insert([
              {
                session_key: uniqueSessionKey,
                user_id: null,
                status: 'active'
              }
            ])
            .select()
            .single();

          if (!sessionError) {
            currentSessionId = newSession.id;
            break;
          } else if (sessionError.code === '23505') {
            // Duplicate key error, retry with new key
            retryCount++;
            continue;
          } else {
            // Other error, throw
            console.error('Session creation error:', sessionError);
            return new Response(
              JSON.stringify({ error: 'Không thể tạo phiên trò chuyện' }),
              {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              }
            );
          }
        }

        if (retryCount >= maxRetries) {
          console.error('Failed to create session after retries');
          return new Response(
            JSON.stringify({ error: 'Không thể tạo phiên trò chuyện sau nhiều lần thử' }),
            {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
      }
    }

    // Save user message to database
    const { error: messageError } = await supabase
      .from('chatbot_messages')
      .insert([
        {
          session_id: currentSessionId,
          role: 'user',
          content: message
        }
      ]);

    if (messageError) {
      console.error('Error saving user message:', messageError);
    }

    // Get conversation history for context
    const { data: messageHistory } = await supabase
      .from('chatbot_messages')
      .select('role, content')
      .eq('session_id', currentSessionId)
      .order('created_at', { ascending: true })
      .limit(10);

    // Prepare conversation context for Gemini
    const conversationHistory = messageHistory?.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    })) || [];

    // Add current message
    conversationHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: conversationHistory,
        systemInstruction: {
          parts: [
            {
              text: `Bạn là PhúGPT, trợ lý AI của Đàm Hữu Phú và chương trình Thực tập sinh Ninja AI. Hãy trả lời bằng tiếng Việt một cách thân thiện và hữu ích.

QUAN TRỌNG: Tất cả câu trả lời PHẢI được định dạng bằng HTML thuần túy. KHÔNG sử dụng Markdown. Sử dụng các thẻ HTML như <p>, <strong>, <em>, <ul>, <li>, <br> để định dạng nội dung.

Thông tin về Đàm Hữu Phú:
- Tên đầy đủ: Đàm Hữu Phú  
- Nghề nghiệp: Lập trình viên Frontend chuyên nghiệp
- Chuyên môn: Phát triển ứng dụng web hiện đại với ReactJS, NextJS, VueJS
- Kinh nghiệm: Hơn 5 năm trong lĩnh vực Frontend Development
- Thế mạnh: Kết hợp nghệ thuật và công nghệ để tạo ra những sản phẩm web độc đáo
- Kỹ năng: HTML5, CSS3, JavaScript, TypeScript, React, Vue, Node.js, AI/ML Integration
- Sở thích: Tìm hiểu công nghệ mới, ứng dụng AI vào phát triển web
- Triết lý: "Tương lai của AI không phải là thay thế con người, mà là tăng cường khả năng của con người"

Thông tin về chương trình Thực tập sinh Ninja AI:
- Chương trình đào tạo chuyên sâu về AI và phát triển web do Đàm Hữu Phú sáng lập
- Thời gian: 12 tuần (3 tháng) với chương trình intensive
- Mục tiêu: Đào tạo lập trình viên Frontend, Backend, Machine Learning và ứng dụng AI
- Đặc điểm nổi bật:
  + Tập trung vào kỹ năng thực tế và dự án thực tế
  + Hỗ trợ mentor 1:1 từ các chuyên gia
  + Tỷ lệ có việc làm cao (95% sau khi hoàn thành)
  + Đào tạo từ cơ bản đến nâng cao về AI, Machine Learning, Deep Learning, NLP
  + Kết hợp lý thuyết và thực hành trên dự án thực tế
  + Cộng đồng học viên năng động và hỗ trợ lẫn nhau

Công nghệ được dạy trong chương trình thực tập:
- Frontend: HTML5, CSS3, JavaScript, TypeScript, ReactJS, VueJS, TailwindCSS
- Backend: NodeJS, ExpressJS, MongoDB, MySQL, Python
- AI/ML: TensorFlow, PyTorch, OpenAI API, Computer Vision, NLP
- Tools: Git, Docker, AWS, Vercel, Supabase

Kỹ năng cần thiết để tham gia:
- Cơ bản về HTML/CSS, JavaScript
- Hiểu biết cơ bản về lập trình
- Tinh thần học hỏi và không ngại thử thách
- Đam mê với công nghệ và AI

Quy trình ứng tuyển:
1. Điền form ứng tuyển trên trang web
2. Nộp CV và portfolio (nếu có)
3. Viết bài luận ngắn về động lực học AI
4. Phỏng vấn online với mentor
5. Nhận kết quả trong vòng 1 tuần

Học phí và hỗ trợ:
- Học phí ưu đãi cho sinh viên
- Hỗ trợ trả góp
- Cam kết hoàn tiền nếu không tìm được việc trong 6 tháng
- Hỗ trợ tìm việc sau chương trình thực tập

Hãy trả lời ngắn gọn, súc tích và hữu ích bằng HTML thuần túy. Khi không biết thông tin cụ thể, hãy khuyến khích người dùng liên hệ trực tiếp hoặc xem thêm thông tin trên website.`
            }
          ]
        },
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status, await response.text());
      throw new Error('Gemini API request failed');
    }

    const geminiData = await response.json();
    let aiMessage = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'Xin lỗi, tôi không thể trả lời câu hỏi này lúc này.';

    // Remove HTML code block markers if present (both beginning and end)
    aiMessage = aiMessage.replace(/^```html\s*\n?/i, '').replace(/\n?\s*```\s*$/i, '');

    console.log('Gemini response:', aiMessage);

    // Save AI response to database
    const { error: aiMessageError } = await supabase
      .from('chatbot_messages')
      .insert([
        {
          session_id: currentSessionId,
          role: 'assistant',
          content: aiMessage
        }
      ]);

    if (aiMessageError) {
      console.error('Error saving AI message:', aiMessageError);
    }

    return new Response(
      JSON.stringify({ 
        message: aiMessage,
        sessionId: currentSessionId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Chatbot error:', error);
    return new Response(
      JSON.stringify({ error: 'Có lỗi xảy ra khi xử lý yêu cầu' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});