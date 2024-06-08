import { css } from 'styled-system/css';

interface CourseDetailsProps {
  duration: string;
  courseDetails: string;
}

const CourseDetails = ({ duration, courseDetails }: CourseDetailsProps) => {
  return (
    <div
      className={css({ display: 'flex', flexDirection: 'column', gap: '24px' })}
    >
      <div className={css({ display: 'flex', flexDirection: 'column' })}>
        <div className={css({ textStyle: 'subheading5', color: 'yellow100' })}>
          Course
        </div>
        <div className={css({ textStyle: 'paragraph1', color: 'yellow80' })}>
          {duration}
        </div>
      </div>
      <div className={css({ textStyle: 'paragraph1', color: 'yellow50' })}>
        {courseDetails}
      </div>
    </div>
  );
};

export default CourseDetails;
