import { supabase } from './supabase';

export async function getTeacher(id: string) {
  const { data, error } = await supabase
    .from('teachers')
    .select(
      `
      *,
      programs (
        *,
        courses (
          *,
          course_objectives (*),
          course_materials (*),
          course_timeslots (*)
        )
      )
    `
    )
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Add more helper functions as needed
