import { css } from '../../../../../styled-system/css';

const TestIconDirect = () => (
  <div className={css({ display: 'flex', gap: '8px' })}>
    <svg
      className={css({ fill: 'yellow100', width: '16px', height: '16px' })}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C8.134 2 5 5.134 5 9s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 2c2.762 0 5 2.238 5 5s-2.238 5-5 5-5-2.238-5-5 2.238-5 5-5zm0 10c-2.962 0-5.5 2.087-5.5 4.5v.5h11v-.5c0-2.413-2.538-4.5-5.5-4.5zm0 2c1.906 0 3.5 1.006 3.5 2.5h-7c0-1.494 1.594-2.5 3.5-2.5z" />
    </svg>
    <svg
      className={css({ fill: 'yellow100', width: '24px', height: '24px' })}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C8.134 2 5 5.134 5 9s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 2c2.762 0 5 2.238 5 5s-2.238 5-5 5-5-2.238-5-5 2.238-5 5-5zm0 10c-2.962 0-5.5 2.087-5.5 4.5v.5h11v-.5c0-2.413-2.538-4.5-5.5-4.5zm0 2c1.906 0 3.5 1.006 3.5 2.5h-7c0-1.494 1.594-2.5 3.5-2.5z" />
    </svg>
  </div>
);

export default TestIconDirect;
