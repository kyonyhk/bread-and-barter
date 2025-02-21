import { css } from '../../../../styled-system/css';

type TagVariant = 'yellow' | 'green' | 'red' | 'orange';

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  className?: string;
}

const variantStyles = {
  yellow: {
    color: 'altyellow',
    bg: 'yellow10',
    borderColor: 'yellow50',
  },
  green: {
    color: 'altgreen',
    bg: 'green10',
    borderColor: 'green50',
  },
  red: {
    color: 'altred',
    bg: 'red10',
    borderColor: 'red50',
  },
  orange: {
    color: 'altorange',
    bg: 'orange10',
    borderColor: 'orange50',
  },
};

export default function Tag({
  children,
  variant = 'yellow',
  className,
}: TagProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`${css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 16px',
        color: styles.color,
        bg: styles.bg,
        borderColor: styles.borderColor,
        borderWidth: '1px',
        borderRadius: '100px',
        textStyle: 'paragraph2',
      })} ${className}`}
    >
      {children}
    </div>
  );
}
