import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// GET /api/teachers/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: teacher, error } = await supabase
      .from('auth.users')
      .select(
        `
        id,
        raw_user_meta_data->>'first_name' as first_name,
        raw_user_meta_data->>'last_name' as last_name,
        raw_user_meta_data->>'description' as description,
        raw_user_meta_data->>'interests' as interests,
        teaching_programs:teaching.programs(
          id,
          name,
          description,
          teaching_courses:teaching.courses(
            id,
            course_number,
            name,
            price,
            duration,
            course_details,
            credentials_experience,
            requirements,
            course_objectives:teaching.course_objectives(
              objective_number,
              objective_text
            ),
            course_materials:teaching.course_materials(
              name,
              file_url
            ),
            course_timeslots:teaching.course_timeslots(
              day,
              slots
            )
          )
        )
      `
      )
      .eq('id', params.id)
      .eq("raw_user_meta_data->>'is_teacher'", true)
      .single();

    if (error) throw error;
    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    return NextResponse.json(teacher);
  } catch (error) {
    console.error('Error fetching teacher:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PATCH /api/teachers/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { data: teacher, error } = await supabase
      .from('auth.users')
      .update({
        raw_user_meta_data: {
          first_name: body.first_name,
          last_name: body.last_name,
          description: body.description,
          interests: body.interests,
          is_teacher: true,
        },
      })
      .eq('id', params.id)
      .eq("raw_user_meta_data->>'is_teacher'", true)
      .select()
      .single();

    if (error) throw error;
    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    return NextResponse.json(teacher);
  } catch (error) {
    console.error('Error updating teacher:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
