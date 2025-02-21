-- Add sample data for course objectives, materials, and timeslots
DO $$ 
DECLARE
    course_id UUID;
BEGIN
    -- Get the first course ID from the database
    SELECT id INTO course_id FROM teaching.courses LIMIT 1;

    -- Add course objectives
    INSERT INTO teaching.course_objectives (course_id, objective_number, objective_text)
    VALUES
        (course_id, 1, 'Master basic cooking techniques'),
        (course_id, 2, 'Learn knife skills and kitchen safety'),
        (course_id, 3, 'Understand ingredient selection and quality');

    -- Add course materials
    INSERT INTO teaching.course_materials (course_id, name, file_url)
    VALUES
        (course_id, 'Course Handbook', '/materials/handbook.pdf'),
        (course_id, 'Recipe Collection', '/materials/recipes.pdf'),
        (course_id, 'Kitchen Safety Guide', '/materials/safety.pdf');

    -- Add course timeslots
    INSERT INTO teaching.course_timeslots (course_id, day, slots)
    VALUES
        (course_id, 'Monday', '[{"startTime": "10:00 AM", "endTime": "1:00 PM"}, {"startTime": "2:00 PM", "endTime": "5:00 PM"}]'::jsonb),
        (course_id, 'Wednesday', '[{"startTime": "10:00 AM", "endTime": "1:00 PM"}]'::jsonb),
        (course_id, 'Friday', '[{"startTime": "2:00 PM", "endTime": "5:00 PM"}]'::jsonb);
END $$; 