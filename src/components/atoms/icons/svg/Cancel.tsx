import { createIcon } from '../createIcon';

export const Cancel = createIcon({
  displayName: `Cancel`,
  viewBox: `0 0 24 24`,
  path: (
    <>
      <path
        d="M7 17L17 7M7 7L17 17"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  defaultProps: {
    width: `100%`,
    height: `100%`,
    fill: `none`,
    stroke: `none`,
  },
});
