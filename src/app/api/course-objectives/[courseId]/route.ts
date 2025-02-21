import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    console.log(
      '[API] Starting DELETE /api/course-objectives/',
      params.courseId
    );

    // Get the auth header
    const authHeader = request.headers.get('Authorization');
    console.log('[API] Auth header present:', !!authHeader);

    // Create a Supabase client
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    console.log('[API] Created Supabase client');

    // Check session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    console.log('[API] Session check result:', {
      hasSession: !!session,
      sessionError,
      userId: session?.user?.id,
      authHeader,
    });

    // Get user from token if no session
    const {
      data: { user: tokenUser },
      error: tokenError,
    } = await supabase.auth.getUser(authHeader?.split(' ')[1]);

    console.log('[API] Authenticated via token:', tokenUser);

    // Get user info from session or token auth first
    const currentUser = session?.user || tokenUser;
    const userId = currentUser?.id;
    const isAdmin = currentUser?.user_metadata?.is_admin === true;
    console.log('[API] User status:', {
      userId,
      isAdmin,
      metadata: currentUser?.user_metadata,
    });

    // Create a service role client for admin users
    const client = isAdmin
      ? createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
          {
            auth: {
              autoRefreshToken: false,
              persistSession: false,
            },
            db: {
              schema: 'teaching',
            },
          }
        )
      : supabase;

    // Delete all objectives for the course
    const { error: deleteError } = await client
      .from('course_objectives')
      .delete()
      .eq('course_id', params.courseId);

    if (deleteError) {
      console.error('[API] Delete error:', deleteError);
      return NextResponse.json(
        {
          error: 'Failed to delete objectives',
          details: deleteError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'An unexpected error occurred',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
