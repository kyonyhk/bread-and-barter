import TextArea from '@repo/components/atoms/textarea/TextArea';
import { useState } from 'react';
import { css } from 'styled-system/css';
import EditActions from '../edit-actions/EditActions';

interface CredentialsExperienceProps {
  experience: string;
  isEditing: boolean;
  onSave: (data: { experience: string }) => void;
  onCancel: () => void;
}

const CredentialsExperience = ({
  experience,
  isEditing,
  onSave,
  onCancel,
}: CredentialsExperienceProps) => {
  const [currentExperience, setCurrentExperience] = useState(experience);

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
        value={currentExperience}
        onChange={(e) => setCurrentExperience(e.target.value)}
        className={css({ textStyle: 'paragraph1', color: 'altyellow' })}
      />
      <EditActions
        onSave={() => onSave({ experience: currentExperience })}
        onCancel={onCancel}
      />
    </div>
  ) : (
    <div className={css({ color: 'yellow50' })}>{experience}</div>
  );
};

export default CredentialsExperience;
