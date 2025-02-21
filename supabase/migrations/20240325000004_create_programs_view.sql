-- Create a view that combines teachers, programs, and courses
CREATE OR REPLACE VIEW teaching.programs_with_teachers_and_courses AS
SELECT 
    p.id AS program_id,
    p.name AS program_name,
    p.description AS program_description,
    p.status AS program_status,
    p.created_at AS program_created_at,
    p.updated_at AS program_updated_at,
    u.id AS teacher_id,
    u.raw_user_meta_data AS teacher_meta,
    c.id AS course_id,
    c.course_number,
    c.name AS course_name,
    c.description AS course_description,
    c.price AS course_price,
    c.duration AS course_duration,
    c.course_details,
    c.max_students,
    c.is_group_session,
    c.location AS course_location,
    c.created_at AS course_created_at,
    c.updated_at AS course_updated_at
FROM teaching.programs p
LEFT JOIN auth.users u ON p.teacher_id = u.id
LEFT JOIN teaching.courses c ON c.program_id = p.id;

-- Grant access to the view
GRANT SELECT ON teaching.programs_with_teachers_and_courses TO anon, authenticated, service_role;

-- Create a function to get approved programs with their courses
CREATE OR REPLACE FUNCTION teaching.get_approved_programs()
RETURNS TABLE (
    program_id UUID,
    program_name TEXT,
    program_description TEXT,
    teacher_id UUID,
    teacher_meta JSONB,
    courses JSONB
) AS $$
BEGIN
    RETURN QUERY
    WITH program_data AS (
        SELECT DISTINCT
            v.program_id,
            v.program_name,
            v.program_description,
            v.teacher_id,
            v.teacher_meta,
            jsonb_agg(
                CASE WHEN v.course_id IS NOT NULL THEN
                    jsonb_build_object(
                        'id', v.course_id,
                        'name', v.course_name,
                        'description', v.course_description,
                        'course_number', v.course_number,
                        'price', v.course_price,
                        'duration', v.course_duration,
                        'course_details', v.course_details,
                        'max_students', v.max_students,
                        'is_group_session', v.is_group_session,
                        'location', v.course_location
                    )
                ELSE NULL
                END
            ) FILTER (WHERE v.course_id IS NOT NULL) AS courses
        FROM teaching.programs_with_teachers_and_courses v
        WHERE v.program_status = 'approved'
        GROUP BY 
            v.program_id,
            v.program_name,
            v.program_description,
            v.teacher_id,
            v.teacher_meta
    )
    SELECT 
        pd.program_id,
        pd.program_name,
        pd.program_description,
        pd.teacher_id,
        pd.teacher_meta,
        COALESCE(pd.courses, '[]'::jsonb) as courses
    FROM program_data pd
    ORDER BY pd.program_name;
END;
$$ LANGUAGE plpgsql; 