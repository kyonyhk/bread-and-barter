'use client';

import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import LoadingBar from '../../atoms/loading-bar/LoadingBar';

const FakeLoadingScreen = ({ children }: { children: React.ReactNode }) => {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoadingComplete, setIsLoadingComplete] = useState<boolean>(false);
  const loadingNumberRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoadingComplete(true);
      },
    });

    tl.to(loadingNumberRef.current, {
      y: `${loadingProgress}vh`,
      duration: 0.25,
      opacity: 1,
      ease: 'linear',
    });

    if (loadingProgress === 100) {
      tl.to(
        taglineRef.current,
        {
          y: '-100%',
          duration: 0.5,
          ease: 'power4.out',
        },
        '+=0.5'
      );
      tl.to(
        loadingBarRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: 'power4.out',
        },
        '-=0.5'
      );
    }
  }, [loadingProgress]);

  const formattedLoadingProgress = loadingProgress.toString().padStart(2, '0');

  return (
    <>
      {isLoadingComplete ? (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            w: '100vw',
            h: '100vh',
            overflow: 'hidden',
          })}
        >
          <div
            ref={loadingNumberRef}
            className={`loading-number ${css({
              textStyle: 'heading1',
              color: 'yellow100',
              position: 'absolute',
              top: 0,
              opacity: 0,
            })}`}
          >
            {formattedLoadingProgress}
          </div>
          <LoadingBar ref={loadingBarRef} progress={loadingProgress} />
          <div
            className={css({
              display: 'flex',
              h: '26px',
              w: '240px',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            })}
          >
            <div
              ref={taglineRef}
              className={css({
                textStyle: 'paragraph1',
                color: 'yellow80',
                position: 'absolute',
              })}
            >
              life is about to get very exciting.
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default FakeLoadingScreen;
