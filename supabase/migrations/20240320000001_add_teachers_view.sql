-- Drop the view if it exists
DROP VIEW IF EXISTS public.teachers;

-- Create a view for teachers in public schema
CREATE OR REPLACE VIEW public.teachers AS
SELECT 
    u.id,
    u.raw_user_meta_data->>'first_name' as first_name,
    u.raw_user_meta_data->>'last_name' as last_name,
    u.raw_user_meta_data->>'description' as description,
    u.raw_user_meta_data->>'interests' as interests,
    (u.raw_user_meta_data->>'is_teacher')::boolean as is_teacher
FROM auth.users u
WHERE (u.raw_user_meta_data->>'is_teacher')::boolean = true;

-- Grant permissions
GRANT SELECT ON public.teachers TO anon, authenticated; 