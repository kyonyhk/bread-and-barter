import TextArea from '@repo/components/atoms/textarea/TextArea';
import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import EditActions from '../edit-actions/EditActions';

interface CourseRequirementsProps {
  requirements: string;
  isEditing: boolean;
  onSave: (data: { requirements: string }) => void;
  onCancel: () => void;
}

const CourseRequirements = ({
  requirements,
  isEditing,
  onSave,
  onCancel,
}: CourseRequirementsProps) => {
  const [currentCourseRequirements, setCurrentCourseRequirements] =
    useState(requirements);

  return isEditing ? (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        w: '100%',
      })}
    >
      <TextArea
        value={currentCourseRequirements}
        onChange={(e) => setCurrentCourseRequirements(e.target.value)}
        className={css({ textStyle: 'paragraph1', color: 'altyellow' })}
      />
      <EditActions
        onSave={() => onSave({ requirements: currentCourseRequirements })}
        onCancel={onCancel}
      />
    </div>
  ) : (
    <div className={css({ color: 'yellow50' })}>{requirements}</div>
  );
};

export default CourseRequirements;
