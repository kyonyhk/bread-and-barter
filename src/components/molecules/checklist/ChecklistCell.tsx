import { Check, Circle } from '@repo/components/atoms/icons';
import { css } from '../../../../styled-system/css';

interface ChecklistCellProps {
  title: string;
  isExpanded: boolean;
  isCompleted?: boolean;
  isAllComplete?: boolean;
}

export default function ChecklistCell({
  title,
  isExpanded = true,
  isCompleted = false,
  isAllComplete = false,
}: ChecklistCellProps) {
  // Show Check/Circle based on completion, regardless of expanded state
  const Icon = isCompleted ? Check : Circle;
  // Use green/yellow color based on completion and overall completion
  const color = isAllComplete
    ? 'green100'
    : isCompleted
      ? 'green100'
      : 'yellow100';

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        alignItems: 'center',
        position: 'relative',
        _hover: !isExpanded
          ? {
              '& .tooltip': {
                opacity: 1,
                visibility: 'visible',
              },
            }
          : undefined,
      })}
    >
      <Icon
        className={css({
          fill: isCompleted ? color : 'none',
          stroke: color,
          w: '20px',
          h: '20px',
        })}
      />
      <div
        className={css({
          textStyle: 'paragraph1',
          color: isCompleted ? color : isAllComplete ? 'green50' : 'altyellow',
          display: isExpanded ? 'block' : 'none', // Hide text when expanded
        })}
      >
        {title}
      </div>
      {/* Tooltip */}
      {!isExpanded && (
        <div
          className={
            css({
              position: 'absolute',
              left: '-8px',
              transform: 'translateX(-100%)',
              bg: 'black50',
              backdropFilter: 'auto',
              backdropBlur: '2px',
              borderRadius: '8px',
              padding: '8px 12px',
              textStyle: 'paragraph2',
              color: isCompleted
                ? 'green100'
                : isAllComplete
                  ? 'green50'
                  : 'yellow100',
              whiteSpace: 'nowrap',
              opacity: 0,
              visibility: 'hidden',
              transition: 'all 0.2s ease-in-out',
              zIndex: 9999,
              borderWidth: '1px',
              borderColor: isCompleted
                ? 'green20'
                : isAllComplete
                  ? 'green20'
                  : 'yellow20',
            }) + ' tooltip'
          }
        >
          {title}
        </div>
      )}
    </div>
  );
}
