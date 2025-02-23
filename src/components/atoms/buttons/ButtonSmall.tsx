import { ReactNode } from 'react';
import { css } from '../../../../styled-system/css';

interface ButtonSmallProps {
  children: ReactNode;
}

export default function ButtonSmall({ children }: ButtonSmallProps) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '320px',
        w: '96px',
        textStyle: 'paragraph1',
        padding: '8px 16px',
        borderWidth: '1px',
        borderColor: 'yellow20',
        borderRadius: '40px',
        bg: 'yellow5',
        color: 'yellow100',
        _hover: {
          bg: 'yellow10',
          borderColor: 'yellow100',
          color: 'yellow100',
          cursor: 'pointer',
        },
      })}
    >
      {children}
    </div>
  );
}
