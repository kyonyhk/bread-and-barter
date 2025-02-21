-- Create the course_timeslots table
CREATE TABLE IF NOT EXISTS teaching.course_timeslots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES teaching.courses(id) ON DELETE CASCADE,
  day TEXT NOT NULL,
  slots JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_timeslots_course ON teaching.course_timeslots(course_id);

-- Enable RLS
ALTER TABLE teaching.course_timeslots ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Enable read access for all users" ON teaching.course_timeslots
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for course owners and admins" ON teaching.course_timeslots
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1
            FROM auth.users u
            WHERE u.id = auth.uid()
            AND (
                (u.raw_user_meta_data->>'is_admin')::boolean = true
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

CREATE POLICY "Enable delete for course owners and admins" ON teaching.course_timeslots
    FOR DELETE USING (
        EXISTS (
            SELECT 1
            FROM auth.users u
            WHERE u.id = auth.uid()
            AND (
                (u.raw_user_meta_data->>'is_admin')::boolean = true
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

-- Grant permissions
GRANT ALL ON teaching.course_timeslots TO service_role;
GRANT SELECT, INSERT, DELETE ON teaching.course_timeslots TO authenticated;
GRANT USAGE ON SCHEMA teaching TO authenticated; 