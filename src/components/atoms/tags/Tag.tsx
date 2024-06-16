import { css } from '../../../../styled-system/css';

interface TagProps {
  children: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  className?: string;
}

export default function Tag({
  children,
  color = 'altyellow',
  backgroundColor = 'yellow50',
  borderColor = 'yellow50',
  className,
}: TagProps) {
  return (
    <div
      className={`${css({
        display: 'flex',
        justifyContent: 'center',
        padding: '4px 16px',
        color: color,
        bg: backgroundColor,
        borderColor: borderColor,
        borderRadius: '100px',
        maxWidth: '160px',
        textStyle: 'paragraph2',
      })} ${className}`}
    >
      {children}
    </div>
  );
}
