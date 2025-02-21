import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// GET /api/courses
export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    console.log('[API] Fetching all courses');

    // Query the database with all necessary relationships
    const { data: courses, error } = await supabase
      .from('teaching.courses')
      .select(
        `
        id,
        course_number,
        name,
        description,
        price,
        duration,
        course_details,
        max_students,
        is_group_session,
        location,
        program:teaching.programs (
          id,
          name,
          description,
          status,
          teacher_id
        )
      `
      )
      .order('course_number', { ascending: true })
      .limit(10);

    if (error) {
      console.error('[API] Database error:', error);
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      );
    }

    console.log('[API] Courses found:', courses);
    return NextResponse.json(courses);
  } catch (error) {
    console.error('[API] Error fetching courses:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST /api/courses
export async function POST(request: Request) {
  try {
    console.log('[API] Starting POST /api/courses');

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

    // Get the request body
    const body = await request.json();
    console.log('[API] Request body:', body);

    // Validate required fields
    const requiredFields = [
      'program_id',
      'name',
      'price',
      'course_number',
      'duration',
      'course_details',
      'max_students',
      'location',
    ];

    const missingFields = requiredFields.filter(
      (field) => body[field] === undefined || body[field] === null
    );
    if (missingFields.length > 0) {
      console.error('[API] Missing required fields:', missingFields);
      return NextResponse.json(
        {
          error: 'Missing required fields',
          details: `Missing fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      );
    }

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

    // Verify program exists and belongs to user
    const { data: program, error: programError } = await client
      .from('programs')
      .select('id, teacher_id, name')
      .eq('id', body.program_id)
      .single();

    console.log('[API] Program check result:', { program, programError });

    if (programError) {
      console.error('[API] Program not found:', programError);
      return NextResponse.json(
        {
          error: 'Program not found',
          details: programError.message,
        },
        { status: 404 }
      );
    }

    if (!program) {
      console.error('[API] Program not found with ID:', body.program_id);
      return NextResponse.json(
        {
          error: 'Program not found',
          details: `No program found with ID: ${body.program_id}`,
        },
        { status: 404 }
      );
    }

    // Check permissions - allow if admin or program owner
    if (!isAdmin && program.teacher_id !== userId) {
      console.error(
        '[API] User does not have permission to add courses to this program',
        {
          userId,
          isAdmin,
          userMetadata: currentUser?.user_metadata,
          programTeacherId: program.teacher_id,
          programName: program.name,
        }
      );
      return NextResponse.json(
        { error: 'Unauthorized to add courses to this program' },
        { status: 403 }
      );
    }

    // Insert the course
    console.log(
      '[API] Attempting to insert course with data:',
      JSON.stringify(body, null, 2)
    );
    const { data: course, error: insertError } = await client
      .from('courses')
      .insert(body)
      .select()
      .single();

    if (insertError) {
      console.error('[API] Insert error full details:', insertError);
      return NextResponse.json(
        { error: 'Failed to create course', details: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(course);
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
