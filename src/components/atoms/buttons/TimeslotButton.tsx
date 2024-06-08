import { useState } from 'react';
import { css, cx } from 'styled-system/css';

interface TimeslotButtonProps {
  startTime: string;
  endTime: string;
}

const TimeslotButton = ({ startTime, endTime }: TimeslotButtonProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelectTimeslot = () => {
    setIsSelected(!isSelected);
    console.log('clicked');
    console.log(isSelected);
  };

  return (
    <div
      className={cx(
        css({
          w: '100%',
          maxW: '320px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px 24px',
          borderWidth: '1px',
          borderColor: 'yellow10',
          borderRadius: '40px',
          bg: isSelected ? 'yellow100' : 'yellow5',
          color: isSelected ? 'black' : 'yellow100',
          cursor: 'pointer',
        }),
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
      {startTime} - {endTime}
    </div>
  );
};

export default TimeslotButton;
