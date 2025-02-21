-- First, migrate existing data from courses.course_materials to course_materials table
INSERT INTO teaching.course_materials (course_id, name, file_url)
SELECT 
    id as course_id,
    material->>'name' as name,
    COALESCE(
        material->>'file_url',
        material->>'path'
    ) as file_url
FROM teaching.courses,
     unnest(course_materials) as material
WHERE course_materials IS NOT NULL;

-- Then remove the course_materials column from courses
ALTER TABLE teaching.courses DROP COLUMN IF EXISTS course_materials; 