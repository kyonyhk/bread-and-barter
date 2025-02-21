'use client';

import { Discord, Instagram, Tiktok } from '@repo/components/atoms/icons';
import { css } from '../../../../styled-system/css';

const Footer = () => {
  return (
    <footer
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bg: 'transparent',
        position: 'absolute',
        w: '100%',
        bottom: 0,
        zIndex: 50,
        padding: '24px 40px',
        backdropFilter: 'auto',
        backdropBlur: '2px',
      })}
    >
      {/* Shade */}
      <div
        className={css({
          w: '100%',
          h: '100%',
          background:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.25) 25%, rgba(0, 0, 0, 0.00) 50%)',
          position: 'absolute',
          zIndex: -1,
          transform: 'translate(-20px, 0px)',
        })}
      ></div>

      <div className={css({ textStyle: 'paragraph2', color: 'yellow100' })}>
        ST. BAKERY 2025
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          gap: '24px',
          alignItems: 'center',
        })}
      >
        <Instagram
          className={css({
            fill: 'yellow80',
            cursor: 'pointer',
            w: '24px',
            h: '24px',
            _hover: { fill: 'yellow100' },
          })}
          onClick={() => {}}
        />
        <Tiktok
          className={css({
            fill: 'yellow80',
            cursor: 'pointer',
            w: '24px',
            h: '24px',
            _hover: { fill: 'yellow100' },
          })}
          onClick={() => {}}
        />
        <Discord
          className={css({
            fill: 'yellow80',
            cursor: 'pointer',
            w: '24px',
            h: '24px',
            _hover: { fill: 'yellow100' },
          })}
          onClick={() => {}}
        />
      </div>
    </footer>
  );
};

export default Footer;
