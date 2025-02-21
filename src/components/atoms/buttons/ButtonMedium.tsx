import { MouseEventHandler, ReactNode } from 'react';
import { css, cx } from '../../../../styled-system/css';

type ColorVariant = 'yellow' | 'green' | 'red';

interface ButtonMediumProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant?: ColorVariant;
  className?: string;
}

const getVariantStyles = (variant: ColorVariant, disabled: boolean) => {
  const styles = {
    yellow: {
      color: disabled ? 'yellow20' : 'yellow100',
      bg: 'yellow5',
      borderColor: disabled ? 'yellow10' : 'yellow20',
      _hover: disabled
        ? {}
        : {
            bg: 'yellow10',
            borderColor: 'yellow50',
          },
      _active: disabled
        ? {}
        : {
            bg: 'yellow80',
            borderColor: 'yellow100',
            color: 'altyellow',
          },
    },
    green: {
      color: disabled ? 'green20' : 'green100',
      bg: 'green5',
      borderColor: disabled ? 'green10' : 'green20',
      _hover: disabled
        ? {}
        : {
            bg: 'green10',
            borderColor: 'green50',
          },
      _active: disabled
        ? {}
        : {
            bg: 'green80',
            borderColor: 'green100',
            color: 'altgreen',
          },
    },
    red: {
      color: disabled ? 'red20' : 'red100',
      bg: 'red5',
      borderColor: disabled ? 'red10' : 'red20',
      _hover: disabled
        ? {}
        : {
            bg: 'red10',
            borderColor: 'red50',
          },
      _active: disabled
        ? {}
        : {
            bg: 'red80',
            borderColor: 'red100',
            color: 'altred',
          },
    },
  };

  return styles[variant];
};

const ButtonMedium: React.FC<ButtonMediumProps> = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
  variant = 'yellow',
  className,
}) => {
  const variantStyles = getVariantStyles(variant, disabled);

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cx(
        css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
          maxWidth: '360px',
          minW: '160px',
          textStyle: 'paragraph1',
          whiteSpace: 'nowrap',
          padding: '12px 24px',
          borderWidth: '1px',
          borderRadius: '40px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease-in-out',
          bg: variantStyles.bg,
          color: variantStyles.color,
          borderColor: variantStyles.borderColor,
          _hover: variantStyles._hover,
          _active: variantStyles._active,
        }),
        className
      )}
    >
      {children}
    </button>
  );
};

export default ButtonMedium;
