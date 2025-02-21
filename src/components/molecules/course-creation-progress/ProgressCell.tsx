import { css } from '../../../../styled-system/css';
import { CheckboxCircle, Circle } from '../../atoms/icons';

interface ProgressCellProps {
  stepNumber: number;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
}

export default function ProgressCell({
  stepNumber,
  title,
  isCompleted,
  isActive,
}: ProgressCellProps) {
  const color = isCompleted ? 'green100' : 'yellow100';
  const Icon = isCompleted ? CheckboxCircle : Circle;

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: isActive ? 1 : 0.4,
        transition: 'opacity 0.2s ease-in-out',
      })}
    >
      <Icon
        className={css({
          fill: color,
          w: '48px',
          h: '48px',
        })}
      />
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        <div
          className={css({
            textStyle: 'paragraph2',
            color: color,
            opacity: 0.8,
          })}
        >
          {`Step ${stepNumber}`}
        </div>
        <div className={css({ textStyle: 'subheading5', color: color })}>
          {title}
        </div>
      </div>
    </div>
  );
}
