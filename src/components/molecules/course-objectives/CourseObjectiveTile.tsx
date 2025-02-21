import { Delete } from '@repo/components/atoms/icons';
import { css } from '../../../../styled-system/css';

interface CourseObjectiveTileProps {
  objectiveNumber: number;
  objectiveText: string;
  isEditing?: boolean;
  onDelete?: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function CourseObjectiveTile({
  objectiveNumber,
  objectiveText,
  isEditing = false,
  onDelete,
  isSelected = false,
  onSelect,
}: CourseObjectiveTileProps) {
  const formattedObjectiveNumber = objectiveNumber.toString().padStart(2, '0');

  return (
    <div
      className={css({
        w: '100%',
        h: '240px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: '8px',
        padding: '24px 16px',
        borderWidth: '1px',
        borderColor: isSelected ? 'yellow100' : 'yellow20',
        borderRadius: '16px',
        bg: isSelected ? 'yellow10' : 'yellow5',
        position: 'relative',
        cursor: isEditing ? 'pointer' : 'default',
        _hover: isEditing
          ? {
              borderColor: 'yellow50',
              bg: 'yellow10',
            }
          : {},
      })}
      onClick={isEditing && onSelect ? onSelect : undefined}
    >
      {isEditing && onDelete && (
        <div
          className={css({
            position: 'absolute',
            top: '8px',
            right: '8px',
            cursor: 'pointer',
            transform: 'scale(1)',
            transition: 'transform 0.2s',
            _hover: { transform: 'scale(1.1)' },
          })}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Delete
            className={css({
              stroke: 'red100',
              w: '20px',
              h: '20px',
            })}
          />
        </div>
      )}
      <div className={css({ textStyle: 'subheading5', color: 'yellow80' })}>
        {objectiveText}
      </div>
      <div
        className={css({
          bottom: '8px',
          right: '8px',
          position: 'absolute',
          textStyle: 'heading4',
          color: 'yellow10',
          WebkitTextStrokeWidth: '1px',
        })}
      >
        {formattedObjectiveNumber}
      </div>
    </div>
  );
}
