-- Add is_admin column to auth.users if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'auth'
        AND table_name = 'users'
        AND column_name = 'is_admin'
    ) THEN
        ALTER TABLE auth.users ADD COLUMN is_admin BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Create admin role
CREATE ROLE admin;
GRANT authenticated TO admin;

-- Update RLS policies to allow admin access
DROP POLICY IF EXISTS insert_courses ON teaching.courses;
CREATE POLICY insert_courses ON teaching.courses
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM auth.users u
            WHERE u.id = auth.uid()
            AND (
                u.is_admin = true
                OR EXISTS (
                    SELECT 1
                    FROM teaching.programs p
                    WHERE p.id = program_id
                    AND p.teacher_id = auth.uid()
                )
            )
        )
    );

DROP POLICY IF EXISTS insert_course_objectives ON teaching.course_objectives;
CREATE POLICY insert_course_objectives ON teaching.course_objectives
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM auth.users u
            WHERE u.id = auth.uid()
            AND (
                u.is_admin = true
                OR EXISTS (
                    SELECT 1
                    FROM teaching.courses c
                    JOIN teaching.programs p ON c.program_id = p.id
                    WHERE c.id = course_id
                    AND p.teacher_id = auth.uid()
                )
            )
        )
    );

DROP POLICY IF EXISTS insert_course_materials ON teaching.course_materials;
CREATE POLICY insert_course_materials ON teaching.course_materials
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM auth.users u
            WHERE u.id = auth.uid()
            AND (
                u.is_admin = true
                OR EXISTS (
                    SELECT 1
                    FROM teaching.courses c
                    JOIN teaching.programs p ON c.program_id = p.id
                    WHERE c.id = course_id
                    AND p.teacher_id = auth.uid()
                )
            )
        )
    );

DROP POLICY IF EXISTS insert_course_timeslots ON teaching.course_timeslots;
CREATE POLICY insert_course_timeslots ON teaching.course_timeslots
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM auth.users u
            WHERE u.id = auth.uid()
            AND (
                u.is_admin = true
                OR EXISTS (
                    SELECT 1
                    FROM teaching.courses c
                    JOIN teaching.programs p ON c.program_id = p.id
                    WHERE c.id = course_id
                    AND p.teacher_id = auth.uid()
                )
            )
        )
    );

-- Function to set user as admin
CREATE OR REPLACE FUNCTION auth.make_user_admin(user_id uuid)
RETURNS void AS $$
BEGIN
    UPDATE auth.users
    SET is_admin = true,
        raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"is_admin": true}'::jsonb
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 