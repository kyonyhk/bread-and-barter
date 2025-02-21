-- Add missing programs and their courses
DO $$ 
DECLARE
    sarah_id UUID;
    david_id UUID;
    asian_fusion_id UUID := '0c401b8f-292f-4ee2-89ed-2ccbd14acee4';
    blues_jazz_id UUID := 'ad65bb02-88fe-428c-bd52-963158e6adee';
BEGIN
    -- Get teacher IDs
    SELECT id INTO sarah_id FROM auth.users WHERE email = 'sarah.chen@example.com';
    SELECT id INTO david_id FROM auth.users WHERE email = 'david.martinez@example.com';

    -- Add programs
    INSERT INTO teaching.programs (id, teacher_id, name, description, status)
    VALUES
        -- Asian Fusion Desserts by Sarah Chen
        (asian_fusion_id, sarah_id, 'Asian Fusion Desserts', 'Create innovative desserts combining Asian flavors with Western techniques', 'approved'),
        
        -- Blues & Jazz Guitar by David Martinez
        (blues_jazz_id, david_id, 'Blues & Jazz Guitar Mastery', 'Deep dive into blues and jazz guitar styles, improvisation, and theory', 'approved');

    -- Add courses for Asian Fusion Desserts
    INSERT INTO teaching.courses (id, program_id, course_number, name, description, price, duration, course_details, max_students, is_group_session, location)
    VALUES
        ('d3a3b3c3-3456-4a3b-a3b3-345678901abc', asian_fusion_id, 1, 'Modern Asian Desserts', 'Contemporary Asian-inspired dessert creation', 139.99, '3 hours', 'Create modern desserts incorporating traditional Asian ingredients and flavors', 8, true, 'Online'),
        ('d4a4b4c4-4567-4a4b-a4b4-456789012abc', asian_fusion_id, 2, 'Fusion Pastry Techniques', 'Blend Eastern and Western pastry methods', 159.99, '4 hours', 'Advanced techniques combining Asian and European pastry traditions', 6, true, 'Online');

    -- Add courses for Blues & Jazz Guitar Mastery
    INSERT INTO teaching.courses (id, program_id, course_number, name, description, price, duration, course_details, max_students, is_group_session, location)
    VALUES
        ('d5a5b5c5-5678-4a5b-a5b5-567890123abc', blues_jazz_id, 1, 'Blues Guitar Essentials', 'Master blues guitar techniques', 129.99, '3 hours', 'Learn essential blues scales, rhythms, and improvisation techniques', 8, true, 'Online'),
        ('d6a6b6c6-6789-4a6b-a6b6-678901234abc', blues_jazz_id, 2, 'Jazz Guitar Fundamentals', 'Explore jazz guitar basics', 139.99, '3 hours', 'Study jazz chords, progressions, and basic improvisation concepts', 8, true, 'Online');
END $$; 