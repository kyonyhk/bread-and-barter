import TimeslotButton from '@repo/components/atoms/calendar/TimeslotButton';
import { css } from '../../../../styled-system/css';

interface DayScheduleProps {
  dayDate: string;
  hasLesson: boolean;
}

export default function DaySchedule({
  dayDate,
  hasLesson = true,
}: DayScheduleProps) {
  return (
    <div
      className={css({ display: 'flex', flexDirection: 'column', gap: '8px' })}
    >
      <div className={css({ textStyle: 'subheading6', color: 'yellow100' })}>
        {dayDate}
      </div>
      {hasLesson ? (
        <div
          className={css({ display: 'flex', flexDirection: 'row', gap: '8px' })}
        >
          <TimeslotButton startTime="5pm" endTime="7pm" />
          <TimeslotButton startTime="5pm" endTime="7pm" />
          <TimeslotButton startTime="5pm" endTime="7pm" />
        </div>
      ) : (
        <div
          className={css({
            textStyle: 'paragraph1',
            color: 'yellow50',
            textAlign: 'center',
            borderRadius: '20px',
            borderWidth: '1px',
            borderColor: 'yellow20',
            bg: 'yellow5',
            padding: '16px 8px',
          })}
        >
          This is no lesson available on this day.
        </div>
      )}
    </div>
  );
}
