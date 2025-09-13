-- Create student_form table for assessment submissions
CREATE TABLE public.student_form (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  class TEXT NOT NULL,
  interests TEXT NOT NULL,
  weak_subjects TEXT,
  marks TEXT NOT NULL,
  career_interest TEXT NOT NULL,
  stream TEXT,
  exam_preference TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.student_form ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own form submissions" 
ON public.student_form 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own form submissions" 
ON public.student_form 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own form submissions" 
ON public.student_form 
FOR UPDATE 
USING (auth.uid() = user_id);