import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/courses/[id]
export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    console.log('[API] Fetching course data for ID:', params.courseId);

    // Create a service role client for consistent schema access
    const serviceClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          persistSession: false,
        },
      }
    );

    // First get the course data
    const { data: course, error: courseError } = await serviceClient
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
        credentials_experience,
        requirements,
        image_url,
        program:teaching.programs!inner(
          id,
          name,
          description,
          teacher:auth.users!inner(
            id,
            raw_user_meta_data->>'first_name' as first_name,
            raw_user_meta_data->>'last_name' as last_name,
            raw_user_meta_data->>'description' as description
          )
        ),
        course_objectives:teaching.course_objectives(
          objective_number,
          objective_text
        ),
        course_timeslots:teaching.course_timeslots(
          day,
          slots
        )
      `
      )
      .eq('id', params.courseId)
      .single();

    if (courseError) {
      console.error('[API] Database error:', courseError);
      return NextResponse.json(
        { error: 'Database error', details: courseError.message },
        { status: 500 }
      );
    }

    if (!course) {
      console.log('[API] Course not found for ID:', params.courseId);
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Separately fetch course materials
    const { data: materials, error: materialsError } = await serviceClient
      .from('teaching.course_materials')
      .select('*')
      .eq('course_id', params.courseId);

    if (materialsError) {
      console.error('[API] Error fetching materials:', materialsError);
      return NextResponse.json(
        { error: 'Error fetching materials', details: materialsError.message },
        { status: 500 }
      );
    }

    // Combine course data with materials
    const courseWithMaterials = {
      ...course,
      course_materials: materials || [],
    };

    console.log('[API] Course data found:', courseWithMaterials);
    return NextResponse.json(courseWithMaterials);
  } catch (error) {
    console.error('[API] Error fetching course:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

interface CourseMaterial {
  name: string;
  file_url: string;
}

interface CourseData {
  id: string;
  course_number?: string;
  name?: string;
  description?: string;
  price?: number;
  duration?: string;
  course_details?: string;
  max_students?: number;
  is_group_session?: boolean;
  location?: string;
  credentials_experience?: string;
  requirements?: string;
  image_url?: string;
  program_id?: string;
  course_materials?: CourseMaterial[];
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CourseData = await req.json();
    console.log('[PATCH Course] Request body:', body);

    // Create service role client for the update
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

    // Handle course materials separately if they exist in the request
    if (body.course_materials) {
      const materials = body.course_materials;
      delete body.course_materials; // Remove from main update

      console.log('[PATCH Course] Processing materials:', materials);

      // First delete existing materials
      const { error: deleteError } = await serviceClient
        .from('course_materials')
        .delete()
        .eq('course_id', params.courseId);

      if (deleteError) {
        console.error('[PATCH Course] Error deleting materials:', deleteError);
        return NextResponse.json(
          { error: 'Failed to update materials', details: deleteError.message },
          { status: 500 }
        );
      }

      // Then insert new materials
      if (materials.length > 0) {
        const { error: insertError } = await serviceClient
          .from('course_materials')
          .insert(
            materials.map((material: CourseMaterial) => ({
              course_id: params.courseId,
              name: material.name,
              file_url: material.file_url,
            }))
          );

        if (insertError) {
          console.error(
            '[PATCH Course] Error inserting materials:',
            insertError
          );
          return NextResponse.json(
            {
              error: 'Failed to insert materials',
              details: insertError.message,
            },
            { status: 500 }
          );
        }
      }
    }

    // Update the course with the remaining data
    const { data: updatedCourse, error: updateError } = await serviceClient
      .from('courses')
      .update(body)
      .eq('id', params.courseId)
      .select();

    if (updateError) {
      console.error('[PATCH Course] Database error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update course', details: updateError.message },
        { status: 500 }
      );
    }

    // Fetch updated materials
    const { data: materials, error: materialsError } = await serviceClient
      .from('course_materials')
      .select('*')
      .eq('course_id', params.courseId);

    if (materialsError) {
      console.error(
        '[PATCH Course] Error fetching updated materials:',
        materialsError
      );
      return NextResponse.json(
        {
          error: 'Failed to fetch updated materials',
          details: materialsError.message,
        },
        { status: 500 }
      );
    }

    // Get the first course from the update result, or use existing course ID
    const course = (updatedCourse && updatedCourse[0]) || {
      id: params.courseId,
    };

    // Combine and return the final response
    const response = {
      id: course.id,
      course_number: course.course_number,
      name: course.name,
      description: course.description,
      price: course.price,
      duration: course.duration,
      course_details: course.course_details,
      max_students: course.max_students,
      is_group_session: course.is_group_session,
      location: course.location,
      credentials_experience: course.credentials_experience,
      requirements: course.requirements,
      image_url: course.image_url,
      program_id: course.program_id,
      course_materials: materials || [],
    };

    console.log('[PATCH Course] Update successful:', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('[PATCH Course] Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'Error updating course',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
