'use client';

import TileButton from '@repo/components/atoms/buttons/TileButton';
import { Divider } from '@repo/components/atoms/divider';
import { DaySchedule, TimeSlot } from '@repo/types/courseSection';
import { useEffect, useState } from 'react';
import { css } from '../../../../styled-system/css';
import Calendar from './Calendar';
import CurrentSchedule from './CurrentSchedule';
import SelectSchedule from './SelectSchedule';

interface CourseTimeslotProps {
  initialTimeslots?: DaySchedule[];
  onTimeslotsChange?: (timeslots: DaySchedule[]) => void;
  isEditing?: boolean;
  userRole?: 'teacher' | 'admin' | 'user' | 'guest';
  onEdit?: () => void;
  courseDuration?: string;
}

export default function CourseTimeslot({
  initialTimeslots = [],
  onTimeslotsChange,
  isEditing = false,
  userRole = 'guest',
  onEdit,
  courseDuration,
}: CourseTimeslotProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [schedules, setSchedules] = useState<DaySchedule[]>(initialTimeslots);

  // Notify parent of changes only when schedules change during editing
  useEffect(() => {
    if (isEditing && onTimeslotsChange) {
      onTimeslotsChange(schedules);
    }
  }, [isEditing, onTimeslotsChange, schedules]);

  // Update schedules when initialTimeslots change and we're not editing
  useEffect(() => {
    if (!isEditing) {
      setSchedules(initialTimeslots);
    }
  }, [isEditing, initialTimeslots]);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleAddSchedule = (slot: TimeSlot) => {
    if (selectedDate) {
      const day = selectedDate.toISOString().split('T')[0];
      const newSchedules = [...schedules];
      const existingDayIndex = newSchedules.findIndex(
        (schedule) => schedule.day === day
      );

      if (existingDayIndex >= 0) {
        // Add slot to existing day
        newSchedules[existingDayIndex] = {
          ...newSchedules[existingDayIndex],
          slots: [...newSchedules[existingDayIndex].slots, slot],
        };
      } else {
        // Create new day schedule
        newSchedules.push({
          day,
          slots: [slot],
        });
      }

      setSchedules(newSchedules);
    }
  };

  const handleDeleteSlot = (day: string, slotIndex: number) => {
    const newSchedules = [...schedules];
    const dayIndex = newSchedules.findIndex((schedule) => schedule.day === day);

    if (dayIndex >= 0) {
      const updatedSlots = [...newSchedules[dayIndex].slots];
      updatedSlots.splice(slotIndex, 1);

      if (updatedSlots.length === 0) {
        // Remove the day entirely if no slots left
        newSchedules.splice(dayIndex, 1);
      } else {
        newSchedules[dayIndex] = {
          ...newSchedules[dayIndex],
          slots: updatedSlots,
        };
      }

      setSchedules(newSchedules);
    }
  };

  const isAdmin = userRole === 'admin';
  const isTeacherOrAdmin = userRole === 'teacher' || userRole === 'admin';
  const showTileButton =
    !isEditing && isTeacherOrAdmin && schedules.length === 0;
  const showEditComponents = isEditing && isTeacherOrAdmin;

  // Only log render state in development and when props change
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[CourseTimeslot] Render state:', {
        userRole,
        isEditing,
        isAdmin,
        isTeacherOrAdmin,
        showTileButton,
        showEditComponents,
        schedulesLength: schedules.length,
        initialTimeslotsLength: initialTimeslots.length,
        componentTree: showTileButton
          ? 'Showing TileButton'
          : 'Showing Calendar/Schedule view',
      });
    }
  }, [
    userRole,
    isEditing,
    isAdmin,
    isTeacherOrAdmin,
    showTileButton,
    showEditComponents,
    schedules.length,
    initialTimeslots.length,
  ]);

  return (
    <div
      className={css({ display: 'flex', flexDirection: 'column', gap: '24px' })}
    >
      {showTileButton ? (
        <TileButton
          title="Add Course Timeslots"
          subtitle="Set available days and times for your course"
          onClick={onEdit}
          className={css({
            borderRadius: '16px',
          })}
        />
      ) : (
        <>
          {showEditComponents && (
            <>
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
              <SelectSchedule
                selectedDate={selectedDate}
                onAddSchedule={handleAddSchedule}
                courseDuration={courseDuration}
              />
              <Divider />
            </>
          )}
          <CurrentSchedule
            schedules={schedules}
            onDeleteSlot={showEditComponents ? handleDeleteSlot : undefined}
            isEditing={showEditComponents}
          />
        </>
      )}
    </div>
  );
}
