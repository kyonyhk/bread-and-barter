import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import { RightArrow } from '@repo/components/atoms/icons';
import { css } from 'styled-system/css';

const LandingWrapper = () => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          padding: '0px 40px',
          h: '100vh',
          w: '100vw',
        })}
      >
        <div
          className={css({
            w: '100%',
            h: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'yellow100',
          })}
        >
          Photo Carousel
        </div>
        <div
          className={css({
            w: '100%',
            h: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'yellow100',
          })}
        >
          Text
        </div>
      </div>
      <ButtonLarge>
        Start Learning
        <RightArrow
          className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
        />
      </ButtonLarge>
    </div>
  );
};

export default LandingWrapper;
