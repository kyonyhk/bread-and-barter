import Dropdown from '@repo/components/atoms/dropdown/Dropdown';
import TextArea from '@repo/components/atoms/textarea/TextArea';
import { useState } from 'react';
import { css } from 'styled-system/css';
import EditActions from '../edit-actions/EditActions';

interface CourseDetailsProps {
  duration: string;
  courseDetails: string;
  isEditing: boolean;
  onSave: (data: { duration: string; courseDetails: string }) => void; // Callback to save changes
  onCancel: () => void; // Callback to cancel changes
}

const CourseDetails = ({
  duration,
  courseDetails,
  isEditing,
  onSave,
  onCancel,
}: CourseDetailsProps) => {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [currentCourseDetails, setCurrentCourseDetails] =
    useState(courseDetails);

  const durationOptions = [
    '1 hour',
    '1.5 hours',
    '2 hours',
    '2.5 hours',
    '3 hours',
  ];

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        w: '100%', // Added to make the component responsive
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
          Course
        </div>
        {isEditing ? (
          <Dropdown
            options={durationOptions}
            value={currentDuration}
            onChange={(e) => setCurrentDuration(e.target.value)}
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
          onChange={(e) => setCurrentCourseDetails(e.target.value)}
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
      {isEditing && (
        <EditActions
          onSave={() =>
            onSave({
              duration: currentDuration,
              courseDetails: currentCourseDetails,
            })
          }
          onCancel={onCancel}
        />
      )}
    </div>
  );
};

export default CourseDetails;
