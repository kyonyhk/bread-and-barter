import { useAuth } from '@repo/app/auth/AuthContext';
import { supabase } from '@repo/lib/supabase';
import { Course } from '@repo/types/course';
import { CourseSectionProps } from '@repo/types/courseSection';
import { useEffect, useState } from 'react';
import CourseAccordion from '../course-accordion/CourseAccordion';
import CredentialsExperience from './CredentialsExperience';

interface CourseCredentialsSectionProps extends CourseSectionProps {
  course: Course;
  teacherId?: string;
}

export default function CourseCredentialsSection({
  course,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  isSaved,
  isCancelled,
  teacherId,
}: CourseCredentialsSectionProps) {
  const { user } = useAuth();
  const [hasChanges, setHasChanges] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(
    course.credentials_experience || ''
  );

  // Check if user is authorized (teacher or admin)
  const isAuthorized =
    user && (user.id === teacherId || user.user_metadata?.is_admin === true);

  // Reset state when course changes or editing mode is cancelled
  useEffect(() => {
    if (!isEditing) {
      setCurrentExperience(course.credentials_experience || '');
      setHasChanges(false);
    }
  }, [course, isEditing]);

  const handleStateChange = (data: { experience: string } | null) => {
    if (data) {
      setCurrentExperience(data.experience);
      // For text inputs, we want to enable the save button as soon as the text differs
      setHasChanges(data.experience !== course.credentials_experience);
    }
  };

  const handleSave = async () => {
    try {
      console.log(
        '[CourseCredentialsSection] Saving credentials:',
        currentExperience
      );
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch(`/api/courses/${course.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          credentials_experience: currentExperience,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          '[CourseCredentialsSection] API error response:',
          errorData
        );
        throw new Error(
          errorData.details || errorData.error || 'Failed to update credentials'
        );
      }

      const responseData = await response.json();
      console.log('[CourseCredentialsSection] Save successful:', responseData);

      setHasChanges(false);
      onSave();
    } catch (error) {
      console.error(
        '[CourseCredentialsSection] Error saving credentials:',
        error
      );
      throw error;
    }
  };

  const handleCancel = () => {
    setCurrentExperience(course.credentials_experience || '');
    setHasChanges(false);
    onCancel();
  };

  return (
    <CourseAccordion
      title="Credentials & Experience"
      initialExpanded={false}
      isEditing={isEditing}
      onEdit={isAuthorized ? onEdit : undefined}
      onSave={handleSave}
      onCancel={handleCancel}
      isSaved={isSaved}
      isCancelled={isCancelled}
      hasChanges={hasChanges}
    >
      <CredentialsExperience
        experience={currentExperience}
        isEditing={isEditing}
        onEdit={isAuthorized ? onEdit : undefined}
        onStateChange={handleStateChange}
      />
    </CourseAccordion>
  );
}
