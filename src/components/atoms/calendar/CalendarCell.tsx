import { MouseEventHandler } from 'react';
import { css } from '../../../../styled-system/css';

export type CalendarCellState =
  | 'empty'
  | 'past'
  | 'available'
  | 'selected'
  | 'not_available';

interface CalendarCellProps {
  date: number | null;
  state: CalendarCellState;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
}

export default function CalendarCell({
  date,
  state,
  onClick,
  className = '',
}: CalendarCellProps) {
  // Only allow clicking if the state is available or selected
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent event bubbling
    if (state === 'available' || state === 'selected') {
      onClick?.(e);
    }
  };

  return (
    <div
      className={`${css({
        w: '100%',
        h: '80px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        borderWidth: '1px',
        cursor:
          state === 'available' || state === 'selected' ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',

        // Empty state
        ...(state === 'empty' && {
          borderColor: 'yellow10',
          bg: 'transparent',
        }),

        // Past state
        ...(state === 'past' && {
          borderColor: 'yellow10',
          bg: 'transparent',
        }),

        // Not available state
        ...(state === 'not_available' && {
          borderColor: 'yellow10',
          bg: 'transparent',
        }),

        // Available state
        ...(state === 'available' && {
          borderColor: 'yellow10',
          bg: 'transparent',
          _hover: {
            bg: 'yellow10',
            borderColor: 'yellow50',
          },
        }),

        // Selected state
        ...(state === 'selected' && {
          borderColor: 'green50',
          bg: 'green10',
          _hover: {
            bg: 'green20',
          },
        }),
      })} ${className}`}
      onClick={handleClick}
    >
      {date && (
        <div
          className={css({
            w: '100%',
            h: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0px',
          })}
        >
          <div
            className={css({
              textStyle: 'subheading2',
              color:
                state === 'past' || state === 'not_available'
                  ? 'yellow10'
                  : state === 'selected'
                    ? 'green100'
                    : 'yellow100',
              textDecoration: state === 'past' ? 'line-through' : 'none',
              textDecorationColor: 'yellow10',
              textDecorationThickness: '2px',
            })}
          >
            {date}
          </div>
          {state === 'selected' && (
            <div
              className={css({
                textStyle: 'paragraph4',
                color: 'green100',
              })}
            >
              Selected
            </div>
          )}
        </div>
      )}
    </div>
  );
}
