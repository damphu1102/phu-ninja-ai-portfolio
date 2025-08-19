-- Check if students table exists and create policies for public access
-- Create policy to allow public insertion into students table
CREATE POLICY "Allow public insertions into students table" 
ON public.students
FOR INSERT 
TO public
WITH CHECK (true);

-- Create policy to allow public reading from students table (if needed for admin)
CREATE POLICY "Allow public read access to students table" 
ON public.students
FOR SELECT 
TO public
USING (true);