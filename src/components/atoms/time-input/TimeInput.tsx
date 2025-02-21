import { DownArrow } from '@repo/components/atoms/icons';
import { useState } from 'react';
import { css } from '../../../../styled-system/css';

interface TimeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  minTime?: string; // Format: "HH:mm"
  maxTime?: string; // Format: "HH:mm"
}

export default function TimeInput({
  label,
  value,
  onChange,
  minTime = '07:00',
  maxTime = '22:00',
}: TimeInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Generate time options in 30-minute intervals
  const generateTimeOptions = () => {
    const options: string[] = [];
    const [minHour, minMinute] = minTime.split(':').map(Number);
    const [maxHour, maxMinute] = maxTime.split(':').map(Number);

    for (let hour = minHour; hour <= maxHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Skip times before minTime or after maxTime
        if (
          (hour === minHour && minute < minMinute) ||
          (hour === maxHour && minute > maxMinute)
        )
          continue;

        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        position: 'relative',
        w: '100%',
      })}
    >
      <label
        className={css({
          textStyle: 'paragraph1',
          color: 'yellow100',
          textAlign: 'center',
        })}
      >
        {label}
      </label>
      <button
        className={css({
          textStyle: 'paragraph1',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          borderWidth: '1px',
          borderColor: 'yellow20',
          borderRadius: '16px',
          bg: 'yellow5',
          color: value ? 'yellow100' : 'yellow50',
          cursor: 'pointer',
          _hover: {
            borderColor: 'yellow50',
          },
          transition: 'all 0.2s ease-in-out',
        })}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {value || 'Select time'}
        <DownArrow
          className={css({
            fill: 'yellow100',
            w: '16px',
            h: '16px',
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease-in-out',
          })}
        />
      </button>

      {isOpen && (
        <div
          className={css({
            textStyle: 'paragraph1',
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxH: '200px',
            overflowY: 'auto',
            bg: 'black50',
            borderWidth: '1px',
            borderColor: 'yellow20',
            borderRadius: '16px',
            mt: '4px',
            zIndex: 10,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'auto',
            backdropBlur: '4px',
          })}
        >
          {timeOptions.map((time) => (
            <button
              key={time}
              className={css({
                w: '100%',
                textAlign: 'left',
                padding: '8px 16px',
                color: time === value ? 'yellow100' : 'yellow50',
                bg: time === value ? 'yellow10' : 'transparent',
                cursor: 'pointer',
                _hover: {
                  bg: 'yellow10',
                  color: 'yellow100',
                },
              })}
              onClick={() => {
                onChange(time);
                setIsOpen(false);
              }}
              type="button"
            >
              {time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
