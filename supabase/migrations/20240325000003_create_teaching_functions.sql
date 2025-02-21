-- Function to get programs for specific teachers
CREATE OR REPLACE FUNCTION get_teacher_programs(teacher_ids UUID[])
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  status TEXT,
  teacher_id UUID
) 
SECURITY DEFINER
SET search_path = teaching, public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.description,
    p.status,
    p.teacher_id
  FROM teaching.programs p
  WHERE p.teacher_id = ANY(teacher_ids);
END;
$$;

-- Function to get courses for specific programs
CREATE OR REPLACE FUNCTION get_program_courses(program_ids UUID[])
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  course_number INTEGER,
  price DECIMAL(10,2),
  duration TEXT,
  image_url TEXT,
  program_id UUID
) 
SECURITY DEFINER
SET search_path = teaching, public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.name,
    c.description,
    c.course_number,
    c.price,
    c.duration,
    c.image_url,
    c.program_id
  FROM teaching.courses c
  WHERE c.program_id = ANY(program_ids);
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_teacher_programs(UUID[]) TO authenticated;
GRANT EXECUTE ON FUNCTION get_teacher_programs(UUID[]) TO service_role;
GRANT EXECUTE ON FUNCTION get_program_courses(UUID[]) TO authenticated;
GRANT EXECUTE ON FUNCTION get_program_courses(UUID[]) TO service_role; 