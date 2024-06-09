import { createIcon } from '../createIcon';

export const NavMenu = createIcon({
  displayName: `NavMenu`,
  viewBox: `0 0 24 24`,
  path: (
    <>
      <path
        d="M4.125 18.375H19.875M4.125 12.375H19.875M4.125 6.375H19.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  defaultProps: {
    width: `100%`,
    height: `100%`,
    fill: `none`,
    stroke: 'none',
  },
});
