import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('[API] Starting POST /api/course-timeslots');
    const cookieStore = cookies();

    // Create a Supabase client for auth
    const supabase = createRouteHandlerClient({ cookies });

    // Get session from cookie
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    console.log('[API] Session check:', {
      hasSessionData: !!sessionData,
      hasSession: !!sessionData.session,
      userId: sessionData.session?.user?.id,
      error: sessionError?.message,
      hasCookies: cookieStore.getAll().length > 0,
      cookieNames: cookieStore.getAll().map((c) => c.name),
    });

    if (sessionError) {
      console.error('[API] Session error:', sessionError);
      return NextResponse.json(
        {
          error: 'Session Error',
          details: 'Error validating session: ' + sessionError.message,
        },
        { status: 401 }
      );
    }

    if (!sessionData.session) {
      console.log('[API] No session found, returning 401');
      return NextResponse.json(
        {
          error: 'Unauthorized',
          details: 'No valid session found. Please ensure you are logged in.',
        },
        { status: 401 }
      );
    }

    const session = sessionData.session;

    // Check if user is admin from session metadata
    const isAdmin = session.user.user_metadata?.is_admin === true;

    console.log('[API] User check:', {
      userId: session.user.id,
      email: session.user.email,
      isAdmin,
      metadata: session.user.user_metadata,
    });

    if (!isAdmin) {
      console.log('[API] User is not admin, returning 403');
      return NextResponse.json(
        {
          error: 'Forbidden',
          details: 'User does not have admin privileges',
        },
        { status: 403 }
      );
    }

    // Create a service role client for admin operations
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL)
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');

    const serviceClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          persistSession: false,
        },
      }
    );

    // Get and validate request body
    const body = await request.json();
    const { course_id, timeslots } = body;

    console.log('[API] Request body:', {
      course_id,
      timeslotsCount: timeslots?.length,
      timeslots,
    });

    if (!course_id) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          details: 'Course ID is required',
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(timeslots)) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          details: 'Timeslots must be an array',
        },
        { status: 400 }
      );
    }

    // First delete existing timeslots using service role client
    const { error: deleteError } = await serviceClient
      .schema('teaching')
      .from('course_timeslots')
      .delete()
      .eq('course_id', course_id);

    if (deleteError) {
      console.error('[API] Delete error:', deleteError);
      return NextResponse.json(
        {
          error: 'Database Error',
          details:
            'Failed to delete existing timeslots: ' + deleteError.message,
        },
        { status: 500 }
      );
    }

    // Then insert new timeslots using service role client
    const { error: insertError } = await serviceClient
      .schema('teaching')
      .from('course_timeslots')
      .insert(
        timeslots.map((timeslot: any) => ({
          course_id,
          day: timeslot.day,
          slots: timeslot.slots,
        }))
      );

    if (insertError) {
      console.error('[API] Insert error:', insertError);
      return NextResponse.json(
        {
          error: 'Database Error',
          details: 'Failed to insert timeslots: ' + insertError.message,
        },
        { status: 500 }
      );
    }

    console.log('[API] Successfully saved timeslots');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: 'An unexpected error occurred while processing your request',
      },
      { status: 500 }
    );
  }
}
