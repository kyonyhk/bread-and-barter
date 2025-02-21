import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Create a service role client that can access all schemas
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

interface Course {
  id: string;
  course_number: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  course_details: string;
  max_students: number;
  is_group_session: boolean;
  location: string;
  credentials_experience: string | null;
  requirements: string | null;
  image_url: string | null;
  course_objectives?: Array<{
    objective_number: number;
    objective_text: string;
  }>;
  course_materials?: Array<{ name: string; file_url: string }>;
  course_timeslots?: Array<any>;
  objectives?: Array<{ objective_number: number; objective_text: string }>;
  materials?: Array<{ name: string; file_url: string }>;
  timeslots?: Array<any>;
}

interface Teacher {
  id: string;
  email: string;
  raw_user_meta_data: {
    first_name?: string;
    last_name?: string;
    description?: string;
    is_teacher?: boolean;
  };
}

interface Program {
  id: string;
  name: string;
  description: string;
  status: string;
  teacher_id: string;
  teacher: Teacher;
  courses: Course[];
}

export async function GET(
  request: Request,
  { params }: { params: { programId: string } }
) {
  try {
    console.log('[API] Fetching program with ID:', params.programId);

    // First fetch the program from the teaching schema
    const { data: program, error: programError } = await supabase
      .schema('teaching')
      .from('programs')
      .select('*')
      .eq('id', params.programId)
      .single();

    if (programError) {
      console.error('[API] Error fetching program:', programError);
      return NextResponse.json(
        { error: 'Error fetching program', details: programError.message },
        { status: 500 }
      );
    }

    if (!program) {
      console.error('[API] Program not found');
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    // Fetch the teacher data from auth schema
    const { data: teacher, error: teacherError } = await supabase
      .schema('auth')
      .from('users')
      .select('id, email, raw_user_meta_data')
      .eq('id', program.teacher_id)
      .single();

    if (teacherError) {
      console.error('[API] Error fetching teacher:', teacherError);
      return NextResponse.json(
        { error: 'Error fetching teacher data', details: teacherError.message },
        { status: 500 }
      );
    }

    // Fetch the courses and their related data separately
    const { data: courses, error: coursesError } = await supabase
      .schema('teaching')
      .from('courses')
      .select('*')
      .eq('program_id', program.id);

    if (coursesError) {
      console.error('[API] Error fetching courses:', coursesError);
      return NextResponse.json(
        { error: 'Error fetching course data', details: coursesError.message },
        { status: 500 }
      );
    }

    // Fetch related data for each course
    const coursesWithData = await Promise.all(
      (courses || []).map(async (course) => {
        const [{ data: objectives }, { data: materials }, { data: timeslots }] =
          await Promise.all([
            supabase
              .schema('teaching')
              .from('course_objectives')
              .select('objective_number, objective_text')
              .eq('course_id', course.id),
            supabase
              .schema('teaching')
              .from('course_materials')
              .select('name, file_url')
              .eq('course_id', course.id),
            supabase
              .schema('teaching')
              .from('course_timeslots')
              .select('day, slots')
              .eq('course_id', course.id),
          ]);

        console.log('[API] Course materials for course:', {
          courseId: course.id,
          materials: materials || [],
        });

        return {
          ...course,
          course_objectives: objectives || [],
          course_materials: materials || [],
          course_timeslots: timeslots || [],
        };
      })
    );

    // Transform the data to match the expected format
    const transformedProgram = {
      id: program.id,
      name: program.name,
      description: program.description,
      status: program.status,
      teacher: teacher || {
        id: program.teacher_id,
        raw_user_meta_data: {},
      },
      courses: coursesWithData,
    };

    console.log('[API] Successfully fetched program data');
    return NextResponse.json(transformedProgram);
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
