-- Fix UUID generation for chatbot_sessions table
ALTER TABLE public.chatbot_sessions ALTER COLUMN id SET DEFAULT uuid_generate_v4();