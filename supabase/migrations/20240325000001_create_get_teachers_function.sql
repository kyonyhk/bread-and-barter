-- Drop the function if it exists
DROP FUNCTION IF EXISTS get_teachers_with_metadata();

-- Create a function to get teachers with their metadata
CREATE OR REPLACE FUNCTION get_teachers_with_metadata()
RETURNS TABLE (
  id uuid,
  first_name text,
  last_name text,
  description text,
  interests text,
  is_teacher text
) 
SECURITY DEFINER
SET search_path = auth, public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    au.id,
    COALESCE((au.raw_user_meta_data->>'first_name')::text, '')::text as first_name,
    COALESCE((au.raw_user_meta_data->>'last_name')::text, '')::text as last_name,
    COALESCE((au.raw_user_meta_data->>'description')::text, '')::text as description,
    COALESCE((au.raw_user_meta_data->>'interests')::text, '[]')::text as interests,
    COALESCE((au.raw_user_meta_data->>'is_teacher')::text, 'false')::text as is_teacher
  FROM auth.users au
  WHERE (au.raw_user_meta_data->>'is_teacher')::text = 'true';
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_teachers_with_metadata() TO authenticated;
GRANT EXECUTE ON FUNCTION get_teachers_with_metadata() TO service_role;