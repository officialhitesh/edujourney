-- Create degrees table
CREATE TABLE public.degrees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  duration_years INTEGER DEFAULT 4,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create specializations table
CREATE TABLE public.specializations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  degree_id UUID NOT NULL REFERENCES public.degrees(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(degree_id, code)
);

-- Create career_roadmaps table
CREATE TABLE public.career_roadmaps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  specialization_id UUID NOT NULL REFERENCES public.specializations(id) ON DELETE CASCADE,
  skills JSONB NOT NULL DEFAULT '[]',
  certifications JSONB NOT NULL DEFAULT '[]',
  projects JSONB NOT NULL DEFAULT '[]',
  higher_studies JSONB NOT NULL DEFAULT '[]',
  entry_roles JSONB NOT NULL DEFAULT '[]',
  avg_salary_min INTEGER,
  avg_salary_max INTEGER,
  top_companies JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roadmaps table to save user selections
CREATE TABLE public.user_roadmaps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  degree_id UUID NOT NULL REFERENCES public.degrees(id) ON DELETE CASCADE,
  specialization_id UUID NOT NULL REFERENCES public.specializations(id) ON DELETE CASCADE,
  roadmap_id UUID NOT NULL REFERENCES public.career_roadmaps(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.degrees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roadmaps ENABLE ROW LEVEL SECURITY;

-- Create policies for degrees (public read)
CREATE POLICY "Degrees are viewable by everyone"
ON public.degrees FOR SELECT
USING (true);

-- Create policies for specializations (public read)
CREATE POLICY "Specializations are viewable by everyone"
ON public.specializations FOR SELECT
USING (true);

-- Create policies for career_roadmaps (public read)
CREATE POLICY "Career roadmaps are viewable by everyone"
ON public.career_roadmaps FOR SELECT
USING (true);

-- Create policies for user_roadmaps (user-specific)
CREATE POLICY "Users can view their own saved roadmaps"
ON public.user_roadmaps FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can save their own roadmaps"
ON public.user_roadmaps FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved roadmaps"
ON public.user_roadmaps FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for updating updated_at timestamp
CREATE TRIGGER update_career_roadmaps_updated_at
BEFORE UPDATE ON public.career_roadmaps
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for degrees
INSERT INTO public.degrees (name, code, description, duration_years) VALUES
('Bachelor of Technology', 'BTECH', 'Engineering degree focusing on technology and applications', 4),
('Bachelor of Business Administration', 'BBA', 'Business management and administration degree', 3),
('Bachelor of Commerce', 'BCOM', 'Commerce and business studies degree', 3),
('Bachelor of Science', 'BSC', 'Science degree with various specializations', 3),
('Bachelor of Arts', 'BA', 'Liberal arts and humanities degree', 3);

-- Insert sample specializations for B.Tech
INSERT INTO public.specializations (degree_id, name, code, description) 
SELECT id, 'Computer Science Engineering', 'CSE', 'Focus on computer systems, programming, and software development'
FROM public.degrees WHERE code = 'BTECH';

INSERT INTO public.specializations (degree_id, name, code, description) 
SELECT id, 'Artificial Intelligence & Machine Learning', 'AIML', 'Specialized focus on AI, ML, and data science'
FROM public.degrees WHERE code = 'BTECH';

INSERT INTO public.specializations (degree_id, name, code, description) 
SELECT id, 'Electronics & Communication', 'ECE', 'Electronics, communication systems, and embedded systems'
FROM public.degrees WHERE code = 'BTECH';

-- Insert sample specializations for BBA
INSERT INTO public.specializations (degree_id, name, code, description) 
SELECT id, 'Marketing', 'MKT', 'Brand management, digital marketing, and consumer behavior'
FROM public.degrees WHERE code = 'BBA';

INSERT INTO public.specializations (degree_id, name, code, description) 
SELECT id, 'Finance', 'FIN', 'Financial analysis, investment management, and banking'
FROM public.degrees WHERE code = 'BBA';

-- Insert sample specializations for B.Com
INSERT INTO public.specializations (degree_id, name, code, description) 
SELECT id, 'Accounting & Finance', 'ACFIN', 'Financial accounting, taxation, and audit'
FROM public.degrees WHERE code = 'BCOM';

-- Insert sample career roadmap for B.Tech CSE
INSERT INTO public.career_roadmaps (
  specialization_id, 
  skills, 
  certifications, 
  projects, 
  higher_studies,
  entry_roles, 
  avg_salary_min, 
  avg_salary_max, 
  top_companies
) 
SELECT 
  s.id,
  '[
    {"phase": "Foundation", "skills": ["Programming Fundamentals (C/C++)", "Data Structures & Algorithms", "Database Management", "Operating Systems"]},
    {"phase": "Intermediate", "skills": ["Web Development (HTML, CSS, JavaScript)", "Object-Oriented Programming (Java/Python)", "Software Engineering", "Computer Networks"]},
    {"phase": "Advanced", "skills": ["System Design", "Cloud Computing (AWS/Azure)", "DevOps & CI/CD", "Microservices Architecture"]}
  ]'::jsonb,
  '[
    {"name": "AWS Cloud Practitioner", "importance": "High"},
    {"name": "Google Cloud Associate", "importance": "High"},
    {"name": "Oracle Java Certification", "importance": "Medium"},
    {"name": "Microsoft Azure Fundamentals", "importance": "Medium"}
  ]'::jsonb,
  '[
    {"name": "E-commerce Website", "description": "Full-stack web application with payment integration"},
    {"name": "Task Management App", "description": "Mobile app with real-time synchronization"},
    {"name": "Social Media Analytics Tool", "description": "Data visualization dashboard"},
    {"name": "Cloud-based File Storage", "description": "Distributed storage system"}
  ]'::jsonb,
  '[
    {"option": "M.Tech in Computer Science", "description": "Advanced technical specialization"},
    {"option": "MBA", "description": "Management and leadership roles"},
    {"option": "MS in USA/Europe", "description": "International exposure and opportunities"}
  ]'::jsonb,
  '[
    {"role": "Software Developer", "description": "Entry-level programming position"},
    {"role": "Frontend Developer", "description": "UI/UX focused development"},
    {"role": "Backend Developer", "description": "Server-side development"},
    {"role": "Full Stack Developer", "description": "Complete web development"},
    {"role": "Quality Assurance Engineer", "description": "Software testing and quality"}
  ]'::jsonb,
  400000,
  800000,
  '[
    {"name": "TCS", "type": "Service"},
    {"name": "Infosys", "type": "Service"},
    {"name": "Google", "type": "Product"},
    {"name": "Microsoft", "type": "Product"},
    {"name": "Amazon", "type": "Product"},
    {"name": "Flipkart", "type": "Product"},
    {"name": "Wipro", "type": "Service"},
    {"name": "Accenture", "type": "Consulting"}
  ]'::jsonb
