import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    console.log('[API] Updating objectives for course:', courseId);

    // Create a Supabase client with the teaching schema
    const cookieStore = cookies();
    const serviceClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          persistSession: false,
        },
        db: {
          schema: 'teaching',
        },
      }
    );

    // Get the session from cookies
    const authClient = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await authClient.auth.getSession();

    if (!session) {
      console.log('[API] No session found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[API] User authenticated:', session.user.id);

    // Get the course to check ownership
    const { data: course, error: courseError } = await serviceClient
      .from('courses')
      .select('id, program_id')
      .eq('id', courseId)
      .single();

    if (courseError || !course) {
      console.error('[API] Error fetching course:', courseError);
      return NextResponse.json(
        {
          error: 'Course not found',
          details:
            courseError?.message || 'No course found with the provided ID',
        },
        { status: 404 }
      );
    }

    // Get the program to check ownership
    const { data: program, error: programError } = await serviceClient
      .from('programs')
      .select('teacher_id')
      .eq('id', course.program_id)
      .single();

    if (programError || !program) {
      console.error('[API] Error fetching program:', programError);
      return NextResponse.json(
        {
          error: 'Program not found',
          details: programError?.message || 'No program found for this course',
        },
        { status: 404 }
      );
    }

    console.log('[API] Program found:', {
      programId: course.program_id,
      teacherId: program.teacher_id,
      userId: session.user.id,
    });

    // Check if user is the teacher or an admin
    const isTeacher = program.teacher_id === session.user.id;

    // Check admin status from user metadata directly from the session
    const isAdmin = session.user.user_metadata?.is_admin === true;

    console.log('[API] Authorization check:', {
      isTeacher,
      isAdmin,
      userId: session.user.id,
      teacherId: program.teacher_id,
      userMetadata: session.user.user_metadata,
    });

    if (!isTeacher && !isAdmin) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          details: 'User must be the teacher or an admin',
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { objectives } = body;

    console.log('[API] Received objectives:', objectives);

    if (!Array.isArray(objectives)) {
      return NextResponse.json(
        { error: 'Objectives must be an array' },
        { status: 400 }
      );
    }

    // First delete existing objectives using service role client
    const { error: deleteError } = await serviceClient
      .from('course_objectives')
      .delete()
      .eq('course_id', courseId);

    if (deleteError) {
      console.error('[API] Error deleting objectives:', deleteError);
      return NextResponse.json(
        {
          error: 'Failed to delete existing objectives',
          details: deleteError.message,
        },
        { status: 500 }
      );
    }

    // Then insert new objectives using service role client
    if (objectives.length > 0) {
      const { error: insertError } = await serviceClient
        .from('course_objectives')
        .insert(
          objectives.map((objective: any) => ({
            course_id: courseId,
            objective_number: objective.objective_number,
            objective_text: objective.objective_text,
          }))
        );

      if (insertError) {
        console.error('[API] Error inserting objectives:', insertError);
        return NextResponse.json(
          {
            error: 'Failed to insert objectives',
            details: insertError.message,
          },
          { status: 500 }
        );
      }
    }

    console.log('[API] Successfully updated objectives');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
