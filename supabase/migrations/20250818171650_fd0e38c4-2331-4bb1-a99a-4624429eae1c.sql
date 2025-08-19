-- Fix RLS policies for chatbot_sessions to allow anonymous session creation
DROP POLICY IF EXISTS "Allow public inserts on chatbot_sessions" ON public.chatbot_sessions;

-- Create a new policy that allows anonymous users to create sessions
CREATE POLICY "Allow anonymous session creation" 
ON public.chatbot_sessions 
FOR INSERT 
WITH CHECK (
  -- Allow if user is not authenticated (anonymous) or if user_id matches auth user
  auth.uid() IS NULL OR user_id = auth.uid() OR user_id IS NULL
);

-- Also ensure the SELECT policy works for anonymous users with session_key
DROP POLICY IF EXISTS "Allow session owner to read sessions" ON public.chatbot_sessions;

CREATE POLICY "Allow session access by owner or session key" 
ON public.chatbot_sessions 
FOR SELECT 
USING (
  -- Allow if user owns the session OR if it's an anonymous session with matching session_key
  (user_id IS NOT NULL AND user_id = auth.uid()) OR 
  (user_id IS NULL AND session_key IS NOT NULL)
);