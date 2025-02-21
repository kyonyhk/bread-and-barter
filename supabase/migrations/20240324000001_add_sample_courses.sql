-- First, let's create the admin user and their program
DO $$
DECLARE
    admin_id UUID := '00000000-0000-0000-0000-000000000000';
    program_id UUID;
    course1_id UUID;
    course2_id UUID;
BEGIN
    -- Create the admin user first
    INSERT INTO auth.users (
        id,
        email,
        raw_user_meta_data
    )
    VALUES (
        admin_id,
        'admin@example.com',
        jsonb_build_object(
            'first_name', 'Admin',
            'last_name', 'User',
            'is_teacher', true
        )
    )
    ON CONFLICT (id) DO NOTHING;

    -- Insert a sample program if none exists
    INSERT INTO teaching.programs (teacher_id, name, description, status)
    SELECT admin_id, 'Web Development Bootcamp', 'Comprehensive web development program covering frontend and backend technologies', 'approved'
    WHERE NOT EXISTS (
        SELECT 1 FROM teaching.programs WHERE teacher_id = admin_id
    )
    RETURNING id INTO program_id;

    -- If program_id is null, get the existing program id
    IF program_id IS NULL THEN
        SELECT id INTO program_id FROM teaching.programs WHERE teacher_id = admin_id LIMIT 1;
    END IF;

    -- Insert first course
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
        program_id,
        1,
        'HTML & CSS Fundamentals',
        'Learn the basics of web development with HTML and CSS',
        99.99,
        '4 weeks',
        'This course covers HTML5 semantics, CSS layouts, responsive design, and modern styling techniques',
        10,
        true,
        'Online',
        'Senior Web Developer with 10+ years experience',
        'Basic computer skills, laptop with internet connection'
    )
    RETURNING id INTO course1_id;

    -- Insert course objectives for first course
    INSERT INTO teaching.course_objectives (course_id, objective_number, objective_text)
    SELECT course1_id, n.n, CASE
        WHEN n.n = 1 THEN 'Understand HTML5 semantic elements'
        WHEN n.n = 2 THEN 'Master CSS flexbox and grid layouts'
        WHEN n.n = 3 THEN 'Create responsive designs using media queries'
        WHEN n.n = 4 THEN 'Build and style modern web forms'
    END
    FROM (SELECT generate_series(1,4) as n) n;

    -- Insert course materials for first course
    INSERT INTO teaching.course_materials (course_id, name, file_url)
    VALUES
        (course1_id, 'Course Slides', 'https://example.com/slides.pdf'),
        (course1_id, 'Exercise Files', 'https://example.com/exercises.zip'),
        (course1_id, 'Reference Guide', 'https://example.com/guide.pdf');

    -- Insert course timeslots for first course
    INSERT INTO teaching.course_timeslots (course_id, day, slots)
    VALUES
        (course1_id, 'Monday', '[{"startTime": "09:00", "endTime": "11:00"}, {"startTime": "14:00", "endTime": "16:00"}]'::jsonb),
        (course1_id, 'Wednesday', '[{"startTime": "09:00", "endTime": "11:00"}, {"startTime": "14:00", "endTime": "16:00"}]'::jsonb),
        (course1_id, 'Friday', '[{"startTime": "09:00", "endTime": "11:00"}, {"startTime": "14:00", "endTime": "16:00"}]'::jsonb);

    -- Insert second course
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
        program_id,
        2,
        'JavaScript Essentials',
        'Master modern JavaScript programming',
        149.99,
        '6 weeks',
        'Deep dive into JavaScript fundamentals, ES6+ features, and modern development practices',
        8,
        true,
        'Online',
        'Senior Web Developer with 10+ years experience',
        'Basic HTML & CSS knowledge, laptop with internet connection'
    )
    RETURNING id INTO course2_id;

    -- Insert course objectives for second course
    INSERT INTO teaching.course_objectives (course_id, objective_number, objective_text)
    SELECT course2_id, n.n, CASE
        WHEN n.n = 1 THEN 'Understand JavaScript fundamentals and ES6+ features'
        WHEN n.n = 2 THEN 'Master DOM manipulation and event handling'
        WHEN n.n = 3 THEN 'Work with APIs and asynchronous programming'
        WHEN n.n = 4 THEN 'Build interactive web applications'
    END
    FROM (SELECT generate_series(1,4) as n) n;

    -- Insert course materials for second course
    INSERT INTO teaching.course_materials (course_id, name, file_url)
    VALUES
        (course2_id, 'JavaScript Slides', 'https://example.com/js-slides.pdf'),
        (course2_id, 'Practice Projects', 'https://example.com/js-projects.zip'),
        (course2_id, 'JavaScript Guide', 'https://example.com/js-guide.pdf');

    -- Insert course timeslots for second course
    INSERT INTO teaching.course_timeslots (course_id, day, slots)
    VALUES
        (course2_id, 'Tuesday', '[{"startTime": "09:00", "endTime": "11:00"}, {"startTime": "14:00", "endTime": "16:00"}]'::jsonb),
        (course2_id, 'Thursday', '[{"startTime": "09:00", "endTime": "11:00"}, {"startTime": "14:00", "endTime": "16:00"}]'::jsonb);
END;
$$;
