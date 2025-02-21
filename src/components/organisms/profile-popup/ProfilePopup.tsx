'use client';

import { useAuth } from '@repo/app/auth/AuthContext';
import { Avatar } from '@repo/components/atoms/avatar';
import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import { Divider } from '@repo/components/atoms/divider/';
import { Cancel, RightArrow } from '@repo/components/atoms/icons';
import Tag from '@repo/components/atoms/tags/Tag';
import CourseProfileTile from '@repo/components/molecules/course-profile-tile/CourseProfileTile';
import { useProfilePopup } from '@repo/contexts/profile-popup-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { css } from '../../../../styled-system/css';

export default function ProfilePopup() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { isProfilePopupOpen, toggleProfilePopup } = useProfilePopup();

  if (!user) return null;

  const isAdmin = user?.user_metadata?.is_admin || false;
  const isTeacher = user?.user_metadata?.is_teacher || false;
  const firstName = user?.user_metadata?.first_name || '';
  const lastName = user?.user_metadata?.last_name || '';
  const fullName = `${firstName} ${lastName}`;

  const handleLogout = async () => {
    try {
      await signOut();
      toggleProfilePopup(); // Close the popup
      router.push('/auth/signin'); // Redirect to sign in page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div
      className={css({
        display: isProfilePopupOpen ? 'flex' : 'none',
        flexDirection: 'column',
        gap: '24px',
        borderWidth: '1px',
        borderColor: 'yellow20',
        borderRadius: '30px',
        padding: '24px',
        bg: 'black50',
        backdropFilter: 'auto',
        backdropBlur: 'lg',
        w: '400px',
        position: 'fixed',
        top: '8px',
        right: '8px',
        zIndex: 1000000,
      })}
    >
      {/* Close Button */}
      <Cancel
        className={css({
          stroke: 'yellow50',
          w: '24px',
          h: '24px',
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 1200001,
          cursor: 'pointer',
          _hover: {
            stroke: 'yellow100',
          },
        })}
        onClick={toggleProfilePopup}
      />

      {/* Avatar + Name */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '16px',
        })}
      >
        <Avatar
          name={fullName}
          src="/images/profile-pic.png"
          className={css({ textStyle: 'subheading3' })}
        />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          })}
        >
          <div
            className={css({
              textStyle: 'subheading3',
              color: 'yellow100',
            })}
          >
            {fullName}
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'row',
              gap: '4px',
            })}
          >
            <Tag variant="yellow">Regular</Tag>
            {isTeacher && (
              <Tag
                variant="green"
                className={css({
                  bg: 'green10',
                  borderColor: 'green50',
                  color: 'altgreen',
                })}
              >
                Teacher
              </Tag>
            )}
            {isAdmin && (
              <Tag
                variant="red"
                className={css({
                  bg: 'red10',
                  borderColor: 'red50',
                  color: 'altred',
                })}
              >
                Admin
              </Tag>
            )}
          </div>
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
        {isTeacher && (
          <Link href="/dashboard" onClick={toggleProfilePopup}>
            <ButtonLarge className={css({ w: '100%' })}>
              Dashboard
              <RightArrow
                className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
              />
            </ButtonLarge>
          </Link>
        )}
        <Link href="/account" onClick={toggleProfilePopup}>
          <ButtonLarge className={css({ w: '100%' })}>
            Account
            <RightArrow
              className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
            />
          </ButtonLarge>
        </Link>
      </div>

      <Divider backgroundColor="yellow20" />

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        })}
      >
        {/* Section Heading */}
        <div className={css({ textStyle: 'subheading4', color: 'yellow100' })}>
          Upcoming Courses
        </div>
        elteleg
        {/* Course Tiles */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            overflowX: 'auto',
          })}
        >
          <CourseProfileTile />
          <CourseProfileTile />
        </div>
        <Divider backgroundColor="yellow20" />
        <ButtonLarge onClick={handleLogout} className={css({ w: '100%' })}>
          Log Out
          <RightArrow
            className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
          />
        </ButtonLarge>
      </div>
    </div>
  );
}