FROM public.specializations s
JOIN public.degrees d ON s.degree_id = d.id
WHERE d.code = 'BTECH' AND s.code = 'CSE';

-- Insert sample career roadmap for B.Tech AIML
INSERT INTO public.career_roadmaps (
  specialization_id, 
  skills, 
  certifications, 
  projects, 
  higher_studies,
  entry_roles, 
  avg_salary_min, 
  avg_salary_max, 
  top_companies
) 
SELECT 
  s.id,
  '[
    {"phase": "Foundation", "skills": ["Python Programming", "Mathematics for ML", "Statistics & Probability", "Data Structures & Algorithms"]},
    {"phase": "Intermediate", "skills": ["Machine Learning Algorithms", "Deep Learning & Neural Networks", "Data Analysis (Pandas, NumPy)", "Data Visualization"]},
    {"phase": "Advanced", "skills": ["Natural Language Processing", "Computer Vision", "MLOps & Model Deployment", "Big Data Technologies"]}
  ]'::jsonb,
  '[
    {"name": "TensorFlow Developer Certificate", "importance": "High"},
    {"name": "AWS Machine Learning Specialty", "importance": "High"},
    {"name": "Google Professional ML Engineer", "importance": "High"},
    {"name": "Microsoft Azure AI Engineer", "importance": "Medium"}
  ]'::jsonb,
  '[
    {"name": "Customer Churn Prediction", "description": "ML model to predict customer behavior"},
    {"name": "Image Classification System", "description": "Deep learning for image recognition"},
    {"name": "Sentiment Analysis Tool", "description": "NLP for social media monitoring"},
    {"name": "Recommendation Engine", "description": "Personalized content suggestions"}
  ]'::jsonb,
  '[
    {"option": "M.Tech in AI/ML", "description": "Advanced AI research and development"},
    {"option": "MS in Data Science", "description": "International data science programs"},
    {"option": "PhD in AI", "description": "Research and academia career path"}
  ]'::jsonb,
  '[
    {"role": "ML Engineer", "description": "Develop and deploy ML models"},
    {"role": "Data Scientist", "description": "Extract insights from data"},
    {"role": "AI Developer", "description": "Build AI-powered applications"},
    {"role": "Data Analyst", "description": "Analyze business data for insights"},
    {"role": "Research Assistant", "description": "Support AI research projects"}
  ]'::jsonb,
  500000,
  1200000,
  '[
    {"name": "Google", "type": "Product"},
    {"name": "Microsoft", "type": "Product"},
    {"name": "Amazon", "type": "Product"},
    {"name": "Netflix", "type": "Product"},
    {"name": "Uber", "type": "Product"},
    {"name": "Flipkart", "type": "Product"},
    {"name": "Zomato", "type": "Product"},
    {"name": "PayTM", "type": "Fintech"}
  ]'::jsonb
FROM public.specializations s
JOIN public.degrees d ON s.degree_id = d.id
WHERE d.code = 'BTECH' AND s.code = 'AIML';