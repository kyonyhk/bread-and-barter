import { ReactNode } from 'react';
import { css, cx } from '../../../../styled-system/css';

export interface ButtonLargeProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function ButtonLarge({
  children,
  type = 'button',
  disabled = false,
  onClick,
  className,
}: ButtonLargeProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          w: '360px', // Default width
          maxW: '100%',
          textStyle: 'subheading4',
          transition: 'all 0.2s ease-in-out',
          padding: '16px 24px',
          borderWidth: '1px',
          borderColor: disabled ? 'yellow10' : 'yellow20',
          borderRadius: '40px',
          backgroundColor: disabled ? 'yellow5' : 'yellow5',
          color: disabled ? 'yellow20' : 'yellow100',
          cursor: disabled ? 'not-allowed' : 'pointer',
          _hover: disabled
            ? {}
            : {
                bg: 'yellow10',
                borderColor: 'yellow100',
                color: 'yellow100',
              },
          _active: disabled
            ? {}
            : {
                bg: 'yellow80',
                color: 'altyellow',
              },
        }),
        className // This will override the default width when w: '100%' is provided
      )}
    >
      {children}
    </button>
  );
}
