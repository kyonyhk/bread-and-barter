import { ReactNode } from 'react';
import { css } from '../../../../styled-system/css';

interface TimeslotProps {
  day: string;
  children: ReactNode;
}

export default function Timeslot({ day, children }: TimeslotProps) {
  return (
    <div
      className={css({ display: 'flex', flexDirection: 'column', gap: '8px' })}
    >
      <div className={css({ textStyle: 'subheading5', color: 'yellow100' })}>
        {day}
      </div>
      <div
        className={css({ display: 'flex', flexDirection: 'row', gap: '8px' })}
      >
        {children}
      </div>
    </div>
  );
}
