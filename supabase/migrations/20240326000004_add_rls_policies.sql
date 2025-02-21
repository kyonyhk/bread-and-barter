-- Enable RLS on the tables
ALTER TABLE teaching.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE teaching.course_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE teaching.course_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE teaching.course_timeslots ENABLE ROW LEVEL SECURITY;
ALTER TABLE teaching.programs ENABLE ROW LEVEL SECURITY;

-- Grant explicit INSERT permission on programs table
GRANT INSERT ON teaching.programs TO authenticated;

-- Drop existing policies
DROP POLICY IF EXISTS insert_courses ON teaching.courses;
DROP POLICY IF EXISTS select_courses ON teaching.courses;
DROP POLICY IF EXISTS insert_course_objectives ON teaching.course_objectives;
DROP POLICY IF EXISTS select_course_objectives ON teaching.course_objectives;
DROP POLICY IF EXISTS insert_course_materials ON teaching.course_materials;
DROP POLICY IF EXISTS select_course_materials ON teaching.course_materials;
DROP POLICY IF EXISTS insert_course_timeslots ON teaching.course_timeslots;
DROP POLICY IF EXISTS select_course_timeslots ON teaching.course_timeslots;
DROP POLICY IF EXISTS insert_programs ON teaching.programs;
DROP POLICY IF EXISTS select_programs ON teaching.programs;

-- Policy for inserting programs
CREATE POLICY insert_programs ON teaching.programs
    FOR INSERT
    TO authenticated
    WITH CHECK (
        auth.uid() = teacher_id
    );

-- Policy for selecting programs
CREATE POLICY select_programs ON teaching.programs
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy for inserting courses
CREATE POLICY insert_courses ON teaching.courses
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM teaching.programs p
            WHERE p.id = program_id
            AND p.teacher_id = auth.uid()
        )
    );

-- Policy for selecting courses
CREATE POLICY select_courses ON teaching.courses
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy for inserting course objectives
CREATE POLICY insert_course_objectives ON teaching.course_objectives
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM teaching.courses c
            JOIN teaching.programs p ON c.program_id = p.id
            WHERE c.id = course_id
            AND p.teacher_id = auth.uid()
        )
    );

-- Policy for selecting course objectives
CREATE POLICY select_course_objectives ON teaching.course_objectives
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy for inserting course materials
CREATE POLICY insert_course_materials ON teaching.course_materials
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM teaching.courses c
            JOIN teaching.programs p ON c.program_id = p.id
            WHERE c.id = course_id
            AND p.teacher_id = auth.uid()
        )
    );

-- Policy for selecting course materials
CREATE POLICY select_course_materials ON teaching.course_materials
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy for inserting course timeslots
CREATE POLICY insert_course_timeslots ON teaching.course_timeslots
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM teaching.courses c
            JOIN teaching.programs p ON c.program_id = p.id
            WHERE c.id = course_id
            AND p.teacher_id = auth.uid()
        )
    );

-- Policy for selecting course timeslots
CREATE POLICY select_course_timeslots ON teaching.course_timeslots
    FOR SELECT
    TO authenticated
    USING (true); 