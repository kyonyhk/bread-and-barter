import { useState } from 'react';
import { css } from 'styled-system/css';

interface CourseDetailsProps {
  duration: string;
  courseDetails: string;
  isEditing: boolean;
  onSave: (duration: string, courseDetails: string) => void;
}

const CourseDetails = ({
  duration,
  courseDetails,
  isEditing,
  onSave,
}: CourseDetailsProps) => {
  const [editDuration, setEditDuration] = useState(duration);
  const [editCourseDetails, setEditCourseDetails] = useState(courseDetails);

  const handleSave = () => {
    onSave(editDuration, editCourseDetails);
  };

  return (
    <div
      className={css({ display: 'flex', flexDirection: 'column', gap: '24px' })}
    >
      {isEditing ? (
        <>
          <div className={css({ display: 'flex', flexDirection: 'column' })}>
            <input
              type="text"
              value={editDuration}
              onChange={(e) => setEditDuration(e.target.value)}
              className={css({ textStyle: 'paragraph1', color: 'yellow80' })}
            />
          </div>
          <textarea
            value={editCourseDetails}
            onChange={(e) => setEditCourseDetails(e.target.value)}
            className={css({ textStyle: 'paragraph1', color: 'yellow50' })}
          />
          <button
            onClick={handleSave}
            className={css({ textStyle: 'paragraph1', color: 'yellow100' })}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <div className={css({ display: 'flex', flexDirection: 'column' })}>
            <div
              className={css({ textStyle: 'subheading5', color: 'yellow100' })}
            >
              Course
            </div>
            <div
              className={css({ textStyle: 'paragraph1', color: 'yellow80' })}
            >
              {duration}
            </div>
          </div>
          <div className={css({ textStyle: 'paragraph1', color: 'yellow50' })}>
            {courseDetails}
          </div>
        </>
      )}
    </div>
  );
};

export default CourseDetails;
