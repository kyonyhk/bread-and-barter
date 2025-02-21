import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { programId: string; courseId: string } }
) {
  try {
    const { programId, courseId } = params;
    const supabase = createRouteHandlerClient({ cookies });

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the program to check ownership
    const { data: program, error: programError } = await supabase
      .from('programs')
      .select('teacher_id')
      .eq('id', programId)
      .single();

    if (programError || !program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    // Check if user is the teacher of this program
    if (program.teacher_id !== session.user.id) {
      const { data: userMeta } = await supabase
        .from('user_meta')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();

      // Only allow if user is an admin
      if (!userMeta?.is_admin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }
    }

    const body = await request.json();
    const { image_url } = body;

    // Validate input
    if (!image_url) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Update the course image URL
    const { data, error } = await supabase
      .from('courses')
      .update({ image_url })
      .eq('id', courseId)
      .eq('program_id', programId)
      .select()
      .single();

    if (error) {
      console.error('Error updating course image:', error);
      return NextResponse.json(
        { error: 'Failed to update course image' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in course image update:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
