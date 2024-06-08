import Link from 'next/link';
import { css } from '../../../styled-system/css';

export default function App() {
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
