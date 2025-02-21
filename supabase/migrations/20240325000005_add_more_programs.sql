-- Add three more programs with their courses
DO $$ 
DECLARE
    emily_id UUID;
    marco_id UUID;
    david_id UUID;
    program1_id UUID := 'd5f2f5b4-c8d1-4c9f-9e3a-6e8c1f5c0b3a';
    program2_id UUID := 'e6a3a6c5-d9e2-4d0a-8f4b-7f9d2a6d1c4b';
    program3_id UUID := 'f7b4b7d6-e0f3-4e1b-95cc-8a0e3b7e2d5c';
BEGIN
    -- Get teacher IDs
    SELECT id INTO emily_id FROM auth.users WHERE email = 'emily.zhang@example.com';
    SELECT id INTO marco_id FROM auth.users WHERE email = 'marco.rossi@example.com';
    SELECT id INTO david_id FROM auth.users WHERE email = 'david.martinez@example.com';

    -- Add programs
    INSERT INTO teaching.programs (id, teacher_id, name, description, status)
    VALUES
        -- Photography program by Emily Zhang (Digital Artist)
        (program1_id, emily_id, 'Digital Photography Mastery', 'Master the art of digital photography from composition to post-processing', 'approved'),
        
        -- Advanced Italian Cooking by Marco Rossi
        (program2_id, marco_id, 'Advanced Italian Cuisine', 'Take your Italian cooking skills to the next level with advanced techniques', 'approved'),
        
        -- Music Theory by David Martinez
        (program3_id, david_id, 'Music Theory & Composition', 'Comprehensive study of music theory and composition techniques', 'approved');

    -- Add courses
    INSERT INTO teaching.courses (id, program_id, course_number, name, description, price, duration, course_details, max_students, is_group_session, location)
    VALUES
        -- Photography Courses
        ('c1a1a1a1-1111-4111-a111-111111111111', program1_id, 1, 'Photography Basics', 'Learn the fundamentals of digital photography', 129.99, '3 hours', 'Master camera settings, composition rules, and basic lighting techniques', 8, true, 'Online'),
        ('c2b2b2b2-2222-4222-b222-222222222222', program1_id, 2, 'Advanced Photography', 'Advanced techniques in digital photography', 149.99, '4 hours', 'Advanced lighting, composition, and post-processing techniques', 6, true, 'Online'),
        
        -- Advanced Italian Cooking Courses
        ('c3c3c3c3-3333-4333-c333-333333333333', program2_id, 1, 'Regional Italian Specialties', 'Master regional Italian dishes', 179.99, '4 hours', 'Learn to prepare authentic dishes from different Italian regions', 6, true, 'Online'),
        ('c4d4d4d4-4444-4444-d444-444444444444', program2_id, 2, 'Italian Wine & Food Pairing', 'Perfect wine pairing for Italian cuisine', 199.99, '3 hours', 'Understanding Italian wines and perfect food pairings', 8, true, 'Online'),
        
        -- Music Theory Courses
        ('c5e5e5e5-5555-4555-e555-555555555555', program3_id, 1, 'Music Theory Fundamentals', 'Essential music theory concepts', 89.99, '2 hours', 'Learn scales, chords, rhythm, and basic harmony', 10, true, 'Online'),
        ('c6f6f6f6-6666-4666-f666-666666666666', program3_id, 2, 'Advanced Composition', 'Advanced music composition techniques', 119.99, '3 hours', 'Study advanced harmony, counterpoint, and modern composition techniques', 8, true, 'Online');
END $$;
