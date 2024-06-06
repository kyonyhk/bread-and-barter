'use client';

import VideoBlock from '@repo/components/molecules/video-block/VideoBlock';
import { css } from '../../../styled-system/css';
import PhotoBlock from '@repo/components/molecules/photo-block/PhotoBlock';
import { HStack } from '../../../styled-system/jsx';
import CourseProfileTile from '@repo/components/molecules/course-profile-tile/CourseProfileTile';
import ProfilePopup from '@repo/components/organisms/profile-popup/ProfilePopup';

export default function HomeComponents() {
  return (
    <div
      className={css({
        w: 'full',
        h: '100%',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        padding: '40px',
      })}
    >
      <div className={css({ textStyle: 'heading1', color: 'yellow100' })}>
        Home Components
      </div>
      <HStack className={css({ justifyContent: 'flex-start' })}>
        <VideoBlock courseName="Dry Laksa" teacherName="John Goh" />
        <PhotoBlock courseName="Dry Laksa" teacherName="John Goh" />
        <CourseProfileTile />
      </HStack>
      <ProfilePopup />
    </div>
  );
}
