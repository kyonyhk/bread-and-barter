-- Add two more teachers with diverse specialties
DO $$
DECLARE
    teacher1_id UUID := uuid_generate_v4();
    teacher2_id UUID := uuid_generate_v4();
    program1_id UUID;
    program2_id UUID;
    program3_id UUID;
    course1_id UUID;
    course2_id UUID;
    course3_id UUID;
BEGIN
    -- Insert first teacher (Guitar Instructor)
    INSERT INTO auth.users (
        id,
        email,
        raw_user_meta_data
    )
    VALUES (
        teacher1_id,
        'david.martinez@example.com',
        jsonb_build_object(
            'first_name', 'David',
            'last_name', 'Martinez',
            'description', 'Professional guitarist and music educator with 10 years of teaching experience, specializing in rock, blues, and jazz guitar',
            'interests', ARRAY['Guitar', 'Music Theory', 'Song Writing'],
            'is_teacher', true
        )
    );

    -- Insert second teacher (Digital Artist)
    INSERT INTO auth.users (
        id,
        email,
        raw_user_meta_data
    )
    VALUES (
        teacher2_id,
        'emily.zhang@example.com',
        jsonb_build_object(
            'first_name', 'Emily',
            'last_name', 'Zhang',
            'description', 'Digital artist and illustrator with expertise in concept art and character design, featured in various gaming and animation projects',
            'interests', ARRAY['Digital Art', 'Character Design', 'Animation'],
            'is_teacher', true
        )
    );

    -- Programs for David Martinez (Guitar)
    INSERT INTO teaching.programs (teacher_id, name, description, status)
    VALUES (
        teacher1_id,
        'Guitar Fundamentals to Advanced',
        'Comprehensive guitar program covering everything from basic techniques to advanced improvisation',
        'approved'
    )
    RETURNING id INTO program1_id;

    INSERT INTO teaching.programs (teacher_id, name, description, status)
    VALUES (
        teacher1_id,
        'Blues & Jazz Guitar Mastery',
        'Deep dive into blues and jazz guitar styles, improvisation, and theory',
        'approved'
    )
    RETURNING id INTO program2_id;

    -- Program for Emily Zhang (Digital Art)
    INSERT INTO teaching.programs (teacher_id, name, description, status)
    VALUES (
        teacher2_id,
        'Digital Character Design',
        'Master the art of creating compelling characters for games, animation, and illustration',
        'approved'
    )
    RETURNING id INTO program3_id;

    -- Course for Guitar Fundamentals
    INSERT INTO teaching.courses (
        program_id,
        course_number,
        name,
        description,
        price,
        duration,
        course_details,
        max_students,
        is_group_session,
        location,
        credentials_experience,
        requirements
    )
    VALUES (
        program1_id,
        1,
        'Beginning Guitar Essentials',
        'Start your guitar journey with proper fundamentals and techniques',
        89.99,
        '2 hours',
        'Learn essential guitar basics including chords, strumming patterns, and basic music theory',
        6,
        true,
        'Online',
        'Bachelor in Music Education, 10 years teaching experience, performed with various bands',
        'No prior experience needed. Students need their own guitar (acoustic or electric)'
    )
    RETURNING id INTO course1_id;

    -- Course objectives for Guitar Essentials
    INSERT INTO teaching.course_objectives (course_id, objective_number, objective_text)
    VALUES
        (course1_id, 1, 'Master basic open chords and power chords'),
        (course1_id, 2, 'Develop proper finger techniques and hand positioning'),
        (course1_id, 3, 'Learn to read basic guitar tablature and chord charts'),
        (course1_id, 4, 'Understand basic music theory concepts');

    -- Course materials for Guitar Essentials
    INSERT INTO teaching.course_materials (course_id, name, file_url)
    VALUES
        (course1_id, 'Beginner Guitar Handbook', 'https://example.com/guitar-handbook.pdf'),
        (course1_id, 'Practice Exercises', 'https://example.com/guitar-exercises.pdf'),
        (course1_id, 'Chord Charts', 'https://example.com/chord-charts.pdf');

    -- Course timeslots for Guitar Essentials
    INSERT INTO teaching.course_timeslots (course_id, day, slots)
    VALUES
        (course1_id, 'Monday', '[{"startTime": "18:00", "endTime": "20:00"}, {"startTime": "20:30", "endTime": "22:30"}]'::jsonb),
        (course1_id, 'Wednesday', '[{"startTime": "18:00", "endTime": "20:00"}, {"startTime": "20:30", "endTime": "22:30"}]'::jsonb);

    -- Course for Digital Character Design
    INSERT INTO teaching.courses (
        program_id,
        course_number,
        name,
        description,
        price,
        duration,
        course_details,
        max_students,
        is_group_session,
        location,
        credentials_experience,
        requirements
    )
    VALUES (
        program3_id,
        1,
        'Character Design Fundamentals',
        'Learn the core principles of creating appealing and dynamic characters',
        129.99,
        '3 hours',
        'Master the fundamentals of character design including anatomy, expression, and personality in digital art',
        8,
        true,
        'Online',
        'BFA in Digital Arts, 7 years industry experience in gaming and animation',
        'Basic knowledge of digital drawing software (Photoshop or Procreate), drawing tablet recommended'
    )
    RETURNING id INTO course2_id;

    -- Course objectives for Character Design
    INSERT INTO teaching.course_objectives (course_id, objective_number, objective_text)
    VALUES
        (course2_id, 1, 'Understand character anatomy and proportions'),
        (course2_id, 2, 'Master expression and emotion in character design'),
        (course2_id, 3, 'Develop character personality through visual elements'),
        (course2_id, 4, 'Learn industry-standard character design workflow');

    -- Course materials for Character Design
    INSERT INTO teaching.course_materials (course_id, name, file_url)
    VALUES
        (course2_id, 'Character Design Guide', 'https://example.com/character-guide.pdf'),
        (course2_id, 'Digital Art Brushes Pack', 'https://example.com/brushes.zip'),
        (course2_id, 'Reference Sheet Templates', 'https://example.com/reference-templates.pdf');

    -- Course timeslots for Character Design
    INSERT INTO teaching.course_timeslots (course_id, day, slots)
    VALUES
        (course2_id, 'Tuesday', '[{"startTime": "10:00", "endTime": "13:00"}, {"startTime": "14:00", "endTime": "17:00"}]'::jsonb),
        (course2_id, 'Saturday', '[{"startTime": "09:00", "endTime": "12:00"}, {"startTime": "14:00", "endTime": "17:00"}]'::jsonb);

END;
$$;
