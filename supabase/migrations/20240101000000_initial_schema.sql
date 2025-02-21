-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create schemas
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS teaching;
CREATE SCHEMA IF NOT EXISTS bookings;
CREATE SCHEMA IF NOT EXISTS payments;
CREATE SCHEMA IF NOT EXISTS reviews;

-- Auth Schema
CREATE TABLE IF NOT EXISTS auth.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  raw_user_meta_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teaching Schema
CREATE TABLE teaching.programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected')) DEFAULT 'draft',
  review_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE teaching.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID REFERENCES teaching.programs(id),
  course_number INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration TEXT NOT NULL,
  course_details TEXT NOT NULL,
  max_students INTEGER NOT NULL,
  is_group_session BOOLEAN DEFAULT FALSE,
  location TEXT NOT NULL,
  credentials_experience TEXT,
  requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE teaching.course_objectives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES teaching.courses(id),
  objective_number INTEGER NOT NULL,
  objective_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE teaching.course_materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES teaching.courses(id),
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE teaching.course_timeslots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES teaching.courses(id),
  day TEXT NOT NULL,
  slots JSONB NOT NULL, -- Array of {startTime: string, endTime: string}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings Schema
CREATE TABLE bookings.course_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES teaching.courses(id),
  student_id UUID REFERENCES auth.users(id),
  timeslot_id UUID REFERENCES teaching.course_timeslots(id),
  status TEXT CHECK (status IN ('booked', 'completed', 'cancelled')) DEFAULT 'booked',
  is_attended BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments Schema
CREATE TABLE payments.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings.course_bookings(id),
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL, -- 5% of amount
  teacher_payout DECIMAL(10,2) NOT NULL, -- 95% of amount
  stripe_payment_id TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'refunded', 'failed')),
  refund_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews Schema
CREATE TABLE reviews.course_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings.course_bookings(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for programs
ALTER TABLE teaching.programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON teaching.programs
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON teaching.programs
    FOR INSERT WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Enable update for program owners" ON teaching.programs
    FOR UPDATE USING (auth.uid() = teacher_id);

CREATE POLICY "Enable delete for program owners" ON teaching.programs
    FOR DELETE USING (auth.uid() = teacher_id);

-- Add RLS policies for courses
ALTER TABLE teaching.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON teaching.courses
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for program owners" ON teaching.courses
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM teaching.programs p
            WHERE p.id = program_id
            AND p.teacher_id = auth.uid()
        )
    );

CREATE POLICY "Enable update for program owners" ON teaching.courses
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM teaching.programs p
            WHERE p.id = program_id
            AND p.teacher_id = auth.uid()
        )
    );

CREATE POLICY "Enable delete for program owners" ON teaching.courses
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM teaching.programs p
            WHERE p.id = program_id
            AND p.teacher_id = auth.uid()
        )
    );

-- Grant permissions to roles
GRANT USAGE ON SCHEMA teaching, auth TO anon, authenticated, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA teaching TO anon, authenticated, service_role;
GRANT SELECT ON auth.users TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA teaching TO service_role;

-- Grant permissions for sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA teaching TO anon, authenticated, service_role;

-- Ensure future tables get the same grants
ALTER DEFAULT PRIVILEGES IN SCHEMA teaching
GRANT SELECT ON TABLES TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA teaching
GRANT ALL ON TABLES TO service_role;

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON auth.users(email);
CREATE INDEX idx_programs_teacher ON teaching.programs(teacher_id);
CREATE INDEX idx_courses_program ON teaching.courses(program_id);
CREATE INDEX idx_objectives_course ON teaching.course_objectives(course_id);
CREATE INDEX idx_materials_course ON teaching.course_materials(course_id);
CREATE INDEX idx_timeslots_course ON teaching.course_timeslots(course_id);
CREATE INDEX idx_bookings_course ON bookings.course_bookings(course_id);
CREATE INDEX idx_bookings_student ON bookings.course_bookings(student_id);
CREATE INDEX idx_transactions_booking ON payments.transactions(booking_id);
CREATE INDEX idx_reviews_booking ON reviews.course_reviews(booking_id);

-- Add cascade delete where appropriate
ALTER TABLE teaching.courses
ADD CONSTRAINT fk_program
FOREIGN KEY (program_id)
REFERENCES teaching.programs(id)
ON DELETE CASCADE;

ALTER TABLE teaching.course_objectives
ADD CONSTRAINT fk_course_objectives
FOREIGN KEY (course_id)
REFERENCES teaching.courses(id)
ON DELETE CASCADE;

ALTER TABLE teaching.course_materials
ADD CONSTRAINT fk_course_materials
FOREIGN KEY (course_id)
REFERENCES teaching.courses(id)
ON DELETE CASCADE;

ALTER TABLE teaching.course_timeslots
ADD CONSTRAINT fk_course_timeslots
FOREIGN KEY (course_id)
REFERENCES teaching.courses(id)
ON DELETE CASCADE;

-- Create a function to get courses with their programs
CREATE OR REPLACE FUNCTION teaching.get_courses()
RETURNS TABLE (
  id UUID,
  course_number INTEGER,
  name TEXT,
  description TEXT,
  program_id UUID,
  program_name TEXT,
  program_description TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.course_number,
    c.name,
    c.description,
    c.program_id,
    p.name as program_name,
    p.description as program_description
  FROM teaching.courses c
  LEFT JOIN teaching.programs p ON c.program_id = p.id
  ORDER BY c.course_number ASC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION teaching.get_courses TO anon, authenticated, service_role; 