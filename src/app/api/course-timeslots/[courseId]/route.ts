import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    console.log('[API] Starting DELETE /api/course-timeslots/[courseId]', {
      courseId: params.courseId,
      params,
    });

    // Validate UUID format
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(params.courseId)) {
      console.error('[API] Invalid UUID format:', params.courseId);
      return NextResponse.json(
        { error: 'Invalid course ID format' },
        { status: 400 }
      );
    }

    // Create a Supabase client
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Check session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // First verify the course exists
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('id')
      .eq('id', params.courseId)
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

    // Delete all timeslots for the course
    console.log('[API] Deleting timeslots for course:', params.courseId);
    const { error: deleteError, count } = await supabase
      .from('course_timeslots')
      .delete()
      .eq('course_id', params.courseId);

    if (deleteError) {
      console.error('[API] Delete error:', deleteError);
      return NextResponse.json(
        {
          error: 'Failed to delete timeslots',
          details: deleteError.message,
        },
        { status: 500 }
      );
    }

    console.log('[API] Successfully deleted timeslots:', { count });
    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error('[API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
