import { ReactNode } from 'react';
import { css } from '../../../../styled-system/css';

interface ButtonMediumProps {
  children: ReactNode;
}

export default function ButtonMedium({ children }: ButtonMediumProps) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        maxWidth: '360px',
        w: '147px',
        textStyle: 'paragraph1',
        padding: '12px 24px',
        borderWidth: '1px',
        borderColor: 'yellow20',
        borderRadius: '40px',
        backgroundColor: 'yellow5',
        color: 'yellow100',
        _hover: {
          bg: 'yellow20',
          borderColor: 'yellow100',
          color: 'yellow100',
          cursor: 'pointer',
        },
        _active: {
          bg: 'yellow80',
          borderColor: 'yellow100',
          color: 'altyellow',
          cursor: 'auto',
        },
      })}
    >
      {children}
    </div>
  );
}
