import { css } from '../../../../styled-system/css';

const Logo = () => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      })}
    >
      <div
        className={css({
          textStyle: 'subheading1',
          color: 'yellow100',
          fontSize: '48px',
        })}
      >
        &
      </div>
      <div className={css({ display: 'flex', flexDirection: 'column' })}>
        <div className={css({ textStyle: 'subheading3', color: 'yellow100' })}>
          BREAD
        </div>
        <div className={css({ textStyle: 'subheading3', color: 'yellow100' })}>
          BARTER
        </div>
      </div>
    </div>
  );
};

export default Logo;
