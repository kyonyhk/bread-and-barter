'use client';

import type { CalendarCellState } from '@repo/components/atoms/calendar/CalendarCell';
import CalendarCell from '@repo/components/atoms/calendar/CalendarCell';
import { LeftArrow, RightArrow } from '@repo/components/atoms/icons';
import { useState } from 'react';
import { css } from '../../../../styled-system/css';

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
}

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
}

interface ScheduleSelectorProps {
  selectedDate: Date | null;
  onAddSchedule: (slot: TimeSlot) => void;
}

interface CurrentScheduleProps {
  schedules: DaySchedule[];
  onDeleteSlot: (date: Date, slotIndex: number) => void;
  isEditing: boolean;
}

export default function Calendar({
  selectedDate,
  onDateSelect,
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time part for accurate comparisons
  const [currentDate, setCurrentDate] = useState(today);

  // Calculate the maximum allowed date (4 weeks from today)
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 28);
  maxDate.setHours(23, 59, 59, 999); // Set to end of day

  // Get first day of current month and number of days
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysInMonth = lastDayOfMonth.getDate();
  const firstDayWeekday = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Navigation handlers
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days: { date: number | null; state: CalendarCellState }[] = [];

    // Calculate if we need 6 weeks instead of 5
    const needsSixWeeks = firstDayWeekday + daysInMonth > 35;
    const totalCells = needsSixWeeks ? 42 : 35;

    // Previous month's days
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push({ date: null, state: 'empty' });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
        0,
        0,
        0,
        0
      );

      const isPast = currentDay.getTime() <= today.getTime();
      const isFuture = currentDay.getTime() > maxDate.getTime();
      const isSelected =
        selectedDate &&
        currentDay.getFullYear() === selectedDate.getFullYear() &&
        currentDay.getMonth() === selectedDate.getMonth() &&
        currentDay.getDate() === selectedDate.getDate();

      days.push({
        date: day,
        state: isSelected
          ? 'selected'
          : isPast
            ? 'past'
            : isFuture
              ? 'not_available'
              : 'available',
      });
    }

    // Next month's days
    while (days.length < totalCells) {
      days.push({ date: null, state: 'empty' });
    }

    return { days, needsSixWeeks };
  };

  const { days: calendarDays, needsSixWeeks } = generateCalendarDays();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
      0,
      0,
      0,
      0
    );

    if (
      clickedDate.getTime() > today.getTime() &&
      clickedDate.getTime() <= maxDate.getTime()
    ) {
      // If clicking the already selected date, deselect it
      if (
        selectedDate &&
        clickedDate.getFullYear() === selectedDate.getFullYear() &&
        clickedDate.getMonth() === selectedDate.getMonth() &&
        clickedDate.getDate() === selectedDate.getDate()
      ) {
        onDateSelect(null);
      } else {
        onDateSelect(clickedDate);
      }
    }
  };

  // Check if we can navigate
  const canGoBack = () => {
    // Get the last day of the previous month
    const lastDayOfPrevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
      23,
      59,
      59,
      999
    );
    // Can go back if the last day of previous month is after today
    return lastDayOfPrevMonth.getTime() >= today.getTime();
  };

  const canGoForward = () => {
    // Get the first day of the next month
    const firstDayOfNextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    // Can go forward if the first day of next month is before or equal to maxDate
    return firstDayOfNextMonth.getTime() <= maxDate.getTime();
  };

  return (
    <div
      className={css({
        w: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        padding: '24px',
        borderColor: 'yellow20',
        borderWidth: '1px',
        borderRadius: '20px',
        bg: 'yellow5',
      })}
    >
      {/* Heading */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <div className={css({ textStyle: 'subheading4', color: 'yellow50' })}>
          Select your dates
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px',
          })}
        >
          <div
            className={css({
              opacity: canGoBack() ? 0.5 : 0.2,
              _hover: canGoBack() ? { opacity: 1.0, cursor: 'pointer' } : {},
              cursor: canGoBack() ? 'pointer' : 'not-allowed',
            })}
            onClick={canGoBack() ? goToPreviousMonth : undefined}
          >
            <LeftArrow
              className={css({ stroke: 'yellow100', w: '24px', h: '24px' })}
            />
          </div>
          <div
            className={css({ textStyle: 'subheading5', color: 'yellow100' })}
          >
            {monthName} {year}
          </div>
          <div
            className={css({
              opacity: canGoForward() ? 0.5 : 0.2,
              _hover: canGoForward() ? { opacity: 1.0, cursor: 'pointer' } : {},
              cursor: canGoForward() ? 'pointer' : 'not-allowed',
            })}
            onClick={canGoForward() ? goToNextMonth : undefined}
          >
            <RightArrow
              className={css({ stroke: 'yellow100', w: '24px', h: '24px' })}
            />
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        {/* Days */}
        <div
          className={css({
            w: '100%',
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            textStyle: 'paragraph16',
            color: 'yellow50',
          })}
        >
          <div className={css({ w: '100%', textAlign: 'center' })}>SUN</div>
          <div className={css({ w: '100%', textAlign: 'center' })}>MON</div>
          <div className={css({ w: '100%', textAlign: 'center' })}>TUE</div>
          <div className={css({ w: '100%', textAlign: 'center' })}>WED</div>
          <div className={css({ w: '100%', textAlign: 'center' })}>THU</div>
          <div className={css({ w: '100%', textAlign: 'center' })}>FRI</div>
          <div className={css({ w: '100%', textAlign: 'center' })}>SAT</div>
        </div>

        {/* Dates */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          })}
        >
          {/* Generate weeks */}
          {Array.from({ length: needsSixWeeks ? 6 : 5 }, (_, weekIndex) => (
            <div
              key={weekIndex}
              className={css({
                display: 'flex',
                flexDirection: 'row',
                gap: '8px',
              })}
            >
              {calendarDays
                .slice(weekIndex * 7, (weekIndex + 1) * 7)
                .map((day, dayIndex) => (
                  <CalendarCell
                    key={dayIndex}
                    date={day.date}
                    state={day.state}
                    onClick={
                      day.date ? () => handleDateClick(day.date!) : undefined
                    }
                    className={css({ w: '100%', h: '80px' })}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
