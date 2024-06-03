import { createIcon } from '../createIcon';

export const Preview = createIcon({
  displayName: `Preview`,
  viewBox: `0 0 24 24`,
  path: (
    <>
      <path d="M3 5.5H21" strokeLinecap="round" />
      <path d="M3 11.5H9" strokeLinecap="round" />
      <path d="M3 17.5H9" strokeLinecap="round" />
      <circle cx="16" cy="14" r="4.5" />
      <path d="M19.3535 17.6465L22.3535 20.6465" strokeLinecap="round" />
    </>
  ),
  defaultProps: {
    width: `100%`,
    height: `100%`,
    fill: `none`,
    stroke: `none`,
  },
});
