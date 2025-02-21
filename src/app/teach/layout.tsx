'use client';

import { css } from '../../../styled-system/css';

export default function TeachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={css({
        display: 'flex',
        h: '85vh', // Subtract navbar height
        bg: 'transparent',
        color: 'yellow100',
        marginTop: '80px',
        padding: '40px',
        gap: '24px',
      })}
    >
      {/* Left Column */}
      <div
        className={css({
          w: '50%',
          h: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bg: 'black',
        })}
      >
        <div
          className={css({
            position: 'relative',
            w: '100%',
            h: '100%',
            borderRadius: '40px',
            overflow: 'hidden',
            borderColor: 'yellow20',
            borderWidth: '1px',
          })}
        >
          <img
            src="/images/camping.png"
            alt="guy on a camping chair"
            className={css({
              w: '100%',
              h: '100%',
              objectFit: 'cover',
            })}
          />
          <div
            className={css({
              position: 'absolute',
              top: '120px',
              left: '40px',
              right: '40px',
            })}
          >
            <div className={css({ textStyle: 'heading2' })}>
              Welcome to your journey to teaching.
            </div>
            <div
              className={css({
                textStyle: 'subheading3',
                color: 'yellow80',
                mt: '8px',
              })}
            >
              "The art of teaching is the art of assisting discovery."
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div
        className={css({
          w: '50%',
          h: '100%',
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <div
          className={css({
            h: '100%',
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
