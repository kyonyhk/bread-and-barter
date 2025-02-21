import CourseTimeslot from '@repo/components/molecules/course-timeslots/CourseTimeslot';
import { css } from '../../../styled-system/css';

export default function CalendarPage() {
  return (
    <div
      className={css({
        paddingTop: '120px',
        paddingBottom: '120px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      })}
    >
      <div
        className={css({
          w: '720px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          alignItems: 'center',
          padding: '24px',
          borderWidth: '1px',
          borderRadius: '40px',
          borderColor: 'yellow10',
        })}
      >
        <CourseTimeslot />
      </div>
    </div>
  );
}
