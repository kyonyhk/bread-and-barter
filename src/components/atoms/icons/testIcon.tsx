import { Play, UpArrow } from '@repo/components/atoms/icons';
import { css } from '../../../../styled-system/css';

const TestIcon = () => (
  <div className={css({ display: 'flex', gap: '8px' })}>
    <Play
      className={css({ fill: 'yellow100', width: '16px', height: '16px' })}
    />
    <UpArrow className={css({ fill: 'yellow100', w: '24px', h: '24px' })} />
  </div>
);

export default TestIcon;
