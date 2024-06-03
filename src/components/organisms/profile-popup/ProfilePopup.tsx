import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import { css } from '../../../../styled-system/css';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { RightArrow } from '@repo/components/atoms/icons';
import { Separator } from '@repo/components/atoms/separator';
import CourseProfileTile from '@repo/components/molecules/course-profile-tile/CourseProfileTile';

export default function ProfilePopup() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        borderWidth: '1px',
        borderColor: 'yellow20',
        borderRadius: '30px',
        padding: '24px',
        bg: 'yellow5',
        backdropBlur: '4px',
        w: '400px',
      })}
    >
      {/* Avatar + Name */}
      <div
        className={css({ display: 'flex', flexDirection: 'row', gap: '8px' })}
      >
        <Avatar
          className={css({ w: '80px', h: '80px', borderColor: 'yellow50' })}
        >
          <AvatarImage
            src="https://github.com/nanopx.png"
            alt="@nanopx"
            className={css({ w: '80px', h: '80px' })}
          />
          <AvatarFallback>NP</AvatarFallback>
        </Avatar>
        <div className={css({ textStyle: 'subheading3', color: 'yellow100' })}>
          Jerome Seah
        </div>
      </div>

      {/* Actions */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <ButtonLarge>
          Messages
          <RightArrow
            className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
          />
        </ButtonLarge>
        <ButtonLarge>
          Account
          <RightArrow
            className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
          />
        </ButtonLarge>
        <ButtonLarge>
          Settings
          <RightArrow
            className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
          />
        </ButtonLarge>
      </div>

      <Separator className={css({ bg: 'yellow20' })} />

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        })}
      >
        {/* Section Heading */}
        <div className={css({ textStyle: 'subheading3', color: 'yellow100' })}>
          Upcoming Course
        </div>

        {/* Course TIles */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            overflowX: 'none',
          })}
        >
          <CourseProfileTile />
          <CourseProfileTile />
        </div>

        <ButtonLarge>
          Saved Course
          <RightArrow
            className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
          />
        </ButtonLarge>

        <Separator className={css({ bg: 'yellow20' })} />

        <ButtonLarge>
          Log Out
          <RightArrow
            className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
          />
        </ButtonLarge>
      </div>
    </div>
  );
}
