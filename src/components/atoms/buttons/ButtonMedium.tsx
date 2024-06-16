import { MouseEventHandler, ReactNode } from 'react';
import { css } from '../../../../styled-system/css';

interface ButtonMediumProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  activeColor?: string;
  activeBackgroundColor?: string;
  activeBorderColor?: string;
}

export default function ButtonMedium({
  children,
  onClick,
  color = 'yellow100',
  backgroundColor = 'yellow5',
  borderColor = 'yellow20',
  hoverColor = 'yellow100',
  hoverBackgroundColor = 'yellow20',
  hoverBorderColor = 'yellow100',
  activeColor = 'altyellow',
  activeBackgroundColor = 'yellow80',
  activeBorderColor = 'yellow100',
}: ButtonMediumProps) {
  return (
    <div
      onClick={onClick}
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
        borderColor: borderColor,
        borderRadius: '40px',
        backgroundColor: backgroundColor,
        color: color,
        _hover: {
          backgroundColor: hoverBackgroundColor,
          borderColor: hoverBorderColor,
          color: hoverColor,
          cursor: 'pointer',
        },
        _active: {
          backgroundColor: activeBackgroundColor,
          borderColor: activeBorderColor,
          color: activeColor,
          cursor: 'auto',
        },
      })}
    >
      {children}
    </div>
  );
}
