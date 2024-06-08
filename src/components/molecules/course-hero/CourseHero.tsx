import { Avatar } from '@repo/components/atoms/avatar';
import { Play } from '@repo/components/atoms/icons';
import { HStack, VStack } from 'styled-system/jsx';
import { css } from '../../../../styled-system/css';

interface CourseHeroProps {
  teacherName: string;
  courseName: string;
  bgVideo: string;
  teacherProfilePic: string;
}

export default function CourseHero({
  teacherName,
  courseName,
  bgVideo,
  teacherProfilePic,
}: CourseHeroProps) {
  return (
    <div
      className={css({
        w: '100%',
        h: '540px',
        borderRadius: '40px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundImage: `url(${bgVideo})`,
        bgPosition: 'center',
        bgSize: 'cover',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 0,
      })}
    >
      {/* Container Border */}
      <div
        className={css({
          w: '100%',
          h: '100%',
          borderWidth: '1px',
          borderColor: 'yellow20',
          borderRadius: '40px',
          transform: 'translate(-20px, 20px)',
          position: 'absolute',
          zIndex: 2,
        })}
      ></div>

      {/* Top Shade */}
      <div
        className={css({
          w: '100%',
          h: '100%',
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.40) 5.48%, rgba(0, 0, 0, 0.00) 19.12%)',
          position: 'absolute',
          zIndex: 1,
          transform: 'translate(-20px, 20px)',
        })}
      ></div>

      {/* Bottom Shade */}
      <div
        className={css({
          w: '100%',
          h: '100%',
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 58.61%, rgba(0, 0, 0, 0.60) 86.59%)',
          position: 'absolute',
          zIndex: 1,
          transform: 'translate(-20px, 20px)',
        })}
      ></div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 2,
        })}
      >
        {/* Container for Profile Photo + Description */}
        <VStack
          className={css({
            gap: '4px',
            position: 'relative',
            zIndex: 2,
            alignItems: 'flex-start',
          })}
        >
          {/* Profile Avatar + Course Name + Teacher Name */}
          <HStack>
            <Avatar
              name={teacherName}
              src={teacherProfilePic}
              className={css({ textStyle: 'subheading3' })}
            />
            <VStack
              className={css({
                gap: '0px',
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
                className={css({ textStyle: 'subheading5', color: 'yellow80' })}
              >
                {teacherName}
              </div>
            </VStack>
          </HStack>
        </VStack>
        <Play
          className={css({
            fill: 'yellow100',
            w: '40px',
            h: '40px',
            cursor: 'pointer',
            _hover: { strokeWidth: '2px' },
          })}
        />
      </div>
    </div>
  );
}
