import { useAuth } from '@repo/app/auth/AuthContext';
import { supabase } from '@repo/lib/supabase';
import { Course } from '@repo/types/course';
import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import AddCourse from '../add-course/AddCourse';
import CourseAccordion from '../course-accordion/CourseAccordion';
import CourseSelectionTile from '../course-selection-tile/CourseSelectionTile';

interface CourseSelectionSectionProps {
  courses: Course[];
  selectedCourseIndex: number;
  onSelectCourse: (index: number) => void;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  isSaved: boolean;
  isCancelled: boolean;
  programId: string;
  onCoursesChange: () => void;
  teacherId?: string;
}

export default function CourseSelectionSection({
  courses,
  selectedCourseIndex,
  onSelectCourse,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  isSaved,
  isCancelled,
  programId,
  onCoursesChange,
  teacherId,
}: CourseSelectionSectionProps) {
  const { user } = useAuth();
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  // Check if user is authorized (teacher or admin)
  const isAuthorized =
    user && (user.id === teacherId || user.user_metadata?.is_admin === true);

  return (
    <CourseAccordion
      title="Course Selection"
      initialExpanded={true}
      isEditing={isEditing}
      onEdit={isAuthorized ? onEdit : undefined}
      onSave={onSave}
      onCancel={onCancel}
      isSaved={isSaved}
      isCancelled={isCancelled}
      noBorder={true}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          w: '100%',
        })}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
          })}
        >
          {courses.map((courseItem, index) => (
            <CourseSelectionTile
              key={courseItem.id}
              courseNumber={courseItem.course_number}
              courseName={courseItem.name}
              price={courseItem.price}
              isSelected={index === selectedCourseIndex}
              onSelect={() => onSelectCourse(index)}
              isEditing={isEditing}
              onDelete={
                isAuthorized
                  ? async () => {
                      try {
                        const { error } = await supabase
                          .from('courses')
                          .delete()
                          .eq('id', courseItem.id);

                        if (error) throw error;

                        // Notify parent about the change
                        onCoursesChange();
                      } catch (error) {
                        console.error(
                          '[CourseSelectionSection] Error deleting course:',
                          error
                        );
                        // You might want to handle this error more gracefully in the UI
                      }
                    }
                  : undefined
              }
            />
          ))}
        </div>
        {isAuthorized && (
          <AddCourse
            isAddingCourse={isAddingCourse}
            onAddClick={() => setIsAddingCourse(true)}
            onAdd={async (courseName, price) => {
              try {
                console.log('[CourseSelectionSection] Creating new course');

                const {
                  data: { session },
                } = await supabase.auth.getSession();
                console.log(
                  '[CourseSelectionSection] Current session:',
                  session
                );

                const response = await fetch('/api/courses', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.access_token}`,
                  },
                  credentials: 'include',
                  body: JSON.stringify({
                    program_id: programId,
                    name: courseName,
                    price: price,
                    course_number: courses.length + 1,
                    duration: '',
                    course_details: '',
                    max_students: 1,
                    is_group_session: false,
                    location: 'To be determined',
                    credentials_experience: '',
                    requirements: '',
                    description: '',
                  }),
                });

                if (!response.ok) {
                  const error = await response.json();
                  throw new Error(error.details || 'Failed to create course');
                }

                // Reset state and notify parent
                setIsAddingCourse(false);
                onCoursesChange();
              } catch (error) {
                console.error(
                  '[CourseSelectionSection] Error adding course:',
                  error
                );
                // You might want to handle this error more gracefully in the UI
              }
            }}
            onCancel={() => {
              setIsAddingCourse(false);
            }}
          />
        )}
      </div>
    </CourseAccordion>
  );
}
