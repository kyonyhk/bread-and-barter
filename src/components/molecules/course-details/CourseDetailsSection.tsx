import { useAuth } from '@repo/app/auth/AuthContext';
import { supabase } from '@repo/lib/supabase';
import { Course } from '@repo/types/course';
import {
  CourseDetailsSaveData,
  CourseSectionProps,
} from '@repo/types/courseSection';
import { useEffect, useState } from 'react';
import { css } from '../../../../styled-system/css';
import CourseAccordion from '../course-accordion/CourseAccordion';
import CourseDetails from './CourseDetails';

interface CourseDetailsSectionProps extends CourseSectionProps {
  course: Course;
  changesSavedTimeout: number;
  changesCancelledTimeout: number;
  teacherId?: string;
}

export default function CourseDetailsSection({
  course,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  isSaved,
  isCancelled,
  changesSavedTimeout,
  changesCancelledTimeout,
  teacherId,
}: CourseDetailsSectionProps) {
  const { user } = useAuth();
  const [hasChanges, setHasChanges] = useState(false);
  const [currentData, setCurrentData] = useState<CourseDetailsSaveData>({
    duration: course.duration,
    courseDetails: course.course_details,
  });

  // Check if user is authorized (teacher or admin)
  const isAuthorized =
    user && (user.id === teacherId || user.user_metadata?.is_admin === true);

  // Reset state when course changes or editing mode changes
  useEffect(() => {
    console.log('[CourseDetailsSection] Course or editing state changed:', {
      courseId: course.id,
      isEditing,
      currentData,
    });

    if (!isEditing) {
      setCurrentData({
        duration: course.duration,
        courseDetails: course.course_details,
      });
      setHasChanges(false);
    }
  }, [course, isEditing]);

  const handleStateChange = (data: CourseDetailsSaveData | null) => {
    console.log('[CourseDetailsSection] State changed:', {
      data,
      currentData,
      originalData: {
        duration: course.duration,
        courseDetails: course.course_details,
      },
    });

    if (data) {
      setCurrentData(data);
      const hasChanges =
        data.duration !== course.duration ||
        data.courseDetails !== course.course_details;
      console.log('[CourseDetailsSection] Changes detected:', { hasChanges });
      setHasChanges(hasChanges);
    }
  };

  const handleSave = async () => {
    try {
      console.log('[CourseDetailsSection] Saving course details:', currentData);
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
          duration: currentData.duration,
          course_details: currentData.courseDetails,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('[CourseDetailsSection] API request failed:', {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        });
        throw new Error(
          responseData.details || 'Failed to update course details'
        );
      }

      console.log('[CourseDetailsSection] API response:', responseData);

      setHasChanges(false);
      onSave();
    } catch (error) {
      console.error(
        '[CourseDetailsSection] Error updating course details:',
        error
      );
      throw error;
    }
  };

  const handleCancel = () => {
    setCurrentData({
      duration: course.duration,
      courseDetails: course.course_details,
    });
    setHasChanges(false);
    onCancel();
  };

  const renderContent = () => {
    const hasNoData = !course.duration && !course.course_details;

    if (hasNoData) {
      if (!isEditing && !isAuthorized) {
        return (
          <div
            className={css({
              w: '100%',
              h: '128px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px',
              borderWidth: '1px',
              borderStyle: 'dashed',
              borderColor: 'yellow20',
              borderRadius: '16px',
              bg: 'transparent',
              padding: '24px',
            })}
          >
            <div
              className={css({ textStyle: 'subheading5', color: 'yellow80' })}
            >
              No Course Details Available
            </div>
            <div
              className={css({
                textStyle: 'paragraph2',
                color: 'yellow50',
                textAlign: 'center',
              })}
            >
              The teacher hasn't added any details for this course yet
            </div>
          </div>
        );
      }
    }

    return (
      <CourseDetails
        duration={course.duration}
        courseDetails={course.course_details}
        isEditing={isEditing}
        onCancel={onCancel}
        onStateChange={handleStateChange}
        onEdit={isAuthorized ? onEdit : undefined}
      />
    );
  };

  return (
    <CourseAccordion
      title="Course Details"
      initialExpanded={true}
      isEditing={isEditing}
      onEdit={isAuthorized ? onEdit : undefined}
      onSave={handleSave}
      onCancel={handleCancel}
      isSaved={isSaved}
      isCancelled={isCancelled}
      hasChanges={hasChanges}
    >
      {renderContent()}
    </CourseAccordion>
  );
}
