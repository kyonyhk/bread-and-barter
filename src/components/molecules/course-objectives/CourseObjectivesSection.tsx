import { useAuth } from '@repo/app/auth/AuthContext';
import { Course } from '@repo/types/course';
import { CourseSectionProps } from '@repo/types/courseSection';
import { useEffect, useState } from 'react';
import CourseAccordion from '../course-accordion/CourseAccordion';
import CourseObjectives from './CourseObjectives';

interface CourseObjectivesSectionProps extends CourseSectionProps {
  course: Course;
  teacherId?: string;
}

export default function CourseObjectivesSection({
  course,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  isSaved,
  isCancelled,
  teacherId,
}: CourseObjectivesSectionProps) {
  const { user } = useAuth();
  const [hasChanges, setHasChanges] = useState(false);
  const [currentObjectives, setCurrentObjectives] = useState<string[]>(
    course.course_objectives.map((obj) => obj.objective_text)
  );

  // Check if user is authorized (teacher or admin)
  const isAuthorized =
    user && (user.id === teacherId || user.user_metadata?.is_admin === true);

  // Reset objectives when course changes or editing mode is cancelled
  useEffect(() => {
    if (!isEditing) {
      setCurrentObjectives(
        course.course_objectives.map((obj) => obj.objective_text)
      );
      setHasChanges(false);
    }
  }, [course, isEditing]);

  const handleObjectivesChange = (objectives: string[] | null) => {
    if (!objectives) return;

    const originalObjectives = course.course_objectives.map(
      (obj) => obj.objective_text
    );

    // Check if there are actual changes
    const hasChanged =
      objectives.length !== originalObjectives.length ||
      objectives.some((text, index) => text !== originalObjectives[index]);

    setCurrentObjectives(objectives);
    setHasChanges(hasChanged);
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    try {
      if (!user) {
        throw new Error('Please sign in to save changes.');
      }

      const objectivesToSave = currentObjectives.map((text, index) => ({
        objective_number: index + 1,
        objective_text: text,
      }));

      console.log('Saving objectives:', {
        courseId: course.id,
        objectives: objectivesToSave,
      });

      const saveResponse = await fetch(`/api/courses/${course.id}/objectives`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          objectives: objectivesToSave,
        }),
      });

      const responseData = await saveResponse.json();

      if (!saveResponse.ok) {
        console.error('Error response:', responseData);
        throw new Error(
          responseData.details ||
            responseData.error ||
            'Failed to save objectives'
        );
      }

      console.log('Save successful:', responseData);

      setHasChanges(false);
      onSave();
    } catch (error) {
      console.error('Error saving objectives:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    setCurrentObjectives(
      course.course_objectives.map((obj) => obj.objective_text)
    );
    setHasChanges(false);
    onCancel();
  };

  return (
    <CourseAccordion
      title="Course Objectives"
      initialExpanded={true}
      isEditing={isEditing}
      onEdit={isAuthorized ? onEdit : undefined}
      onSave={handleSave}
      onCancel={handleCancel}
      isSaved={isSaved}
      isCancelled={isCancelled}
      hasChanges={hasChanges}
    >
      <CourseObjectives
        initialObjectives={currentObjectives}
        isEditing={isEditing}
        onObjectivesChange={handleObjectivesChange}
        onEdit={isAuthorized ? onEdit : undefined}
      />
    </CourseAccordion>
  );
}
