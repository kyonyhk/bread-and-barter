import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

interface TeacherMetadata {
  id: string;
  first_name: string;
  last_name: string;
  description: string;
  interests: string;
  is_teacher: string;
}

interface Program {
  id: string;
  name: string;
  description: string;
  status: string;
  teacher_id: string;
}

interface Course {
  id: string;
  name: string;
  description: string;
  course_number: number;
  price: number;
  duration: string;
  image_url: string;
  program_id: string;
}

interface ProgramWithCourses extends Program {
  courses: Course[];
}

interface TransformedTeacher {
  id: string;
  first_name: string;
  last_name: string;
  description: string;
  interests: string[];
  is_teacher: boolean;
  programs: Omit<ProgramWithCourses, 'teacher_id'>[];
}

// GET /api/teachers
export async function GET() {
  try {
    console.log('[API] Starting to fetch teachers...');

    // Get all teachers using the stored procedure
    console.log('[API] Calling get_teachers_with_metadata...');
    const { data: users, error: usersError } = await supabaseAdmin.rpc(
      'get_teachers_with_metadata'
    );

    if (usersError) {
      console.error('[API] Database error fetching users:', {
        message: usersError.message,
        details: usersError.details,
        hint: usersError.hint,
        code: usersError.code,
      });
      return NextResponse.json(
        { error: 'Database error', details: usersError.message },
        { status: 500 }
      );
    }

    console.log('[API] Teachers fetched:', users);

    if (!users || users.length === 0) {
      console.log('[API] No teachers found in the database');
      return NextResponse.json({ error: 'No teachers found' }, { status: 404 });
    }

    // Get programs for these teachers using RPC
    const teacherIds = (users as TeacherMetadata[]).map((user) => user.id);
    console.log('[API] Fetching programs for teacher IDs:', teacherIds);

    const { data: programs, error: programsError } = await supabaseAdmin.rpc(
      'get_teacher_programs',
      { teacher_ids: teacherIds }
    );

    if (programsError) {
      console.error('[API] Database error fetching programs:', {
        message: programsError.message,
        details: programsError.details,
        hint: programsError.hint,
        code: programsError.code,
      });
      return NextResponse.json(
        { error: 'Database error', details: programsError.message },
        { status: 500 }
      );
    }

    console.log('[API] Programs fetched:', programs);

    // Get courses for these programs using RPC
    const programIds = programs?.map((program) => program.id) || [];
    console.log('[API] Fetching courses for program IDs:', programIds);

    const { data: courses, error: coursesError } = await supabaseAdmin.rpc(
      'get_program_courses',
      { program_ids: programIds }
    );

    if (coursesError) {
      console.error('[API] Database error fetching courses:', {
        message: coursesError.message,
        details: coursesError.details,
        hint: coursesError.hint,
        code: coursesError.code,
      });
      return NextResponse.json(
        { error: 'Database error', details: coursesError.message },
        { status: 500 }
      );
    }

    console.log('[API] Courses fetched:', courses);

    // Transform and combine the data
    const teachers: TransformedTeacher[] = (users as TeacherMetadata[]).map(
      (user) => {
        try {
          const teacherPrograms =
            programs
              ?.filter((program: Program) => program.teacher_id === user.id)
              .map((program: Program) => ({
                ...program,
                courses:
                  courses?.filter(
                    (course: Course) => course.program_id === program.id
                  ) || [],
              })) || [];

          return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            description: user.description,
            interests: user.interests ? JSON.parse(user.interests) : [],
            is_teacher: user.is_teacher === 'true',
            programs: teacherPrograms.map(
              ({ teacher_id, ...program }: ProgramWithCourses) => program
            ),
          };
        } catch (err) {
          console.error('[API] Error transforming teacher data:', {
            user,
            error: err instanceof Error ? err.message : 'Unknown error',
          });
          throw err;
        }
      }
    );

    console.log('[API] Final transformed teachers data:', teachers);
    return NextResponse.json(teachers);
  } catch (error) {
    console.error('[API] Unexpected error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
