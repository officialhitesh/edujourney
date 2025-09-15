-- Populate colleges table with sample data for Find College feature
INSERT INTO public.colleges (name, location_city, location_state, location_district, address, image_url, is_government, rating, courses_offered, facilities, website, contact_email, contact_phone) VALUES
-- IITs
('IIT Bombay - Indian Institute of Technology', 'Mumbai', 'Maharashtra', 'Mumbai', 'Powai, Mumbai, Maharashtra 400076', 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 9.5, ARRAY['B.Tech', 'M.Tech', 'PhD', 'MBA'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Research Labs', 'Cafeteria'], 'https://www.iitb.ac.in', 'info@iitb.ac.in', '+91-22-2572-2545'),
('IIT Delhi - Indian Institute of Technology', 'Delhi', 'Delhi', 'South Delhi', 'Hauz Khas, New Delhi 110016', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 9.4, ARRAY['B.Tech', 'M.Tech', 'PhD', 'MBA'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Research Labs', 'Medical Center'], 'https://www.iitd.ac.in', 'info@iitd.ac.in', '+91-11-2659-1999'),
('IIT Madras - Indian Institute of Technology', 'Chennai', 'Tamil Nadu', 'Chennai', 'Sardar Patel Road, Chennai 600036', 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 9.3, ARRAY['B.Tech', 'M.Tech', 'PhD', 'MBA'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Research Labs', 'Swimming Pool'], 'https://www.iitm.ac.in', 'info@iitm.ac.in', '+91-44-2257-4802'),
('IIT Kanpur - Indian Institute of Technology', 'Kanpur', 'Uttar Pradesh', 'Kanpur', 'Kalyanpur, Kanpur 208016', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 9.2, ARRAY['B.Tech', 'M.Tech', 'PhD', 'MBA'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Research Labs', 'Auditorium'], 'https://www.iitk.ac.in', 'info@iitk.ac.in', '+91-512-259-7999'),
('IIT Kharagpur - Indian Institute of Technology', 'Kharagpur', 'West Bengal', 'West Midnapore', 'Kharagpur 721302', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 9.1, ARRAY['B.Tech', 'M.Tech', 'PhD', 'MBA'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Research Labs', 'Technology Park'], 'https://www.iitkgp.ac.in', 'info@iitkgp.ac.in', '+91-3222-255-221'),

-- IIMs
('IIM Ahmedabad - Indian Institute of Management', 'Ahmedabad', 'Gujarat', 'Ahmedabad', 'Vastrapur, Ahmedabad 380015', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 9.0, ARRAY['MBA', 'PGDM', 'PhD', 'Executive Programs'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Computer Center', 'Conference Halls'], 'https://www.iima.ac.in', 'info@iima.ac.in', '+91-79-6632-4725'),
('IIM Calcutta - Indian Institute of Management', 'Kolkata', 'West Bengal', 'Kolkata', 'Joka, Diamond Harbour Road, Kolkata 700104', 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 8.9, ARRAY['MBA', 'PGDM', 'PhD', 'Executive Programs'], ARRAY['Library', 'Hostels', 'Sports Complex', 'IT Center', 'Auditorium'], 'https://www.iimcal.ac.in', 'info@iimcal.ac.in', '+91-33-2467-8300'),
('IIM Bangalore - Indian Institute of Management', 'Bangalore', 'Karnataka', 'Bangalore Urban', 'Bannerghatta Road, Bangalore 560076', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 8.8, ARRAY['MBA', 'PGDM', 'PhD', 'Executive Programs'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Management Center', 'Guest House'], 'https://www.iimb.ac.in', 'info@iimb.ac.in', '+91-80-2699-3000'),

-- NITs
('NIT Trichy - National Institute of Technology', 'Tiruchirappalli', 'Tamil Nadu', 'Tiruchirappalli', 'Tiruchirappalli 620015', 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 8.7, ARRAY['B.Tech', 'M.Tech', 'MBA', 'PhD'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Computer Center', 'Workshop'], 'https://www.nitt.edu', 'info@nitt.edu', '+91-431-250-3000'),
('NIT Warangal - National Institute of Technology', 'Warangal', 'Telangana', 'Warangal Urban', 'Warangal 506004', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 8.6, ARRAY['B.Tech', 'M.Tech', 'MBA', 'PhD'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Innovation Center', 'Medical Center'], 'https://www.nitw.ac.in', 'info@nitw.ac.in', '+91-870-246-2000'),

-- Delhi University Colleges
('St. Stephens College', 'Delhi', 'Delhi', 'North Delhi', 'University Enclave, Delhi 110007', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 8.5, ARRAY['B.A.', 'B.Sc.', 'B.Com.', 'M.A.', 'M.Sc.'], ARRAY['Library', 'Hostels', 'Sports Ground', 'Chapel', 'Computer Lab'], 'https://www.ststephens.edu', 'info@ststephens.edu', '+91-11-2766-7271'),
('Lady Shri Ram College for Women', 'Delhi', 'Delhi', 'South Delhi', 'Lajpat Nagar IV, New Delhi 110024', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 8.4, ARRAY['B.A.', 'B.Sc.', 'B.Com.', 'M.A.', 'M.Sc.'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Auditorium', 'Canteen'], 'https://www.lsr.edu.in', 'info@lsr.edu.in', '+91-11-2464-3000'),
('Hindu College', 'Delhi', 'Delhi', 'North Delhi', 'University Enclave, Delhi 110007', 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 8.3, ARRAY['B.A.', 'B.Sc.', 'B.Com.', 'M.A.', 'M.Sc.'], ARRAY['Library', 'Sports Ground', 'Computer Lab', 'Cafeteria', 'Seminar Hall'], 'https://www.hinducollege.ac.in', 'info@hinducollege.ac.in', '+91-11-2766-7342'),

-- Private Colleges
('BITS Pilani', 'Pilani', 'Rajasthan', 'Jhunjhunu', 'Pilani 333031, Rajasthan', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', false, 8.2, ARRAY['B.E.', 'B.Tech', 'MBA', 'M.Tech', 'PhD'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Innovation Center', 'Food Court'], 'https://www.bits-pilani.ac.in', 'info@pilani.bits-pilani.ac.in', '+91-1596-242-204'),
('VIT Vellore - Vellore Institute of Technology', 'Vellore', 'Tamil Nadu', 'Vellore', 'Tiruvalam Road, Vellore 632014', 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', false, 8.1, ARRAY['B.Tech', 'M.Tech', 'MBA', 'BBA', 'PhD'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Medical Center', 'Shopping Complex'], 'https://vit.ac.in', 'info@vit.ac.in', '+91-416-220-2020'),
('Manipal Institute of Technology', 'Manipal', 'Karnataka', 'Udupi', 'Manipal 576104, Karnataka', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', false, 8.0, ARRAY['B.Tech', 'M.Tech', 'MBA', 'BBA', 'PhD'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Hospital', 'Recreation Center'], 'https://manipal.edu', 'info@manipal.edu', '+91-820-292-3000');

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

-- Enable RLS
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

-- Insert ranking data for the colleges
INSERT INTO public.college_rankings (college_id, all_india_rank, state_rank, placement_performance, research_output, industry_integration, overall_index_score, average_package_lpa, highest_package_lpa, placement_percentage) 
SELECT 
    c.id,
    CASE 
        WHEN c.name LIKE '%IIT Bombay%' THEN 1
        WHEN c.name LIKE '%IIT Delhi%' THEN 2
        WHEN c.name LIKE '%IIT Madras%' THEN 3
        WHEN c.name LIKE '%IIT Kanpur%' THEN 4
        WHEN c.name LIKE '%IIT Kharagpur%' THEN 5
        WHEN c.name LIKE '%IIM Ahmedabad%' THEN 6
        WHEN c.name LIKE '%IIM Calcutta%' THEN 7
        WHEN c.name LIKE '%IIM Bangalore%' THEN 8
        WHEN c.name LIKE '%NIT Trichy%' THEN 9
        WHEN c.name LIKE '%NIT Warangal%' THEN 10
        WHEN c.name LIKE '%St. Stephens%' THEN 11
        WHEN c.name LIKE '%Lady Shri Ram%' THEN 12
        WHEN c.name LIKE '%Hindu College%' THEN 13
        WHEN c.name LIKE '%BITS Pilani%' THEN 14
        WHEN c.name LIKE '%VIT Vellore%' THEN 15
        WHEN c.name LIKE '%Manipal%' THEN 16
        ELSE 99
    END as all_india_rank,
    CASE 
        WHEN c.name LIKE '%IIT Bombay%' THEN 1
        WHEN c.name LIKE '%IIT Delhi%' THEN 1
        WHEN c.name LIKE '%IIT Madras%' THEN 1
        WHEN c.name LIKE '%IIT Kanpur%' THEN 1
        WHEN c.name LIKE '%IIT Kharagpur%' THEN 1
        WHEN c.name LIKE '%IIM Ahmedabad%' THEN 1
        WHEN c.name LIKE '%IIM Calcutta%' THEN 1
        WHEN c.name LIKE '%IIM Bangalore%' THEN 1
        WHEN c.name LIKE '%NIT Trichy%' THEN 1
        WHEN c.name LIKE '%NIT Warangal%' THEN 1
        WHEN c.name LIKE '%St. Stephens%' THEN 1
        WHEN c.name LIKE '%Lady Shri Ram%' THEN 2
        WHEN c.name LIKE '%Hindu College%' THEN 3
        WHEN c.name LIKE '%BITS Pilani%' THEN 1
        WHEN c.name LIKE '%VIT Vellore%' THEN 1
        WHEN c.name LIKE '%Manipal%' THEN 1
        ELSE 5
    END as state_rank,
    CASE 
        WHEN c.name LIKE '%IIT%' THEN ROUND((RANDOM() * 5 + 90)::NUMERIC, 2)
        WHEN c.name LIKE '%IIM%' THEN ROUND((RANDOM() * 5 + 88)::NUMERIC, 2)
        WHEN c.name LIKE '%NIT%' THEN ROUND((RANDOM() * 5 + 85)::NUMERIC, 2)
        ELSE ROUND((RANDOM() * 10 + 80)::NUMERIC, 2)
    END as placement_performance,
    CASE 
        WHEN c.name LIKE '%IIT%' THEN ROUND((RANDOM() * 5 + 90)::NUMERIC, 2)
        WHEN c.name LIKE '%IIM%' THEN ROUND((RANDOM() * 5 + 85)::NUMERIC, 2)
        WHEN c.name LIKE '%NIT%' THEN ROUND((RANDOM() * 5 + 80)::NUMERIC, 2)
        ELSE ROUND((RANDOM() * 10 + 75)::NUMERIC, 2)
    END as research_output,
    CASE 
        WHEN c.name LIKE '%IIT%' THEN ROUND((RANDOM() * 5 + 88)::NUMERIC, 2)
        WHEN c.name LIKE '%IIM%' THEN ROUND((RANDOM() * 5 + 92)::NUMERIC, 2)
        WHEN c.name LIKE '%NIT%' THEN ROUND((RANDOM() * 5 + 82)::NUMERIC, 2)
        ELSE ROUND((RANDOM() * 10 + 78)::NUMERIC, 2)
    END as industry_integration,
    CASE 
        WHEN c.name LIKE '%IIT%' THEN ROUND((RANDOM() * 50 + 900)::NUMERIC, 2)
        WHEN c.name LIKE '%IIM%' THEN ROUND((RANDOM() * 30 + 880)::NUMERIC, 2)
        WHEN c.name LIKE '%NIT%' THEN ROUND((RANDOM() * 40 + 820)::NUMERIC, 2)
        ELSE ROUND((RANDOM() * 60 + 780)::NUMERIC, 2)
    END as overall_index_score,
    CASE 
        WHEN c.name LIKE '%IIT%' THEN ROUND((RANDOM() * 5 + 18)::NUMERIC, 2)
        WHEN c.name LIKE '%IIM%' THEN ROUND((RANDOM() * 3 + 22)::NUMERIC, 2)
        WHEN c.name LIKE '%NIT%' THEN ROUND((RANDOM() * 4 + 12)::NUMERIC, 2)
        WHEN c.name LIKE '%BITS%' OR c.name LIKE '%VIT%' OR c.name LIKE '%Manipal%' THEN ROUND((RANDOM() * 3 + 8)::NUMERIC, 2)
        ELSE ROUND((RANDOM() * 2 + 6)::NUMERIC, 2)
    END as average_package_lpa,
    CASE 
        WHEN c.name LIKE '%IIT%' THEN ROUND((RANDOM() * 20 + 80)::NUMERIC, 2)
        WHEN c.name LIKE '%IIM%' THEN ROUND((RANDOM() * 10 + 50)::NUMERIC, 2)
        WHEN c.name LIKE '%NIT%' THEN ROUND((RANDOM() * 15 + 45)::NUMERIC, 2)
        WHEN c.name LIKE '%BITS%' OR c.name LIKE '%VIT%' OR c.name LIKE '%Manipal%' THEN ROUND((RANDOM() * 10 + 30)::NUMERIC, 2)
        ELSE ROUND((RANDOM() * 8 + 20)::NUMERIC, 2)
    END as highest_package_lpa,
    CASE 
        WHEN c.name LIKE '%IIT%' OR c.name LIKE '%IIM%' THEN ROUND((RANDOM() * 5 + 95)::NUMERIC, 2)
        WHEN c.name LIKE '%NIT%' THEN ROUND((RANDOM() * 5 + 90)::NUMERIC, 2)
        ELSE ROUND((RANDOM() * 10 + 85)::NUMERIC, 2)
    END as placement_percentage
FROM public.colleges c;

-- Create an index on all_india_rank for faster queries
CREATE INDEX idx_college_rankings_all_india_rank ON public.college_rankings(all_india_rank);

-- Create trigger for automatic timestamp updates on college_rankings
CREATE TRIGGER update_college_rankings_updated_at
BEFORE UPDATE ON public.college_rankings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();