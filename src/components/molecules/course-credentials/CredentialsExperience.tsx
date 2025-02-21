import TileButton from '@repo/components/atoms/buttons/TileButton';
import TextArea from '@repo/components/atoms/textarea/TextArea';
import { css } from '../../../../styled-system/css';

interface CredentialsExperienceProps {
  experience: string;
  isEditing: boolean;
  onStateChange?: (data: { experience: string } | null) => void;
  onEdit?: () => void;
}

const CredentialsExperience = ({
  experience,
  isEditing,
  onStateChange,
  onEdit,
}: CredentialsExperienceProps) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newExperience = e.target.value;
    if (onStateChange) {
      onStateChange({ experience: newExperience });
    }
  };

  // Show TileButton in empty state when not editing
  if (!experience && !isEditing) {
    return (
      <TileButton
        title="Add Credentials & Experience"
        subtitle="Share your qualifications and expertise with your students"
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
      {isEditing ? (
        <TextArea
          value={experience}
          onChange={handleTextChange}
          className={css({ textStyle: 'paragraph1', color: 'yellow50' })}
          placeholder="Enter your credentials and experience..."
        />
      ) : (
        <div className={css({ color: 'yellow50', textStyle: 'paragraph1' })}>
          {experience}
        </div>
      )}
    </div>
  );
};

export default CredentialsExperience;
