-- Create users table for student profiles
CREATE TABLE public.users (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15),
    name VARCHAR(255) NOT NULL,
    class_level INTEGER CHECK (class_level IN (10, 11, 12)),
    age INTEGER,
    gender VARCHAR(10),
    location_state VARCHAR(100),
    location_district VARCHAR(100),
    interests TEXT[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users
CREATE POLICY "Users can view their own profile" 
ON public.users 
FOR SELECT 
USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" 
ON public.users 
FOR UPDATE 
USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert their own profile" 
ON public.users 
FOR INSERT 
WITH CHECK (auth.uid()::text = id::text);

-- Create streams table
CREATE TABLE public.streams (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    requirements TEXT[],
    career_prospects TEXT[],
    icon VARCHAR(50),
    color VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for streams (public read access)
ALTER TABLE public.streams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Streams are viewable by everyone" 
ON public.streams 
FOR SELECT 
USING (true);

-- Create assessments table
CREATE TABLE public.assessments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    assessment_type VARCHAR(50) NOT NULL DEFAULT 'aptitude',
    questions JSONB NOT NULL,
    answers JSONB NOT NULL,
    scores JSONB NOT NULL,
    personality_traits JSONB,
    completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for assessments
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own assessments" 
ON public.assessments 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own assessments" 
ON public.assessments 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

-- Create colleges table
CREATE TABLE public.colleges (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location_state VARCHAR(100),
    location_district VARCHAR(100),
    location_city VARCHAR(100),
    address TEXT,
    contact_phone VARCHAR(15),
    contact_email VARCHAR(255),
    website VARCHAR(255),
    facilities TEXT[],
    courses_offered TEXT[],
    is_government BOOLEAN DEFAULT true,
    rating DECIMAL(2,1) DEFAULT 0.0,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for colleges (public read access)
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Colleges are viewable by everyone" 
ON public.colleges 
FOR SELECT 
USING (true);

-- Create recommendations table
CREATE TABLE public.recommendations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    assessment_id UUID REFERENCES public.assessments(id),
    recommended_streams TEXT[],
    recommended_courses TEXT[],
    recommended_colleges UUID[],
    confidence_score DECIMAL(3,2),
    reasoning TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for recommendations
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own recommendations" 
ON public.recommendations 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own recommendations" 
ON public.recommendations 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

-- Insert sample streams data
INSERT INTO public.streams (name, description, requirements, career_prospects, icon, color) VALUES
('Science', 'Physics, Chemistry, Mathematics, and Biology - opens doors to engineering, medicine, and research', 
 ARRAY['Strong mathematical foundation', 'Analytical thinking', 'Scientific curiosity'], 
 ARRAY['Engineering', 'Medicine', 'Research', 'Data Science', 'Biotechnology'], 
 'microscope', 'blue'),
('Commerce', 'Business, Economics, and Accounting - pathway to business and finance careers', 
 ARRAY['Numerical ability', 'Business acumen', 'Communication skills'], 
 ARRAY['Business Management', 'Chartered Accountancy', 'Banking', 'Finance', 'Economics'], 
 'trending-up', 'green'),
('Arts/Humanities', 'Literature, History, Psychology, and Social Sciences - develops critical thinking and creativity', 
 ARRAY['Creative thinking', 'Communication skills', 'Cultural awareness'], 
 ARRAY['Literature', 'Psychology', 'Journalism', 'Law', 'Social Work', 'Civil Services'], 
 'book-open', 'purple'),
('Vocational', 'Skill-based training for immediate employment opportunities', 
 ARRAY['Practical skills', 'Technical aptitude', 'Hands-on learning'], 
 ARRAY['IT Support', 'Digital Marketing', 'Healthcare Support', 'Hospitality', 'Retail Management'], 
 'wrench', 'orange');

-- Insert sample colleges data
INSERT INTO public.colleges (name, location_state, location_district, location_city, address, website, facilities, courses_offered, rating, image_url) VALUES
('Delhi University', 'Delhi', 'New Delhi', 'New Delhi', 'University Enclave, Delhi', 'https://du.ac.in', 
 ARRAY['Library', 'Sports Complex', 'Hostels', 'Research Labs', 'Cafeteria'], 
 ARRAY['B.A.', 'B.Sc.', 'B.Com.', 'B.Tech.', 'M.A.', 'M.Sc.'], 4.5, ''),
('Jawaharlal Nehru University', 'Delhi', 'New Delhi', 'New Delhi', 'New Mehrauli Road, Delhi', 'https://jnu.ac.in', 
 ARRAY['Central Library', 'Computer Center', 'Health Center', 'Cultural Center'], 
 ARRAY['B.A.', 'M.A.', 'M.Phil.', 'Ph.D.'], 4.3, ''),
('Indian Institute of Technology, Delhi', 'Delhi', 'New Delhi', 'New Delhi', 'Hauz Khas, Delhi', 'https://iitd.ac.in', 
 ARRAY['Advanced Labs', 'Innovation Hub', 'Sports Facilities', 'Hostels'], 
 ARRAY['B.Tech.', 'M.Tech.', 'Ph.D.'], 4.8, ''),
('Mumbai University', 'Maharashtra', 'Mumbai', 'Mumbai', 'Fort, Mumbai', 'https://mu.ac.in', 
 ARRAY['Library', 'Auditorium', 'Sports Ground', 'Computer Labs'], 
 ARRAY['B.A.', 'B.Sc.', 'B.Com.', 'M.A.', 'M.Sc.'], 4.2, '');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on users table
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();