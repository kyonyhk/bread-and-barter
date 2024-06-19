import { MouseEventHandler, ReactNode } from 'react';
import { css } from '../../../../styled-system/css';

interface ButtonNoBorderProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function ButtonNoBorder({ children }: ButtonNoBorderProps) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        maxWidth: '320px',
        width: '140px',
        textStyle: 'paragraph1',
        color: 'yellow100',
        opacity: 0.5,
        _hover: {
          cursor: 'pointer',
          opacity: 1.0,
        },
      })}
    >
      {children}
    </div>
  );
}
