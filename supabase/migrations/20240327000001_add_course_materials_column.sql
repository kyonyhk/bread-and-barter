-- Add course_materials column to courses table
ALTER TABLE teaching.courses
ADD COLUMN IF NOT EXISTS course_materials JSONB[];

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON teaching.courses;
DROP POLICY IF EXISTS "Enable insert for course owners and admins" ON teaching.courses;
DROP POLICY IF EXISTS "Enable update for course owners and admins" ON teaching.courses;

-- Create RLS policies
CREATE POLICY "Enable read access for all users" ON teaching.courses
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for course owners and admins" ON teaching.courses
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1
            FROM auth.users u
            WHERE u.id = auth.uid()
            AND (
                (u.raw_user_meta_data->>'is_admin')::boolean = true
                OR EXISTS (
                    SELECT 1
                    FROM teaching.programs p
                    WHERE p.id = program_id
                    AND p.teacher_id = auth.uid()
                )
            )
        )
    );

CREATE POLICY "Enable update for course owners and admins" ON teaching.courses
    FOR UPDATE USING (
        EXISTS (
            SELECT 1
            FROM auth.users u
            WHERE u.id = auth.uid()
            AND (
                (u.raw_user_meta_data->>'is_admin')::boolean = true
                OR EXISTS (
                    SELECT 1
                    FROM teaching.programs p
                    WHERE p.id = program_id
                    AND p.teacher_id = auth.uid()
                )
            )
        )
    );

-- Grant permissions
GRANT ALL ON teaching.courses TO service_role;
GRANT SELECT, INSERT, UPDATE ON teaching.courses TO authenticated; 