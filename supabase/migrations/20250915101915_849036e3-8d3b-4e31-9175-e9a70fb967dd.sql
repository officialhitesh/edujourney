-- First, let's check and adjust the colleges table structure for longer content
-- Update colleges table to handle longer content properly  
ALTER TABLE public.colleges 
ALTER COLUMN name TYPE text,
ALTER COLUMN location_city TYPE text,
ALTER COLUMN location_state TYPE text,
ALTER COLUMN location_district TYPE text,
ALTER COLUMN website TYPE text,
ALTER COLUMN contact_email TYPE text,
ALTER COLUMN contact_phone TYPE text;

-- Create a separate table for college rankings and placement data
CREATE TABLE IF NOT EXISTS public.college_rankings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    college_id UUID NOT NULL,
    all_india_rank INTEGER,
    state_rank INTEGER,
    placement_performance DECIMAL(5,2),
    research_output DECIMAL(5,2),
    industry_integration DECIMAL(5,2),
    overall_index_score DECIMAL(7,2),
    average_package_lpa DECIMAL(5,2),
    highest_package_lpa DECIMAL(6,2),
    placement_percentage DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on college_rankings
ALTER TABLE public.college_rankings ENABLE ROW LEVEL SECURITY;

-- Create policies for college rankings
CREATE POLICY "College rankings are viewable by everyone" 
ON public.college_rankings 
FOR SELECT 
USING (true);

-- Add foreign key constraint
ALTER TABLE public.college_rankings 
ADD CONSTRAINT fk_college_rankings_college_id 
FOREIGN KEY (college_id) REFERENCES public.colleges(id);

-- Create an index on all_india_rank for faster queries
CREATE INDEX IF NOT EXISTS idx_college_rankings_all_india_rank ON public.college_rankings(all_india_rank);

-- Create trigger for automatic timestamp updates on college_rankings
DROP TRIGGER IF EXISTS update_college_rankings_updated_at ON public.college_rankings;
CREATE TRIGGER update_college_rankings_updated_at
BEFORE UPDATE ON public.college_rankings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();