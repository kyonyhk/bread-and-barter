import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('[API] Starting POST /api/upload');
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const courseId = formData.get('courseId') as string;

    if (!file || !courseId) {
      return NextResponse.json(
        { error: 'File and courseId are required' },
        { status: 400 }
      );
    }

    // Create a service role client for storage operations
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

    // Check if user is authorized to upload
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin or teacher of the course
    const { data: courseData, error: authError } = await serviceClient
      .from('courses')
      .select('program_id')
      .eq('id', courseId)
      .single();

    if (authError || !courseData) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Check if user is admin or teacher of the program
    const { data: programData, error: programError } = await serviceClient
      .from('programs')
      .select('teacher_id')
      .eq('id', courseData.program_id)
      .single();

    if (programError || !programData) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    const isTeacher = programData.teacher_id === session.user.id;
    const isAdmin = session.user.user_metadata.is_admin === true;

    if (!isTeacher && !isAdmin) {
      return NextResponse.json(
        { error: 'Not authorized to upload to this course' },
        { status: 403 }
      );
    }

    // Upload file to storage
    const timestamp = new Date().getTime();
    const fileExt = file.name.split('.').pop();
    const filePath = `${courseId}/${timestamp}-${file.name}`;

    const { data: uploadData, error: uploadError } = await serviceClient.storage
      .from('course-materials')
      .upload(filePath, file);

    if (uploadError) {
      console.error('[API] Upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload file', details: uploadError.message },
        { status: 500 }
      );
    }

    // Get the public URL
    const { data: publicUrlData } = serviceClient.storage
      .from('course-materials')
      .getPublicUrl(filePath);

    // Save material to the course_materials table
    console.log('[API] Attempting to save material:', {
      courseId,
      fileName: file.name,
      fileUrl: publicUrlData.publicUrl,
    });

    const { data: material, error: insertError } = await serviceClient
      .from('course_materials')
      .insert({
        course_id: courseId,
        name: file.name,
        file_url: publicUrlData.publicUrl,
      })
      .select()
      .single();

    if (insertError) {
      console.error('[API] Database error details:', {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code,
      });
      // Clean up the uploaded file
      await serviceClient.storage.from('course-materials').remove([filePath]);
      return NextResponse.json(
        { error: 'Failed to save material', details: insertError.message },
        { status: 500 }
      );
    }

    console.log('[API] Material saved successfully:', material);
    return NextResponse.json(material);
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
