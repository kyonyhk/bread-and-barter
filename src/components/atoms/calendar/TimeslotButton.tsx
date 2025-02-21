import { Delete } from '@repo/components/atoms/icons';
import { useState } from 'react';
import { css, cx } from '../../../../styled-system/css';

interface TimeslotButtonProps {
  startTime: string;
  endTime: string;
  onDelete?: () => void;
  isEditing?: boolean;
  isDisabled?: boolean;
  className?: string;
}

const TimeslotButton = ({
  startTime,
  endTime,
  onDelete,
  isEditing = false,
  isDisabled = false,
  className,
}: TimeslotButtonProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelectTimeslot = () => {
    if (!isEditing && !isDisabled) {
      setIsSelected(!isSelected);
    }
  };

  return (
    <div
      className={cx(
        css({
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '16px',
          w: '100%',
          opacity: isDisabled ? 0.5 : 1,
        }),
        className
      )}
    >
      <div
        className={cx(
          css({
            w: '100%',
            textStyle: 'paragraph1',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            padding: '16px 24px',
            borderWidth: '1px',
            borderColor: 'yellow10',
            borderRadius: '40px',
            bg: isSelected ? 'yellow100' : 'yellow5',
            color: isSelected ? 'black' : 'yellow80',
            cursor: isEditing || isDisabled ? 'default' : 'pointer',
            transition: 'all 0.2s ease-in-out',
          }),
          !isEditing &&
            !isDisabled &&
            !isSelected &&
            css({
              _hover: {
                borderColor: 'yellow50',
                bg: 'yellow10',
              },
            })
        )}
        onClick={toggleSelectTimeslot}
      >
        <div>
          {startTime} - {endTime}
        </div>
        {isEditing && onDelete && !isDisabled && (
          <Delete
            className={css({
              fill: 'red100',
              w: '20px',
              h: '20px',
              cursor: 'pointer',
              opacity: 0.5,
              _hover: {
                opacity: 1,
              },
            })}
            onClick={onDelete}
          />
        )}
      </div>
    </div>
  );
};

export default TimeslotButton;
