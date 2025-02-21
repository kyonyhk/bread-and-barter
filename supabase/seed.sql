-- Note: Users are managed by Supabase Auth, so we don't seed them directly

-- Note: Using a default admin user ID (you'll need to create this user through Supabase Auth)
DO $$
DECLARE
  admin_id uuid := '00000000-0000-0000-0000-000000000000';
BEGIN

-- Seed Programs
INSERT INTO teaching.programs (id, teacher_id, name, description, status)
VALUES
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', admin_id, 'Culinary Arts Mastery', 'Complete culinary arts training program', 'approved'),
  ('550e8400-e29b-41d4-a716-446655440000', admin_id, 'Asian Cuisine Specialist', 'Specialized program focusing on Asian cooking techniques', 'approved');

-- Seed Courses for Culinary Arts Mastery
INSERT INTO teaching.courses (id, program_id, course_number, name, description, price, duration, course_details, max_students, location)
VALUES
  ('c4ca4238-a0b9-3382-8dcc-509a6f75849b', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 1, 'Introduction to Culinary I', 'First course in culinary series', 200.00, '2 hours', 'This comprehensive culinary course is designed for beginners...', 10, 'Kitchen Studio A'),
  ('c81e728d-9d4c-3f63-af06-7f89cc14862c', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 2, 'Introduction to Culinary II', 'Second course in culinary series', 200.00, '2 hours', 'Building upon the fundamentals learned in Culinary I...', 10, 'Kitchen Studio A');

-- Seed Courses for Asian Cuisine Specialist
INSERT INTO teaching.courses (id, program_id, course_number, name, description, price, duration, course_details, max_students, location)
VALUES
  ('eccbc87e-4b5c-4bfe-b1f1-2878a3f7cb82', '550e8400-e29b-41d4-a716-446655440000', 1, 'Chinese Cuisine Fundamentals', 'Master the fundamentals of Chinese cooking', 250.00, '3 hours', 'Master the fundamentals of Chinese cooking...', 8, 'Kitchen Studio B'),
  ('a87ff679-a2f3-471b-a142-57f7b06e6e47', '550e8400-e29b-41d4-a716-446655440000', 2, 'Japanese Cuisine Essentials', 'Explore the art of Japanese cooking', 250.00, '3 hours', 'Explore the art of Japanese cooking...', 8, 'Kitchen Studio B');

-- Seed Course Objectives
INSERT INTO teaching.course_objectives (course_id, objective_number, objective_text)
VALUES
  ('c4ca4238-a0b9-3382-8dcc-509a6f75849b', 1, 'Develop a strong foundation in culinary basics'),
  ('c4ca4238-a0b9-3382-8dcc-509a6f75849b', 2, 'Learn knife skills and kitchen safety'),
  ('c4ca4238-a0b9-3382-8dcc-509a6f75849b', 3, 'Master basic cooking techniques'),
  ('c81e728d-9d4c-3f63-af06-7f89cc14862c', 1, 'Master advanced cooking techniques'),
  ('c81e728d-9d4c-3f63-af06-7f89cc14862c', 2, 'Learn international cuisine preparation'),
  ('c81e728d-9d4c-3f63-af06-7f89cc14862c', 3, 'Understand flavor profiles'),
  ('eccbc87e-4b5c-4bfe-b1f1-2878a3f7cb82', 1, 'Master wok cooking techniques'),
  ('eccbc87e-4b5c-4bfe-b1f1-2878a3f7cb82', 2, 'Learn Chinese sauce preparation'),
  ('eccbc87e-4b5c-4bfe-b1f1-2878a3f7cb82', 3, 'Understand regional variations'),
  ('a87ff679-a2f3-471b-a142-57f7b06e6e47', 1, 'Learn sushi preparation'),
  ('a87ff679-a2f3-471b-a142-57f7b06e6e47', 2, 'Master dashi and stock making'),
  ('a87ff679-a2f3-471b-a142-57f7b06e6e47', 3, 'Understand Japanese knife skills');

-- Seed Course Materials
INSERT INTO teaching.course_materials (course_id, name, file_url)
VALUES
  ('c4ca4238-a0b9-3382-8dcc-509a6f75849b', 'Course Syllabus', '/syllabus.pdf'),
  ('c4ca4238-a0b9-3382-8dcc-509a6f75849b', 'Recipe Book', '/recipes.pdf'),
  ('c4ca4238-a0b9-3382-8dcc-509a6f75849b', 'Safety Guidelines', '/safety.pdf'),
  ('c81e728d-9d4c-3f63-af06-7f89cc14862c', 'Advanced Techniques', '/advanced.pdf'),
  ('c81e728d-9d4c-3f63-af06-7f89cc14862c', 'International Recipes', '/recipes-intl.pdf'),
  ('eccbc87e-4b5c-4bfe-b1f1-2878a3f7cb82', 'Chinese Cooking Guide', '/chinese-guide.pdf'),
  ('eccbc87e-4b5c-4bfe-b1f1-2878a3f7cb82', 'Wok Techniques', '/wok-techniques.pdf'),
  ('a87ff679-a2f3-471b-a142-57f7b06e6e47', 'Sushi Guide', '/sushi-guide.pdf'),
  ('a87ff679-a2f3-471b-a142-57f7b06e6e47', 'Japanese Techniques', '/jp-techniques.pdf');

-- Seed Course Timeslots
INSERT INTO teaching.course_timeslots (course_id, day, slots)
VALUES
  ('c4ca4238-a0b9-3382-8dcc-509a6f75849b', 'Wednesday', '[{"startTime": "2pm", "endTime": "4pm"}, {"startTime": "5pm", "endTime": "7pm"}, {"startTime": "8pm", "endTime": "10pm"}]'::jsonb),
  ('c4ca4238-a0b9-3382-8dcc-509a6f75849b', 'Saturday', '[{"startTime": "2pm", "endTime": "4pm"}, {"startTime": "5pm", "endTime": "7pm"}, {"startTime": "8pm", "endTime": "10pm"}]'::jsonb),
  ('c81e728d-9d4c-3f63-af06-7f89cc14862c', 'Thursday', '[{"startTime": "2pm", "endTime": "4pm"}, {"startTime": "5pm", "endTime": "7pm"}]'::jsonb),
  ('eccbc87e-4b5c-4bfe-b1f1-2878a3f7cb82', 'Monday', '[{"startTime": "2pm", "endTime": "5pm"}, {"startTime": "6pm", "endTime": "9pm"}]'::jsonb),
  ('a87ff679-a2f3-471b-a142-57f7b06e6e47', 'Tuesday', '[{"startTime": "2pm", "endTime": "5pm"}, {"startTime": "6pm", "endTime": "9pm"}]'::jsonb);

-- Insert test programs for the admin user
INSERT INTO teaching.programs (teacher_id, name, description, status)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'Introduction to Cooking', 'Learn the basics of cooking and kitchen safety', 'approved'),
  ('00000000-0000-0000-0000-000000000000', 'Advanced Baking', 'Master the art of baking breads and pastries', 'approved'),
  ('00000000-0000-0000-0000-000000000000', 'World Cuisines', 'Explore dishes from different cultures around the world', 'approved');

END $$; 