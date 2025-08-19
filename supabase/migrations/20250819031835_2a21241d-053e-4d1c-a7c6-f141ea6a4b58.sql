-- Create storage bucket for CV uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('ninja-ai-uploads', 'ninja-ai-uploads', true, 10485760)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit;

-- Create policies for ninja-ai-uploads bucket
CREATE POLICY "Allow public uploads to ninja-ai-uploads bucket" 
ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'ninja-ai-uploads');

CREATE POLICY "Allow public access to ninja-ai-uploads bucket" 
ON storage.objects
FOR SELECT 
USING (bucket_id = 'ninja-ai-uploads');

CREATE POLICY "Allow public updates to ninja-ai-uploads bucket" 
ON storage.objects
FOR UPDATE 
USING (bucket_id = 'ninja-ai-uploads') 
WITH CHECK (bucket_id = 'ninja-ai-uploads');

CREATE POLICY "Allow public deletes from ninja-ai-uploads bucket" 
ON storage.objects
FOR DELETE 
USING (bucket_id = 'ninja-ai-uploads');