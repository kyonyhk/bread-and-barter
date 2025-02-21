-- Grant necessary permissions to authenticated users for the teaching schema
GRANT USAGE ON SCHEMA teaching TO authenticated;
GRANT USAGE ON SCHEMA teaching TO authenticator;

-- Grant permissions on the courses table
GRANT INSERT, SELECT ON teaching.courses TO authenticated;

-- Grant permissions on the course_objectives table
GRANT INSERT, SELECT ON teaching.course_objectives TO authenticated;

-- Grant permissions on the course_materials table
GRANT INSERT, SELECT ON teaching.course_materials TO authenticated;

-- Grant permissions on the course_timeslots table
GRANT INSERT, SELECT ON teaching.course_timeslots TO authenticated;

-- Create sequences if they don't exist and grant permissions
DO $$ 
BEGIN
  -- Create sequence for courses if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'teaching' AND sequencename = 'courses_id_seq') THEN
    CREATE SEQUENCE teaching.courses_id_seq;
  END IF;
  
  -- Create sequence for course_objectives if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'teaching' AND sequencename = 'course_objectives_id_seq') THEN
    CREATE SEQUENCE teaching.course_objectives_id_seq;
  END IF;
  
  -- Create sequence for course_materials if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'teaching' AND sequencename = 'course_materials_id_seq') THEN
    CREATE SEQUENCE teaching.course_materials_id_seq;
  END IF;
  
  -- Create sequence for course_timeslots if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'teaching' AND sequencename = 'course_timeslots_id_seq') THEN
    CREATE SEQUENCE teaching.course_timeslots_id_seq;
  END IF;
END $$;

-- Grant usage on all sequences in the teaching schema
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA teaching TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA teaching TO authenticator; 