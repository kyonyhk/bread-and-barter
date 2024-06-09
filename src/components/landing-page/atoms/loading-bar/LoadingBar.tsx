import { forwardRef, useEffect, useRef } from 'react';
import { css } from 'styled-system/css';

interface LoadingBarProps {
  progress: number;
}

const LoadingBar = forwardRef<HTMLDivElement, LoadingBarProps>(
  ({ progress }, ref) => {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
    }, [progress]);

    return (
      // Base Progress Bar
      <div
        ref={ref}
        className={css({
          w: '400px',
          h: '3px',
          bg: 'yellow10',
          borderRadius: '100px',
          position: 'relative',
          overflow: 'hidden',
        })}
      >
        {/* Loading Bar */}
        <div
          ref={barRef}
          className={css({
            position: 'absolute',
            bg: 'yellow100',
            h: '3px',
            borderRadius: '100px',
            zIndex: 1,
            transition:
              'width 0.1s cubic-bezier( 1.000,  0.000,  0.000,  1.000 )',
          })}
        ></div>
      </div>
    );
  }
);

export default LoadingBar;
