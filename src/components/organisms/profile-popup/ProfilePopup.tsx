'use client';

import { Avatar } from '@repo/components/atoms/avatar';
import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import { RightArrow } from '@repo/components/atoms/icons';
import CourseProfileTile from '@repo/components/molecules/course-profile-tile/CourseProfileTile';
import { useState } from 'react';
import { css } from '../../../../styled-system/css';

interface ProfilePopupProps {
  name: string;
}

export default function ProfilePopup(name: ProfilePopupProps) {
  const username = 'Jerome Seah';

  const [isOpened, setIsOpened] = useState(false);

  return (
    <div
      className={css({
        display: isOpened ? 'flex' : 'none',
        flexDirection: 'column',
        gap: '24px',
        borderWidth: '1px',
        borderColor: 'yellow20',
        borderRadius: '30px',
        padding: '24px',
        bg: 'yellow5',
        backdropBlur: '4px',
        w: '400px',
        position: 'sticky',
        top: '4px',
        right: '4px',
      })}
    >
      {/* Avatar + Name */}
      <div
        className={css({ display: 'flex', flexDirection: 'row', gap: '8px' })}
      >
        <Avatar
          name={username}
          src="/images/profile-pic.png"
          className={css({ textStyle: 'subheading3' })}
        />
        <div className={css({ textStyle: 'subheading3', color: 'yellow100' })}>
          {username}
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

      <div className={css({ w: '100%', h: '1px', bg: 'yellow20' })}></div>

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

        <div className={css({ w: '100%', h: '1px', bg: 'yellow20' })}></div>

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
