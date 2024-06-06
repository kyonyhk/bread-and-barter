import { Avatar } from '@repo/components/atoms/avatar';
import { css } from '../../../../styled-system/css';

interface CourseHeroProps {
  username: string;
}

export default function CourseHero({ username }: CourseHeroProps) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: '24px',
        h: '540px',
        w: '360px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'stretch',
          gap: '8px',
        })}
      >
        <Avatar
          name={username}
          src="/images/profile-pic.png"
          className={css({ textStyle: 'subheading3' })}
        />
        <div></div>
      </div>
    </div>
  );
}
