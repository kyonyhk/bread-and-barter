import TileButton from '@repo/components/atoms/buttons/TileButton';
import TextArea from '@repo/components/atoms/textarea/TextArea';
import { css } from '../../../../styled-system/css';

interface CredentialsExperienceProps {
  experience: string;
  isEditing: boolean;
  onStateChange?: (data: { experience: string } | null) => void;
  onEdit?: () => void;
  isAuthorized?: boolean;
}

const CredentialsExperience = ({
  experience,
  isEditing,
  onStateChange,
  onEdit,
  isAuthorized = false,
}: CredentialsExperienceProps) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newExperience = e.target.value;
    if (onStateChange) {
      onStateChange({ experience: newExperience });
    }
  };

  // Show "no data" container for unauthorized users when there's no experience
  if (!experience && !isEditing && !isAuthorized) {
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
        <div className={css({ textStyle: 'subheading5', color: 'yellow80' })}>
          No Credentials & Experience Available
        </div>
        <div
          className={css({
            textStyle: 'paragraph2',
            color: 'yellow50',
            textAlign: 'center',
          })}
        >
          The teacher hasn't added any credentials or experience yet
        </div>
      </div>
    );
  }

  // Show TileButton in empty state when not editing for authorized users
  if (!experience && !isEditing && isAuthorized) {
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
