-- Create course-materials bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('course-materials', 'course-materials', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for course-materials bucket
DROP POLICY IF EXISTS "Give users read access to course materials" ON storage.objects;
DROP POLICY IF EXISTS "Allow teachers and admins to upload course materials" ON storage.objects;
DROP POLICY IF EXISTS "Allow teachers and admins to delete course materials" ON storage.objects;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Give users read access to course materials"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-materials');

CREATE POLICY "Allow teachers and admins to upload course materials"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'course-materials'
    AND (
        EXISTS (
            SELECT 1
            FROM auth.users u
            WHERE u.id = auth.uid()
            AND (
                (u.raw_user_meta_data->>'is_admin')::boolean = true
                OR EXISTS (
                    SELECT 1
                    FROM teaching.programs p
                    WHERE p.teacher_id = u.id
                )
            )
        )
    )
);

CREATE POLICY "Allow teachers and admins to delete course materials"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'course-materials'
    AND (
        EXISTS (
            SELECT 1
            FROM auth.users u
            WHERE u.id = auth.uid()
            AND (
                (u.raw_user_meta_data->>'is_admin')::boolean = true
                OR EXISTS (
                    SELECT 1
                    FROM teaching.programs p
                    WHERE p.teacher_id = u.id
                )
            )
        )
    )
); 