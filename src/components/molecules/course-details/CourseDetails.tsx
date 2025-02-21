import TileButton from '@repo/components/atoms/buttons/TileButton';
import Dropdown from '@repo/components/atoms/dropdown/Dropdown';
import TextArea from '@repo/components/atoms/textarea/TextArea';
import {
  CourseDetailsSaveData,
  OnStateChangeHandler,
} from '@repo/types/courseSection';
import { useEffect, useState } from 'react';
import { css } from '../../../../styled-system/css';

interface CourseDetailsProps {
  duration: string;
  courseDetails: string;
  isEditing: boolean;
  onStateChange?: OnStateChangeHandler<CourseDetailsSaveData>;
  onCancel: () => void;
  onEdit?: () => void;
}

const CourseDetails = ({
  duration,
  courseDetails,
  isEditing,
  onStateChange,
  onCancel,
  onEdit,
}: CourseDetailsProps) => {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [currentCourseDetails, setCurrentCourseDetails] =
    useState(courseDetails);

  // Reset state when isEditing changes to false or when initial values change
  useEffect(() => {
    console.log('[CourseDetails] Props or editing state changed:', {
      duration,
      courseDetails,
      isEditing,
      currentDuration,
      currentCourseDetails,
    });

    if (!isEditing) {
      setCurrentDuration(duration);
      setCurrentCourseDetails(courseDetails);
    }
  }, [duration, courseDetails, isEditing]);

  const durationOptions = [
    '',
    '1 hour',
    '1.5 hours',
    '2 hours',
    '2.5 hours',
    '3 hours',
  ];

  // Notify parent of state changes only when values actually change
  useEffect(() => {
    if (isEditing && onStateChange) {
      const hasChanges =
        currentDuration !== duration || currentCourseDetails !== courseDetails;

      console.log('[CourseDetails] Checking for changes:', {
        currentDuration,
        duration,
        currentCourseDetails,
        courseDetails,
        hasChanges,
      });

      // Only notify if there are actual changes
      if (hasChanges) {
        onStateChange({
          duration: currentDuration,
          courseDetails: currentCourseDetails,
        });
      }
    }
  }, [
    currentDuration,
    currentCourseDetails,
    duration,
    courseDetails,
    isEditing,
    onStateChange,
  ]);

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDuration = e.target.value;
    console.log('[CourseDetails] Duration changed:', {
      oldDuration: currentDuration,
      newDuration,
    });
    setCurrentDuration(newDuration);
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDetails = e.target.value;
    console.log('[CourseDetails] Details changed:', {
      oldDetails: currentCourseDetails,
      newDetails,
    });
    setCurrentCourseDetails(newDetails);
  };

  // Show TileButton in empty state when not editing
  if (!duration && !courseDetails && !isEditing) {
    return (
      <TileButton
        title="Add Course Details"
        subtitle="Set the duration and provide details about your course"
        className={css({
          borderRadius: '16px',
        })}
        onClick={onEdit}
      />
    );
  }

  return (
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
          display: 'flex',
          flexDirection: 'column',
          gap: isEditing ? '8px' : '0px',
        })}
      >
        <div className={css({ textStyle: 'subheading5', color: 'yellow100' })}>
          Duration
        </div>
        {isEditing ? (
          <Dropdown
            options={durationOptions}
            value={currentDuration}
            onChange={handleDurationChange}
            className={css({ textStyle: 'paragraph1', color: 'altyellow' })}
          />
        ) : (
          <div className={css({ textStyle: 'paragraph1', color: 'yellow80' })}>
            {duration}
          </div>
        )}
      </div>
      {isEditing ? (
        <TextArea
          value={currentCourseDetails}
          onChange={handleDetailsChange}
          className={css({
            textStyle: 'paragraph1',
            color: 'altyellow',
          })}
        />
      ) : (
        <div className={css({ textStyle: 'paragraph1', color: 'yellow50' })}>
          {courseDetails}
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
