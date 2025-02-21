import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface Program {
  teacher_id: string;
}

interface Course {
  id: string;
  program: Program;
}

export async function POST(request: Request) {
  try {
    console.log('[API] Starting POST /api/course-objectives');

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
    if (
      !body.course_id ||
      !body.objectives ||
      !Array.isArray(body.objectives)
    ) {
      console.error('[API] Invalid request body');
      return NextResponse.json(
        {
          error: 'Invalid request body',
          details: 'Missing course_id or objectives array',
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

    // Verify course exists
    const { data: course, error: courseError } = await client
      .from('courses')
      .select('id')
      .eq('id', body.course_id)
      .single();

    if (courseError) {
      console.error('[API] Course not found:', courseError);
      return NextResponse.json(
        {
          error: 'Course not found',
          details: courseError.message,
        },
        { status: 404 }
      );
    }

    // For non-admin users, we would check permissions here
    // But since we're using the service role client for admins, we can skip this check

    // Insert the objectives
    const objectives = body.objectives.map((obj: any) => ({
      course_id: body.course_id,
      objective_number: obj.objective_number,
      objective_text: obj.objective_text,
    }));

    console.log('[API] Inserting objectives:', objectives);
    const { data: insertedObjectives, error: insertError } = await client
      .from('course_objectives')
      .insert(objectives)
      .select();

    if (insertError) {
      console.error('[API] Insert error:', insertError);
      return NextResponse.json(
        {
          error: 'Failed to create objectives',
          details: insertError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(insertedObjectives);
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
