-- Fix security warnings: Enable RLS on app_settings table
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for app_settings (admin only)
CREATE POLICY "Only authenticated users can read app_settings"
ON public.app_settings
FOR SELECT
USING (auth.role() = 'authenticated');

-- Fix function search path security warnings
ALTER FUNCTION public.update_session_end_at() SET search_path = '';
ALTER FUNCTION public.is_session_owner(UUID) SET search_path = '';