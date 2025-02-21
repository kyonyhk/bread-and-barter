import { createIcon } from '../createIcon';

export const Circle = createIcon({
  displayName: `Circle`,
  viewBox: `0 0 24 24`,
  path: (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5ZM1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12Z"
      />
    </>
  ),
  defaultProps: {
    width: `100%`,
    height: `100%`,
    fill: `none`,
  },
});
