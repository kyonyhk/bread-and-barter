import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('[API] Starting POST /api/course-materials');

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
    if (!body.courseId || !body.materials) {
      console.error('[API] Invalid request body');
      return NextResponse.json(
        {
          error: 'Invalid request body',
          details: 'Missing courseId or materials',
        },
        { status: 400 }
      );
    }

    // Delete existing materials for this course
    console.log('[API] Deleting existing materials for course:', body.courseId);
    const { error: deleteError } = await supabase
      .from('course_materials')
      .delete()
      .eq('course_id', body.courseId);

    if (deleteError) {
      console.error('[API] Delete error:', deleteError);
      return NextResponse.json(
        {
          error: 'Failed to delete existing materials',
          details: deleteError.message,
        },
        { status: 500 }
      );
    }

    // Insert new materials
    const materials = body.materials.map((material: any) => ({
      course_id: body.courseId,
      name: material.name,
      file_url: material.file_url,
    }));

    console.log('[API] Inserting materials:', materials);
    const { data: insertedMaterials, error: insertError } = await supabase
      .from('course_materials')
      .insert(materials)
      .select();

    if (insertError) {
      console.error('[API] Insert error:', insertError);
      return NextResponse.json(
        {
          error: 'Failed to create materials',
          details: insertError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(insertedMaterials);
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
