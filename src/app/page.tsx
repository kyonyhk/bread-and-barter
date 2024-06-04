import { css } from '../../styled-system/css';
import ButtonSmall from '@repo/components/atoms/buttons/ButtonSmall';
import ButtonMedium from '@repo/components/atoms/buttons/ButtonMedium';
import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import ButtonNoBorder from '@repo/components/atoms/buttons/ButtonNoBorder';
import { Minus, LeftArrow, RightArrow } from '@repo/components/atoms/icons';
import Link from 'next/link';

export default function Home() {
  return (
    <div
      className={css({
        w: 'full',
        h: '100vh',
        backgroundColor: '#111111',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        padding: '40px',
      })}
    >
      <Link href="/components">
        <div
          className={css({
            textStyle: 'heading4',
            color: 'yellow100',
          })}
        >
          Components - Atoms
        </div>
      </Link>

      <Link href="/home-components">
        <div className={css({ textStyle: 'heading4', color: 'yellow100' })}>
          Components - Home
        </div>
      </Link>
    </div>
  );
}
