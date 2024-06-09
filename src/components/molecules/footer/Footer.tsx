'use client';

import { Discord, Instagram, Tiktok } from '@repo/components/atoms/icons';
import { css } from 'styled-system/css';

const Footer = () => {
  return (
    <footer
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bg: 'black50',
        bottom: 0,
        zIndex: 1,
        padding: '24px 24px',
        backdropFilter: 'auto',
        backdropBlur: 'sm',
      })}
    >
      <div className={css({ textStyle: 'paragraph2', color: 'yellow100' })}>
        ST. BAKERY 2024
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
