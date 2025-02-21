'use client';

import { useAuth } from '@repo/app/auth/AuthContext';
import ButtonMedium from '@repo/components/atoms/buttons/ButtonMedium';
import { NavMenu } from '@repo/components/atoms/icons';
import Logo from '@repo/components/atoms/logo/Logo';
import { useProfilePopup } from '@repo/contexts/profile-popup-context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { css } from '../../../../styled-system/css';

// const NavbarWrapper = styled.nav`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   padding: 24px 16px;
//   background: rgba(255, 255, 255, 0.1); // Semi-transparent background
//   position: sticky;
//   top: 0;
//   z-index: 1000;
//   backdrop-filter: blur(10px); // Apply blur effect
//   -webkit-backdrop-filter: blur(10px); // For Safari support
// `;

const Navbar: React.FC = () => {
  const { toggleProfilePopup } = useProfilePopup();
  const { user } = useAuth();
  const pathname = usePathname();

  const isAuthPage = pathname?.startsWith('/auth/');

  return (
    <nav
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 40px',
        bg: 'transparent',
        position: 'fixed',
        w: '100%',
        top: 0,
        zIndex: 10000,
        backdropFilter: 'auto',
        backdropBlur: '4px',
      })}
    >
      {/* Shade */}
      <div
        className={css({
          w: '100%',
          h: '100%',
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.80) 25%, rgba(0, 0, 0, 0.00) 75%)',
          position: 'absolute',
          zIndex: -1,
          transform: 'translate(-20px, 0px)',
        })}
      ></div>

      <Link href="/home">
        <Logo />
      </Link>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          alignItems: 'center',
        })}
      >
        <Link href="/teach">
          <ButtonMedium className={css({ w: 'fit-content' })}>
            Teach a Course
          </ButtonMedium>
        </Link>

        {user ? (
          <div className={css({ cursor: 'pointer' })}>
            <NavMenu
              className={css({
                w: '24px',
                h: '24px',
                stroke: 'yellow50',
                _hover: {
                  stroke: 'yellow100',
                },
              })}
              onClick={toggleProfilePopup}
            />
          </div>
        ) : !isAuthPage ? (
          <>
            <Link href="/auth/signup">
              <ButtonMedium
                className={css({ w: 'fit-content', bg: 'yellow20' })}
              >
                Sign Up / Log In
              </ButtonMedium>
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
