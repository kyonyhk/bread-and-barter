-- Function to delete a user by email
CREATE OR REPLACE FUNCTION auth.delete_user_by_email(p_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth, public
AS $$
DECLARE
    v_user_id uuid;
BEGIN
    -- Get the user ID
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = p_email;

    -- If user exists, delete related records
    IF v_user_id IS NOT NULL THEN
        -- Delete from auth.identities
        DELETE FROM auth.identities WHERE user_id = v_user_id;
        
        -- Delete from auth.sessions
        DELETE FROM auth.sessions WHERE user_id = v_user_id;
        
        -- Delete from auth.users
        DELETE FROM auth.users WHERE id = v_user_id;
    END IF;
END;
$$;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION auth.delete_user_by_email(TEXT) TO service_role; 