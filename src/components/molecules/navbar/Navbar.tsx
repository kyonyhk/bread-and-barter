'use client';

import { NavMenu } from '@repo/components/atoms/icons';
import Logo from '@repo/components/atoms/logo/Logo';
import { useProfilePopup } from '@repo/contexts/profile-popup-context';
import Link from 'next/link';
import { css } from 'styled-system/css';

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

  return (
    <nav
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 24px',
        bg: 'black50',
        position: 'sticky',
        top: 0,
        zIndex: 10000,
        backdropFilter: 'auto',
        backdropBlur: 'sm',
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
      <div className={css({ cursor: 'pointer' })}>
        <NavMenu
          className={css({
            w: '40px',
            h: '40px',
            stroke: 'yellow50',
            _hover: {
              stroke: 'yellow100',
            },
          })}
          onClick={toggleProfilePopup}
        />
      </div>
    </nav>
  );
};

export default Navbar;
