import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'http://127.0.0.1:54321';
const SUPABASE_SERVICE_ROLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

async function setupAdmin() {
  try {
    // Create Supabase client with service role key
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Create admin user
    const { data: user, error: createError } =
      await supabase.auth.admin.createUser({
        email: 'kuoloon@hotmail.com',
        password: '12345678',
        email_confirm: true,
        user_metadata: {
          first_name: 'Kuoloon',
          last_name: 'Chong',
          is_admin: true,
          is_teacher: true,
        },
      });

    if (createError) {
      if (createError.message.includes('already been registered')) {
        console.log('Admin user already exists, proceeding with setup...');
      } else {
        throw createError;
      }
    } else {
      console.log('Admin user created:', user);
    }

    // Get the user ID (either from creation or existing user)
    const { data: userData } = await supabase
      .from('auth.users')
      .select('id')
      .eq('email', 'kuoloon@hotmail.com')
      .single();

    if (userData?.id) {
      // Create default program for admin
      const { error: programError } = await supabase
        .from('teaching.programs')
        .insert({
          id: '00000000-0000-0000-0000-000000000002',
          teacher_id: userData.id,
          name: 'Admin Program',
          description: 'Default program for admin user',
          status: 'approved',
        })
        .select()
        .single();

      if (programError) {
        if (programError.code === '23505') {
          // Unique violation
          console.log('Default program already exists');
        } else {
          console.error('Error creating program:', programError);
        }
      } else {
        console.log('Default program created for admin');
      }

      // Update admin flag and metadata
      const { error: updateError } = await supabase
        .from('auth.users')
        .update({
          is_admin: true,
          raw_user_meta_data: {
            first_name: 'Kuoloon',
            last_name: 'Chong',
            is_admin: true,
            is_teacher: true,
          },
        })
        .eq('id', userData.id);

      if (updateError) {
        console.error('Error updating user:', updateError);
      } else {
        console.log('User updated successfully');
      }
    }
  } catch (error) {
    console.error('Error setting up admin:', error);
  }
}

setupAdmin();
