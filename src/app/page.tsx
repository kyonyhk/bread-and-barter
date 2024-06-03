import { css } from '../../styled-system/css';
import ButtonSmall from '@repo/components/atoms/buttons/ButtonSmall';
import ButtonMedium from '@repo/components/atoms/buttons/ButtonMedium';
import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import ButtonNoBorder from '@repo/components/atoms/buttons/ButtonNoBorder';
import { Minus, LeftArrow, RightArrow } from '@repo/components/atoms/icons';

export default function Home() {
  return (
    <div
      className={css({
        w: 'full',
        h: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        padding: '40px',
      })}
    >
      <div className={css({ color: 'white', textStyle: 'heading4' })}>
        Icons
      </div>
      <div
        className={css({ display: 'flex', flexDirection: 'row', gap: '8px' })}
      >
        <Minus className={css({ h: '24px', w: '24px' })} />
        <RightArrow className={css({ h: '24px', w: '24px' })} />
        <LeftArrow className={css({ h: '24px', w: '24px' })} />
      </div>

      {/* Components */}
      <div
        className={css({
          color: 'white',
          textStyle: 'heading4',
        })}
      >
        Components
      </div>

      {/* Button No Border */}
      <ButtonNoBorder>
        <Minus className={css({ h: '24px', w: '24px' })} />
        Add Timeslot
      </ButtonNoBorder>

      {/* Small Button */}
      <ButtonSmall>Small</ButtonSmall>

      {/* Medium Button */}
      <ButtonMedium>
        Medium
        <RightArrow className={css({ h: '24px', w: '24px' })} />
      </ButtonMedium>

      {/* Large Button */}
      <ButtonLarge>
        Large
        <RightArrow className={css({ h: '24px', w: '24px' })} />
      </ButtonLarge>
      <ButtonLarge>Button No Icon</ButtonLarge>

      <div></div>
    </div>
  );
}
