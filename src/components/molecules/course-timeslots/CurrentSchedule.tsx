'use client';

import TimeslotButton from '@repo/components/atoms/calendar/TimeslotButton';
import { LeftArrow, RightArrow } from '@repo/components/atoms/icons';
import { DaySchedule } from '@repo/types/courseSection';
import { useEffect, useState } from 'react';
import { css } from '../../../../styled-system/css';

interface CurrentScheduleProps {
  schedules: DaySchedule[];
  onDeleteSlot?: (day: string, slotIndex: number) => void;
  isEditing?: boolean;
}

interface WeekRange {
  start: Date;
  end: Date;
}

export default function CurrentSchedule({
  schedules,
  onDeleteSlot,
  isEditing = false,
}: CurrentScheduleProps) {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [weekRanges, setWeekRanges] = useState<WeekRange[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<DaySchedule[]>([]);

  // Initialize week ranges on mount
  useEffect(() => {
    const today = new Date();
    // Get the start of the current week (Sunday)
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay());
    currentWeekStart.setHours(0, 0, 0, 0);

    // Calculate 5 weeks (current week + 4 weeks)
    const ranges: WeekRange[] = [];
    for (let i = 0; i < 5; i++) {
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(currentWeekStart.getDate() + i * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      ranges.push({ start: weekStart, end: weekEnd });
    }
    setWeekRanges(ranges);
  }, []);

  // Filter schedules based on selected week
  useEffect(() => {
    if (weekRanges.length === 0) return;

    const currentRange = weekRanges[currentWeekIndex];
    const filtered = schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.day);
      return (
        scheduleDate >= currentRange.start && scheduleDate <= currentRange.end
      );
    });

    // Sort filtered schedules by date
    const sorted = [...filtered].sort((a, b) => {
      return new Date(a.day).getTime() - new Date(b.day).getTime();
    });

    setFilteredSchedules(sorted);
  }, [schedules, currentWeekIndex, weekRanges]);

  const formatDate = (day: string) => {
    const date = new Date(day);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatWeekRange = (range: WeekRange) => {
    const startStr = range.start.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const endStr = range.end.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    return `${startStr} - ${endStr}`;
  };

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < weekRanges.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  if (schedules.length === 0) {
    return (
      <div
        className={css({
          textStyle: 'paragraph1',
          color: 'yellow50',
          textAlign: 'center',
          padding: '24px',
        })}
      >
        No timeslots scheduled yet
      </div>
    );
  }

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
        })}
      >
        <LeftArrow
          className={css({
            fill: currentWeekIndex > 0 ? 'yellow50' : 'yellow20',
            w: '24px',
            h: '24px',
            cursor: currentWeekIndex > 0 ? 'pointer' : 'not-allowed',
            _hover: currentWeekIndex > 0 ? { fill: 'yellow100' } : undefined,
          })}
          onClick={handlePreviousWeek}
        />
        <div className={css({ textStyle: 'subheading5', color: 'yellow100' })}>
          {weekRanges[currentWeekIndex]
            ? formatWeekRange(weekRanges[currentWeekIndex])
            : ''}
        </div>
        <RightArrow
          className={css({
            fill:
              currentWeekIndex < weekRanges.length - 1
                ? 'yellow50'
                : 'yellow20',
            w: '24px',
            h: '24px',
            cursor:
              currentWeekIndex < weekRanges.length - 1
                ? 'pointer'
                : 'not-allowed',
            _hover:
              currentWeekIndex < weekRanges.length - 1
                ? { fill: 'yellow100' }
                : undefined,
          })}
          onClick={handleNextWeek}
        />
      </div>
      {filteredSchedules.length === 0 && schedules.length > 0 && (
        <div
          className={css({
            textStyle: 'paragraph1',

            color: 'yellow50',
            bg: 'yellow5',
            borderColor: 'yellow20',
            borderWidth: '1px',
            borderRadius: '20px',
            p: '16px',
            textAlign: 'center',
          })}
        >
          There are no lessons for this week.
        </div>
      )}
      {filteredSchedules.map((schedule) => (
        <div
          key={schedule.day}
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          })}
        >
          <div
            className={css({
              textStyle: 'subheading5',
              color: 'yellow100',
            })}
          >
            {formatDate(schedule.day)}
          </div>
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            })}
          >
            {schedule.slots.map((slot, index) => (
              <TimeslotButton
                key={`${slot.startTime}-${slot.endTime}`}
                startTime={slot.startTime}
                endTime={slot.endTime}
                isEditing={isEditing}
                onDelete={
                  onDeleteSlot
                    ? () => onDeleteSlot(schedule.day, index)
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
