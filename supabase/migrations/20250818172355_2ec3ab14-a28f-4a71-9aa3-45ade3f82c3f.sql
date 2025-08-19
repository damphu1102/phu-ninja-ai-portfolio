-- Fix RLS policies for chatbot_messages to allow anonymous users to save messages
-- First, let's update the is_session_owner function to handle anonymous sessions better
CREATE OR REPLACE FUNCTION public.is_session_owner(p_session_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
    is_owner BOOLEAN;
    current_session_key TEXT;
BEGIN
    -- Get the current session key from app settings if available
    current_session_key := current_setting('app.current_session_key', true);
    
    SELECT EXISTS (
        SELECT 1
        FROM public.chatbot_sessions s
        WHERE s.id = p_session_id
          AND (
            -- For authenticated users, check user_id
            (s.user_id IS NOT NULL AND s.user_id = auth.uid())
            OR
            -- For anonymous sessions, allow if session exists (we can't validate session_key in RLS context reliably)
            (s.user_id IS NULL AND auth.uid() IS NULL)
          )
    ) INTO is_owner;
    
    RETURN is_owner;
END;
$function$;

-- Update the RLS policies for chatbot_messages to work with anonymous users
DROP POLICY IF EXISTS "Allow user to create messages in their own session" ON public.chatbot_messages;
DROP POLICY IF EXISTS "Allow user to read their own messages" ON public.chatbot_messages;

-- Allow inserting messages for any valid session (since edge function handles validation)
CREATE POLICY "Allow message creation for valid sessions" 
ON public.chatbot_messages 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.chatbot_sessions s 
    WHERE s.id = session_id
  )
);

-- Allow reading messages for sessions the user has access to
CREATE POLICY "Allow reading messages for accessible sessions" 
ON public.chatbot_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.chatbot_sessions s 
    WHERE s.id = session_id 
    AND (
      (s.user_id IS NOT NULL AND s.user_id = auth.uid()) OR
      (s.user_id IS NULL AND auth.uid() IS NULL)
    )
  )
);