import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

interface DBProgram {
  program_id: string;
  program_name: string;
  program_description: string;
  teacher_id: string;
  teacher_meta: {
    first_name: string;
    last_name: string;
    [key: string]: any;
  };
  courses: Array<{
    id: string;
    name: string;
    description: string;
    course_number: number;
    price: number;
    duration: string;
    course_details: string;
    max_students: number;
    is_group_session: boolean;
    location: string;
  }>;
}

// GET /api/programs
export async function GET() {
  try {
    console.log('[API] Fetching all programs');

    const { data, error } = await supabase.rpc('get_approved_programs');

    if (error) {
      console.error('[API] Database error:', error);
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      );
    }

    // Transform the data to match the expected format
    const programs = (data as DBProgram[]).map((program) => ({
      id: program.program_id,
      name: program.program_name,
      description: program.program_description,
      teacher: {
        id: program.teacher_id,
        raw_user_meta_data: program.teacher_meta,
      },
      courses: program.courses || [],
    }));

    console.log('[API] Programs found:', programs);
    return NextResponse.json(programs);
  } catch (error) {
    console.error('[API] Error fetching programs:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
