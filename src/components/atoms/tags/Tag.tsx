import { css } from '../../../../styled-system/css';
import React from 'react';

interface TagProps {
  children: string;
}

export default function Tag({ children }: TagProps) {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        padding: '8px 16px',
        color: 'altyellow',
        bg: 'yellow50',
        borderColor: 'yellow50',
        borderRadius: '100px',
        maxWidth: '100px',
      })}
    >
      {children}
    </div>
  );
}
