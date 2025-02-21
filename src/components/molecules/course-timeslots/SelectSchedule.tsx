import ButtonMedium from '@repo/components/atoms/buttons/ButtonMedium';
import { Plus } from '@repo/components/atoms/icons';
import TimeInput from '@repo/components/atoms/time-input/TimeInput';
import { useState } from 'react';
import { css } from '../../../../styled-system/css';

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface SelectScheduleProps {
  selectedDate: Date | null;
  onAddSchedule: (slot: TimeSlot) => void;
  courseDuration?: string;
}

export default function SelectSchedule({
  selectedDate,
  onAddSchedule,
  courseDuration = '1h',
}: SelectScheduleProps) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Parse duration string to minutes
  const getDurationInMinutes = (duration: string) => {
    if (!duration) return 60; // Default to 1 hour if no duration provided

    // Handle different duration formats
    const durationStr = duration.toLowerCase();
    let totalMinutes = 0;

    // Extract hours
    const hoursMatch = durationStr.match(/(\d+)\s*h/);
    if (hoursMatch) {
      totalMinutes += parseInt(hoursMatch[1]) * 60;
    }

    // Extract minutes
    const minutesMatch = durationStr.match(/(\d+)\s*m/);
    if (minutesMatch) {
      totalMinutes += parseInt(minutesMatch[1]);
    }

    // If no valid duration found, default to 1 hour
    return totalMinutes || 60;
  };

  // Convert time string to minutes since midnight
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Convert minutes since midnight to time string
  const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };

  const handleStartTimeChange = (value: string) => {
    setStartTime(value);
    if (value) {
      // Calculate end time based on duration
      const startMinutes = timeToMinutes(value);
      const durationMinutes = getDurationInMinutes(courseDuration);
      const endMinutes = startMinutes + durationMinutes;

      console.log('Debug time calculation (start):', {
        courseDuration,
        startTime: value,
        startMinutes,
        durationMinutes,
        endMinutes,
        calculatedEndTime: minutesToTime(endMinutes),
      });

      setEndTime(minutesToTime(endMinutes));
    } else {
      setEndTime('');
    }
  };

  const handleEndTimeChange = (value: string) => {
    setEndTime(value);
    if (value) {
      // Calculate start time based on duration
      const endMinutes = timeToMinutes(value);
      const durationMinutes = getDurationInMinutes(courseDuration);
      const startMinutes = endMinutes - durationMinutes;

      console.log('Debug time calculation (end):', {
        courseDuration,
        endTime: value,
        endMinutes,
        durationMinutes,
        startMinutes,
        calculatedStartTime: minutesToTime(startMinutes),
      });

      setStartTime(minutesToTime(startMinutes));
    } else {
      setStartTime('');
    }
  };

  const handleAddSchedule = () => {
    if (startTime && endTime) {
      onAddSchedule({ startTime, endTime });
      setStartTime('');
      setEndTime('');
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('default', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    });
  };

  if (!selectedDate) return null;

  return (
    <div
      className={css({
        w: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        gap: '40px',
        borderWidth: '1px',
        borderRadius: '20px',
        borderColor: 'yellow20',
      })}
    >
      <div className={css({ textStyle: 'subheading4', color: 'yellow50' })}>
        Select Schedule
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <div className={css({ textStyle: 'subheading5', color: 'yellow100' })}>
          {formatDate(selectedDate)}
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '16px',
            bg: 'yellow5',
            borderColor: 'yellow20',
            borderWidth: '1px',
            borderRadius: '20px',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'row',
              gap: '8px',
              w: '100%',
            })}
          >
            <TimeInput
              label="Start Time"
              value={startTime}
              onChange={handleStartTimeChange}
            />
            <TimeInput
              label="End Time"
              value={endTime}
              onChange={handleEndTimeChange}
            />
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            })}
          >
            <ButtonMedium onClick={handleAddSchedule}>
              Add Schedule
              <Plus
                className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
              />
            </ButtonMedium>
          </div>
        </div>
      </div>
    </div>
  );
}
