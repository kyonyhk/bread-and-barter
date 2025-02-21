-- Add two more teachers
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
    course4_id UUID;
BEGIN
    -- Insert first teacher
    INSERT INTO auth.users (
        id,
        email,
        raw_user_meta_data
    )
    VALUES (
        teacher1_id,
        'sarah.chen@example.com',
        jsonb_build_object(
            'first_name', 'Sarah',
            'last_name', 'Chen',
            'description', 'Professional pastry chef specializing in French pastries and Asian fusion desserts',
            'interests', ARRAY['Baking', 'Pastry Arts', 'Desserts'],
            'is_teacher', true
        )
    );

    -- Insert second teacher
    INSERT INTO auth.users (
        id,
        email,
        raw_user_meta_data
    )
    VALUES (
        teacher2_id,
        'marco.rossi@example.com',
        jsonb_build_object(
            'first_name', 'Marco',
            'last_name', 'Rossi',
            'description', 'Italian chef with 15 years of experience in authentic Italian cuisine',
            'interests', ARRAY['Italian Cuisine', 'Pasta Making', 'Mediterranean'],
            'is_teacher', true
        )
    );

    -- Programs for Sarah Chen
    INSERT INTO teaching.programs (teacher_id, name, description, status)
    VALUES (
        teacher1_id,
        'French Pastry Mastery',
        'Master the art of French pastry making, from classic croissants to elegant éclairs',
        'approved'
    )
    RETURNING id INTO program1_id;

    INSERT INTO teaching.programs (teacher_id, name, description, status)
    VALUES (
        teacher1_id,
        'Asian Fusion Desserts',
        'Create innovative desserts combining Asian flavors with Western techniques',
        'approved'
    )
    RETURNING id INTO program2_id;

    -- Program for Marco Rossi
    INSERT INTO teaching.programs (teacher_id, name, description, status)
    VALUES (
        teacher2_id,
        'Authentic Italian Cooking',
        'Learn traditional Italian cooking techniques and recipes passed down through generations',
        'approved'
    )
    RETURNING id INTO program3_id;

    -- Courses for French Pastry Mastery
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
        requirements,
        image_url
    )
    VALUES (
        program1_id,
        1,
        'Classic French Croissants',
        'Master the art of making perfect, flaky croissants',
        129.99,
        '3 hours',
        'Learn the secrets of creating perfect French croissants, from laminating dough to shaping and baking',
        8,
        true,
        'Online',
        'Trained at Le Cordon Bleu Paris, 8 years of professional pastry experience',
        'Basic baking knowledge recommended, all ingredients and tools list will be provided',
        '/images/courses/croissant.jpg'
    )
    RETURNING id INTO course1_id;

    -- Course objectives for French Croissants
    INSERT INTO teaching.course_objectives (course_id, objective_number, objective_text)
    VALUES
        (course1_id, 1, 'Master the lamination technique for flaky layers'),
        (course1_id, 2, 'Learn proper dough temperature control'),
        (course1_id, 3, 'Perfect the shaping of classic and filled croissants'),
        (course1_id, 4, 'Understand proofing and baking techniques');

    -- Course materials for French Croissants
    INSERT INTO teaching.course_materials (course_id, name, file_url)
    VALUES
        (course1_id, 'Croissant Recipe Guide', 'https://example.com/croissant-guide.pdf'),
        (course1_id, 'Lamination Technique Video', 'https://example.com/lamination.mp4'),
        (course1_id, 'Tools and Ingredients List', 'https://example.com/croissant-tools.pdf');

    -- Course timeslots for French Croissants
    INSERT INTO teaching.course_timeslots (course_id, day, slots)
    VALUES
        (course1_id, 'Saturday', '[{"startTime": "09:00", "endTime": "12:00"}, {"startTime": "14:00", "endTime": "17:00"}]'::jsonb),
        (course1_id, 'Sunday', '[{"startTime": "09:00", "endTime": "12:00"}, {"startTime": "14:00", "endTime": "17:00"}]'::jsonb);

    -- Course for Marco's Italian Cooking
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
        requirements,
        image_url
    )
    VALUES (
        program3_id,
        1,
        'Handmade Pasta Masterclass',
        'Learn to make authentic Italian pasta from scratch',
        149.99,
        '4 hours',
        'Master the art of making fresh pasta by hand, including various shapes and filled pasta varieties',
        6,
        true,
        'Online',
        'Born and trained in Italy, 15 years of professional cooking experience',
        'No experience needed, basic kitchen tools required',
        '/images/courses/pasta.jpg'
    )
    RETURNING id INTO course2_id;

    -- Course objectives for Pasta Masterclass
    INSERT INTO teaching.course_objectives (course_id, objective_number, objective_text)
    VALUES
        (course2_id, 1, 'Master basic pasta dough preparation'),
        (course2_id, 2, 'Learn multiple pasta shapes and techniques'),
        (course2_id, 3, 'Create filled pasta varieties'),
        (course2_id, 4, 'Understand proper cooking and sauce pairing');

    -- Course materials for Pasta Masterclass
    INSERT INTO teaching.course_materials (course_id, name, file_url)
    VALUES
        (course2_id, 'Pasta Making Guide', 'https://example.com/pasta-guide.pdf'),
        (course2_id, 'Recipe Collection', 'https://example.com/pasta-recipes.pdf'),
        (course2_id, 'Equipment Guide', 'https://example.com/pasta-tools.pdf');

    -- Course timeslots for Pasta Masterclass
    INSERT INTO teaching.course_timeslots (course_id, day, slots)
    VALUES
        (course2_id, 'Wednesday', '[{"startTime": "10:00", "endTime": "14:00"}, {"startTime": "15:00", "endTime": "19:00"}]'::jsonb),
        (course2_id, 'Friday', '[{"startTime": "10:00", "endTime": "14:00"}, {"startTime": "15:00", "endTime": "19:00"}]'::jsonb);

END;
$$;
