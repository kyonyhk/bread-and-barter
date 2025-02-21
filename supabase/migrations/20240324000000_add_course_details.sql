-- Drop existing function
DROP FUNCTION IF EXISTS public.get_teachers();

-- Create updated stored procedure with course details
CREATE OR REPLACE FUNCTION public.get_teachers()
RETURNS SETOF json
STABLE
SECURITY DEFINER
SET search_path = public, auth, teaching
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    json_build_object(
      'id', au.id,
      'first_name', au.raw_user_meta_data->>'first_name',
      'last_name', au.raw_user_meta_data->>'last_name',
      'description', au.raw_user_meta_data->>'description',
      'interests', au.raw_user_meta_data->>'interests',
      'is_teacher', (au.raw_user_meta_data->>'is_teacher')::boolean,
      'programs', COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id', p.id,
              'name', p.name,
              'description', p.description,
              'status', p.status,
              'courses', COALESCE(
                (
                  SELECT json_agg(
                    json_build_object(
                      'id', c.id,
                      'course_number', c.course_number,
                      'name', c.name,
                      'description', c.description,
                      'price', c.price,
                      'duration', c.duration,
                      'course_details', c.course_details,
                      'max_students', c.max_students,
                      'is_group_session', c.is_group_session,
                      'location', c.location,
                      'credentials_experience', c.credentials_experience,
                      'requirements', c.requirements,
                      'objectives', COALESCE(
                        (
                          SELECT json_agg(
                            json_build_object(
                              'objective_number', co.objective_number,
                              'objective_text', co.objective_text
                            )
                            ORDER BY co.objective_number
                          )
                          FROM teaching.course_objectives co
                          WHERE co.course_id = c.id
                        ),
                        '[]'::json
                      ),
                      'materials', COALESCE(
                        (
                          SELECT json_agg(
                            json_build_object(
                              'name', cm.name,
                              'file_url', cm.file_url
                            )
                          )
                          FROM teaching.course_materials cm
                          WHERE cm.course_id = c.id
                        ),
                        '[]'::json
                      ),
                      'timeslots', COALESCE(
                        (
                          SELECT json_agg(
                            json_build_object(
                              'day', ct.day,
                              'slots', ct.slots
                            )
                          )
                          FROM teaching.course_timeslots ct
                          WHERE ct.course_id = c.id
                        ),
                        '[]'::json
                      )
                    )
                    ORDER BY c.course_number
                  )
                  FROM teaching.courses c
                  WHERE c.program_id = p.id
                ),
                '[]'::json
              )
            )
          )
          FROM teaching.programs p
          WHERE p.teacher_id = au.id
        ),
        '[]'::json
      )
    )
  FROM auth.users au
  WHERE (au.raw_user_meta_data->>'is_teacher')::boolean = true;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_teachers() TO authenticated;
