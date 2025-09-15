-- Populate colleges with comprehensive data
INSERT INTO public.colleges (name, location_city, location_state, location_district, address, image_url, is_government, rating, courses_offered, facilities, website, contact_email, contact_phone) VALUES
-- Top IITs
('IIT Bombay - Indian Institute of Technology', 'Mumbai', 'Maharashtra', 'Mumbai', 'Powai, Mumbai, Maharashtra 400076', 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 9.5, ARRAY['B.Tech', 'M.Tech', 'PhD', 'MBA'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Research Labs', 'Cafeteria'], 'https://www.iitb.ac.in', 'info@iitb.ac.in', '+91-22-2572-2545'),
('IIT Delhi - Indian Institute of Technology', 'Delhi', 'Delhi', 'South Delhi', 'Hauz Khas, New Delhi 110016', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 9.4, ARRAY['B.Tech', 'M.Tech', 'PhD', 'MBA'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Research Labs', 'Medical Center'], 'https://www.iitd.ac.in', 'info@iitd.ac.in', '+91-11-2659-1999'),
('IIT Madras - Indian Institute of Technology', 'Chennai', 'Tamil Nadu', 'Chennai', 'Sardar Patel Road, Chennai 600036', 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 9.3, ARRAY['B.Tech', 'M.Tech', 'PhD', 'MBA'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Research Labs', 'Swimming Pool'], 'https://www.iitm.ac.in', 'info@iitm.ac.in', '+91-44-2257-4802'),
('IIT Kanpur - Indian Institute of Technology', 'Kanpur', 'Uttar Pradesh', 'Kanpur', 'Kalyanpur, Kanpur 208016', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 9.2, ARRAY['B.Tech', 'M.Tech', 'PhD', 'MBA'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Research Labs', 'Auditorium'], 'https://www.iitk.ac.in', 'info@iitk.ac.in', '+91-512-259-7999'),
('IIT Kharagpur - Indian Institute of Technology', 'Kharagpur', 'West Bengal', 'West Midnapore', 'Kharagpur 721302', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&w=800&q=80', true, 9.1, ARRAY['B.Tech', 'M.Tech', 'PhD', 'MBA'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Research Labs'], 'https://www.iitkgp.ac.in', 'info@iitkgp.ac.in', '+91-3222-255-221'),

-- Top IIMs
('IIM Ahmedabad', 'Ahmedabad', 'Gujarat', 'Ahmedabad', 'Vastrapur, Ahmedabad 380015', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 9.0, ARRAY['MBA', 'PGDM', 'PhD'], ARRAY['Library', 'Hostels', 'Sports Complex', 'Computer Center'], 'https://www.iima.ac.in', 'info@iima.ac.in', '+91-79-6632-4725'),
('IIM Calcutta', 'Kolkata', 'West Bengal', 'Kolkata', 'Joka, Diamond Harbour Road, Kolkata 700104', 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 8.9, ARRAY['MBA', 'PGDM', 'PhD'], ARRAY['Library', 'Hostels', 'Sports Complex', 'IT Center'], 'https://www.iimcal.ac.in', 'info@iimcal.ac.in', '+91-33-2467-8300'),
('IIM Bangalore', 'Bangalore', 'Karnataka', 'Bangalore Urban', 'Bannerghatta Road, Bangalore 560076', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 8.8, ARRAY['MBA', 'PGDM', 'PhD'], ARRAY['Library', 'Hostels', 'Sports Complex'], 'https://www.iimb.ac.in', 'info@iimb.ac.in', '+91-80-2699-3000'),

-- Top NITs
('NIT Trichy', 'Tiruchirappalli', 'Tamil Nadu', 'Tiruchirappalli', 'Tiruchirappalli 620015', 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 8.7, ARRAY['B.Tech', 'M.Tech', 'MBA', 'PhD'], ARRAY['Library', 'Hostels', 'Sports Complex'], 'https://www.nitt.edu', 'info@nitt.edu', '+91-431-250-3000'),
('NIT Warangal', 'Warangal', 'Telangana', 'Warangal Urban', 'Warangal 506004', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 8.6, ARRAY['B.Tech', 'M.Tech', 'MBA', 'PhD'], ARRAY['Library', 'Hostels', 'Sports Complex'], 'https://www.nitw.ac.in', 'info@nitw.ac.in', '+91-870-246-2000'),

-- Delhi University Colleges
('St. Stephens College', 'Delhi', 'Delhi', 'North Delhi', 'University Enclave, Delhi 110007', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 8.5, ARRAY['B.A.', 'B.Sc.', 'B.Com.', 'M.A.'], ARRAY['Library', 'Hostels', 'Sports Ground'], 'https://www.ststephens.edu', 'info@ststephens.edu', '+91-11-2766-7271'),
('Lady Shri Ram College for Women', 'Delhi', 'Delhi', 'South Delhi', 'Lajpat Nagar IV, New Delhi 110024', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 8.4, ARRAY['B.A.', 'B.Sc.', 'B.Com.', 'M.A.'], ARRAY['Library', 'Hostels', 'Sports Complex'], 'https://www.lsr.edu.in', 'info@lsr.edu.in', '+91-11-2464-3000'),
('Hindu College', 'Delhi', 'Delhi', 'North Delhi', 'University Enclave, Delhi 110007', 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 8.3, ARRAY['B.A.', 'B.Sc.', 'B.Com.', 'M.A.'], ARRAY['Library', 'Sports Ground', 'Computer Lab'], 'https://www.hinducollege.ac.in', 'info@hinducollege.ac.in', '+91-11-2766-7342'),

-- Private Engineering Colleges
('BITS Pilani', 'Pilani', 'Rajasthan', 'Jhunjhunu', 'Pilani 333031, Rajasthan', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', false, 8.2, ARRAY['B.E.', 'B.Tech', 'MBA', 'M.Tech'], ARRAY['Library', 'Hostels', 'Sports Complex'], 'https://www.bits-pilani.ac.in', 'info@pilani.bits-pilani.ac.in', '+91-1596-242-204'),
('VIT Vellore', 'Vellore', 'Tamil Nadu', 'Vellore', 'Tiruvalam Road, Vellore 632014', 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', false, 8.1, ARRAY['B.Tech', 'M.Tech', 'MBA', 'BBA'], ARRAY['Library', 'Hostels', 'Sports Complex'], 'https://vit.ac.in', 'info@vit.ac.in', '+91-416-220-2020'),
('Manipal Institute of Technology', 'Manipal', 'Karnataka', 'Udupi', 'Manipal 576104, Karnataka', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', false, 8.0, ARRAY['B.Tech', 'M.Tech', 'MBA', 'BBA'], ARRAY['Library', 'Hostels', 'Sports Complex'], 'https://manipal.edu', 'info@manipal.edu', '+91-820-292-3000');

-- Insert ranking and placement data
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
    END as all_india_rank,
    CASE 
        WHEN c.location_state = 'Maharashtra' AND c.name LIKE '%IIT Bombay%' THEN 1
        WHEN c.location_state = 'Delhi' AND c.name LIKE '%IIT Delhi%' THEN 1
        WHEN c.location_state = 'Tamil Nadu' AND c.name LIKE '%IIT Madras%' THEN 1
        WHEN c.location_state = 'Uttar Pradesh' AND c.name LIKE '%IIT Kanpur%' THEN 1
        WHEN c.location_state = 'West Bengal' AND c.name LIKE '%IIT Kharagpur%' THEN 1
        WHEN c.location_state = 'Gujarat' AND c.name LIKE '%IIM Ahmedabad%' THEN 1
        WHEN c.location_state = 'West Bengal' AND c.name LIKE '%IIM Calcutta%' THEN 2
        WHEN c.location_state = 'Karnataka' AND c.name LIKE '%IIM Bangalore%' THEN 1
        WHEN c.location_state = 'Tamil Nadu' AND c.name LIKE '%NIT Trichy%' THEN 2
        WHEN c.location_state = 'Telangana' AND c.name LIKE '%NIT Warangal%' THEN 1
        WHEN c.location_state = 'Delhi' AND c.name LIKE '%St. Stephens%' THEN 2
        WHEN c.location_state = 'Delhi' AND c.name LIKE '%Lady Shri Ram%' THEN 3
        WHEN c.location_state = 'Delhi' AND c.name LIKE '%Hindu College%' THEN 4
        WHEN c.location_state = 'Rajasthan' AND c.name LIKE '%BITS Pilani%' THEN 1
        WHEN c.location_state = 'Tamil Nadu' AND c.name LIKE '%VIT Vellore%' THEN 3
        WHEN c.location_state = 'Karnataka' AND c.name LIKE '%Manipal%' THEN 2
    END as state_rank,
    CASE 
        WHEN c.name LIKE '%IIT%' THEN 94.50
        WHEN c.name LIKE '%IIM%' THEN 91.20
        WHEN c.name LIKE '%NIT%' THEN 87.80
        ELSE 83.40
    END as placement_performance,
    CASE 
        WHEN c.name LIKE '%IIT%' THEN 92.30
        WHEN c.name LIKE '%IIM%' THEN 87.60
        WHEN c.name LIKE '%NIT%' THEN 82.40
        ELSE 78.90
    END as research_output,
    CASE 
        WHEN c.name LIKE '%IIT%' THEN 89.70
        WHEN c.name LIKE '%IIM%' THEN 94.20
        WHEN c.name LIKE '%NIT%' THEN 84.50
        ELSE 81.20
    END as industry_integration,
    CASE 
        WHEN c.name LIKE '%IIT Bombay%' THEN 934.84
        WHEN c.name LIKE '%IIT Delhi%' THEN 933.54
        WHEN c.name LIKE '%IIT Madras%' THEN 932.12
        WHEN c.name LIKE '%IIT Kanpur%' THEN 920.45
        WHEN c.name LIKE '%IIT Kharagpur%' THEN 915.30
        WHEN c.name LIKE '%IIM Ahmedabad%' THEN 910.80
        WHEN c.name LIKE '%IIM Calcutta%' THEN 905.60
        WHEN c.name LIKE '%IIM Bangalore%' THEN 900.20
        WHEN c.name LIKE '%NIT Trichy%' THEN 875.40
        WHEN c.name LIKE '%NIT Warangal%' THEN 870.20
        WHEN c.name LIKE '%St. Stephens%' THEN 845.60
        WHEN c.name LIKE '%Lady Shri Ram%' THEN 840.30
        WHEN c.name LIKE '%Hindu College%' THEN 835.80
        WHEN c.name LIKE '%BITS Pilani%' THEN 825.40
        WHEN c.name LIKE '%VIT Vellore%' THEN 810.20
        WHEN c.name LIKE '%Manipal%' THEN 795.60
    END as overall_index_score,
    CASE 
        WHEN c.name LIKE '%IIT%' THEN 20.50
        WHEN c.name LIKE '%IIM%' THEN 24.80
        WHEN c.name LIKE '%NIT%' THEN 14.60
        WHEN c.name LIKE '%BITS%' OR c.name LIKE '%VIT%' OR c.name LIKE '%Manipal%' THEN 10.20
        ELSE 7.80
    END as average_package_lpa,
    CASE 
        WHEN c.name LIKE '%IIT%' THEN 95.40
        WHEN c.name LIKE '%IIM%' THEN 58.60
        WHEN c.name LIKE '%NIT%' THEN 52.30
        WHEN c.name LIKE '%BITS%' OR c.name LIKE '%VIT%' OR c.name LIKE '%Manipal%' THEN 35.80
        ELSE 25.60
    END as highest_package_lpa,
    CASE 
        WHEN c.name LIKE '%IIT%' OR c.name LIKE '%IIM%' THEN 98.50
        WHEN c.name LIKE '%NIT%' THEN 94.20
        ELSE 89.70
    END as placement_percentage
FROM public.colleges c
WHERE c.name IN (
    'IIT Bombay - Indian Institute of Technology', 'IIT Delhi - Indian Institute of Technology',
    'IIT Madras - Indian Institute of Technology', 'IIT Kanpur - Indian Institute of Technology',
    'IIT Kharagpur - Indian Institute of Technology', 'IIM Ahmedabad', 'IIM Calcutta',
    'IIM Bangalore', 'NIT Trichy', 'NIT Warangal', 'St. Stephens College',
    'Lady Shri Ram College for Women', 'Hindu College', 'BITS Pilani', 'VIT Vellore',
    'Manipal Institute of Technology'
);