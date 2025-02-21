import { useAuth } from '@repo/app/auth/AuthContext';
import { Course } from '@repo/types/course';
import { CourseSectionProps, DaySchedule } from '@repo/types/courseSection';
import { useEffect, useState } from 'react';
import { css } from '../../../../styled-system/css';
import CourseAccordion from '../course-accordion/CourseAccordion';
import CourseTimeslot from './CourseTimeslot';

interface CourseTimeslotsSectionProps extends CourseSectionProps {
  course: Course;
  onUpdateTimeslots?: (timeslots: Course['course_timeslots']) => void;
  teacherId?: string;
}

export default function CourseTimeslotsSection({
  course,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  isSaved,
  isCancelled,
  onUpdateTimeslots,
  teacherId,
}: CourseTimeslotsSectionProps) {
  const { user } = useAuth();
  const [currentTimeslots, setCurrentTimeslots] = useState(
    course.course_timeslots
  );
  const [hasChanges, setHasChanges] = useState(false);

  // Check if user is authorized (teacher or admin)
  const isAuthorized =
    user && (user.id === teacherId || user.user_metadata?.is_admin === true);

  // Debug log when component mounts or course changes
  useEffect(() => {
    console.log('[CourseTimeslotsSection] Component mounted:', {
      courseId: course.id,
      initialTimeslots: course.course_timeslots,
      hasUser: !!user,
      userId: user?.id,
      isAuthorized,
    });
  }, [course, user, isAuthorized]);

  // Reset timeslots when course changes or editing mode changes
  useEffect(() => {
    setCurrentTimeslots(course.course_timeslots);
    setHasChanges(false);
  }, [course.course_timeslots, isEditing]);

  const handleTimeslotsChange = (schedules: DaySchedule[]) => {
    console.log('[CourseTimeslotsSection] Timeslots changed:', {
      courseId: course.id,
      newTimeslots: schedules,
    });

    setCurrentTimeslots(schedules);
    setHasChanges(true);
    onUpdateTimeslots?.(schedules);
  };

  const handleSave = async () => {
    if (!user) {
      console.error('[CourseTimeslotsSection] No user found');
      throw new Error('Please log in to continue');
    }

    try {
      console.log('[CourseTimeslotsSection] Current user state:', {
        userId: user.id,
        email: user.email,
        metadata: user.user_metadata,
      });

      console.log('[CourseTimeslotsSection] Saving timeslots:', {
        courseId: course.id,
        timeslotsCount: currentTimeslots.length,
        userId: user.id,
      });

      const response = await fetch('/api/course-timeslots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          course_id: course.id,
          timeslots: currentTimeslots,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage =
            errorJson.details || errorJson.error || 'Failed to save timeslots';
          console.error('[CourseTimeslotsSection] Error details:', errorJson);
        } catch {
          errorMessage = errorText;
        }
        throw new Error(errorMessage);
      }

      console.log('[CourseTimeslotsSection] Successfully saved timeslots');
      setHasChanges(false);
      onSave();
    } catch (error) {
      console.error('[CourseTimeslotsSection] Error saving timeslots:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    setCurrentTimeslots(course.course_timeslots);
    setHasChanges(false);
    onCancel();
  };

  return (
    <CourseAccordion
      title="Course Timeslots"
      initialExpanded={true}
      isEditing={isEditing}
      onEdit={isAuthorized ? onEdit : undefined}
      onSave={handleSave}
      onCancel={handleCancel}
      isSaved={isSaved}
      isCancelled={isCancelled}
      hasChanges={hasChanges}
    >
      <div
        className={css({
          w: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        })}
      >
        <CourseTimeslot
          initialTimeslots={currentTimeslots}
          onTimeslotsChange={handleTimeslotsChange}
          isEditing={isEditing}
          onEdit={isAuthorized ? onEdit : undefined}
          courseDuration={course.duration}
        />
      </div>
    </CourseAccordion>
  );
}
