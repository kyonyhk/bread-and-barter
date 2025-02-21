import { css, cx } from '../../../../styled-system/css';
import { Plus } from '../icons';

interface TileButtonProps {
  title: string;
  subtitle: string;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export default function TileButton({
  title,
  subtitle,
  className,
  onClick,
  icon,
}: TileButtonProps) {
  return (
    <div
      onClick={onClick}
      className={cx(
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          justifyContent: 'center',
          alignItems: 'center',
          h: '128px',
          w: '100%',
          borderWidth: '1px',
          borderColor: 'yellow20',
          borderStyle: 'dashed',
          _hover: {
            bg: 'yellow10',
            cursor: 'pointer',
          },
        }),
        className
      )}
    >
      {icon || (
        <Plus
          className={css({
            fill: 'yellow100',
            h: '40px',
            w: '40px',
          })}
        />
      )}

      <div>
        <div
          className={css({
            textStyle: 'subheading5',
            color: 'yellow80',
            textAlign: 'center',
          })}
        >
          {title}
        </div>
        <div
          className={css({
            textStyle: 'paragraph2',
            color: 'yellow50',
            textAlign: 'center',
          })}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}
