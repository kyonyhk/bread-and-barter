import { css, cx } from '../../../../styled-system/css';
import { ReactNode } from 'react';

interface ButtonLargeProps {
  children: ReactNode;
}

export default function ButtonLarge({ children }: ButtonLargeProps) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        maxWidth: '360px',
        textStyle: 'subheading4',
        padding: '16px 24px',
        borderWidth: '1px',
        borderColor: 'yellow50',
        borderRadius: '40px',
        backgroundColor: 'yellow5',
        color: 'altyellow',
        _hover: {
          bg: 'yellow10',
          borderColor: 'yellow50',
          color: 'yellow100',
          cursor: 'pointer',
        },
        _active: {
          bg: 'yellow80',
          color: 'altyellow',
          cursor: 'auto',
        },
      })}
    >
      {children}
    </div>
  );
}
