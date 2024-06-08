import { Avatar } from '@repo/components/atoms/avatar';
import Link from 'next/link';
import { ReactNode } from 'react';
import { css } from '../../../../styled-system/css';
import { HStack, VStack } from '../../../../styled-system/jsx';

interface VideoBlockProps {
  children?: ReactNode;
  courseName: string;
  teacherName: string;
}

export default function VideoBlock({
  courseName,
  teacherName,
  children,
}: VideoBlockProps) {
  return (
    <Link href="/course-page">
      <div
        className={css({
          w: '100%',
          h: '100%',
          minH: '620px',
          borderRadius: '40px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          bgImage: 'url(/images/dry-laksa.png)',
          bgPosition: 'center',
          bgSize: 'cover',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 0,
          cursor: 'pointer',
        })}
      >
        {/* <Image
        src="/images/yo-yo.png"
        width={320}
        height={620}
        alt="Yoyo"
        className={css({
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          overflow: 'hidden',
        })}
      /> */}

        {/* Container Border */}
        <div
          className={css({
            w: '100%',
            h: '100%',
            minH: '620px',
            borderWidth: '1px',
            borderColor: 'yellow20',
            borderRadius: '40px',
            transform: 'translate(-20px, 20px)',
            position: 'absolute',
            zIndex: 2,
            _hover: {
              // borderColor: 'yellow50',
              // borderWidth: '1px',
              bg: 'yellow5',
            },
          })}
        ></div>

        {/* Top Shade */}
        <div
          className={css({
            w: '100%',
            h: '100%',
            minH: '620px',
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.40) 5.48%, rgba(0, 0, 0, 0.00) 19.12%)',
            position: 'absolute',
            zIndex: 1,
            transform: 'translate(-20px, 0px)',
          })}
        ></div>

        {/* Bottom Shade */}
        <div
          className={css({
            w: '100%',
            h: '100%',
            minH: '620px',
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 58.61%, rgba(0, 0, 0, 0.60) 86.59%)',
            position: 'absolute',
            zIndex: 1,
            transform: 'translate(-20px, 20px)',
          })}
        ></div>

        {/* Container for Profile Photo + Description */}
        <VStack
          className={css({
            gap: '8px',
            position: 'relative',
            zIndex: 2,
            alignItems: 'flex-start',
          })}
        >
          {/* Profile Avatar + Course Name + Teacher Name */}
          <HStack>
            <Avatar
              name={teacherName}
              src="/images/profile-pic.png"
              className={css({ textStyle: 'subheading3' })}
            />
            <VStack
              className={css({
                gap: '2px',
                alignItems: 'flex-start',
              })}
            >
              <div
                className={css({
                  textStyle: 'subheading3',
                  color: 'yellow100',
                })}
              >
                {courseName}
              </div>
              <div
                className={css({
                  textStyle: 'subheading5',
                  color: 'yellow80',
                })}
              >
                {teacherName}
              </div>
            </VStack>
          </HStack>
          {/* Course Description */}
          {/* <div className={css({ textStyle: 'paragraph2', color: 'yellow80' })}>
          Lorem ipsum dolor sit amet consectetur. Id massa donec sit turpis
          hendrerit etiam. At amet feugiat elit massa eleifend.
        </div> */}
        </VStack>
      </div>
    </Link>
  );
}
