import { Avatar } from '@repo/components/atoms/avatar';
import { Star } from '@repo/components/atoms/icons';
import { css } from 'styled-system/css';

interface TeacherProfileProps {
  name: string;
  genre: string;
  lessonsTaught: number;
  reviewsCount: number;
}

export default function TeacherProfile({
  name,
  genre,
  lessonsTaught,
  reviewsCount,
}: TeacherProfileProps) {
  return (
    <div
      className={css({
        w: '100%',
        h: 'auto',
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        borderWidth: '1px',
        borderColor: 'yellow20',
        borderRadius: '40px',
        padding: '16px 40px',
        bg: 'yellow5',
      })}
    >
      {/* Avatar */}
      <div className={css({ minW: '160px' })}>
        <Avatar
          name={name}
          src="/images/profile-pic.png"
          className={css({
            textStyle: 'subheading3',
          })}
        />
      </div>

      {/* Teacher Info */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '0px',
              justifyContent: 'flex-start',
            })}
          >
            <div
              className={css({ textStyle: 'subheading3', color: 'yellow100' })}
            >
              {name}
            </div>
            <div
              className={css({ textStyle: 'paragraph2', color: 'yellow80' })}
            >
              {genre}
            </div>
            <div
              className={css({ textStyle: 'paragraph3', color: 'yellow50' })}
            >
              Taught {lessonsTaught} lessons in the past month
            </div>
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              gap: '0px',
            })}
          >
            <div
              className={css({
                display: 'flex',
                flexDirection: 'row',
                gap: '0px',
              })}
            >
              <Star
                className={css({ fill: 'yellow100', w: '23px', h: '23px' })}
              />
              <Star
                className={css({ fill: 'yellow100', w: '23px', h: '23px' })}
              />
              <Star
                className={css({ fill: 'yellow100', w: '23px', h: '23px' })}
              />
            </div>
            <div
              className={css({ textStyle: 'paragraph1', color: 'yellow50' })}
            >
              {reviewsCount} Reviews
            </div>
          </div>
        </div>
        <div className={css({ textStyle: 'paragraph1', color: 'yellow80' })}>
          Hello, fellow food enthusiasts! I'm John, your friendly Dry Laksa
          instructor. Cooking has always been my passion, and I'm thrilled to
          share my love for this delightful Southeast Asian dish with you all.
          In my Dry Laksa classes, you can expect a hands-on and interactive
          cooking experience. We'll start by delving into the history and
          origins of this dish before diving into the preparation process. I'll
          share time-tested techniques, secret ingredient tips, and the
          subtleties of balancing flavors that make Dry Laksa truly special.
        </div>
      </div>
    </div>
  );
}
