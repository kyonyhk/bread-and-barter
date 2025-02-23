import { createIcon } from '../createIcon';

export const Edit = createIcon({
  displayName: `Edit`,
  viewBox: `0 0 24 24`,
  path: (
    <>
      <path
        d="M10 2H3C2.46957 2 1.96086 2.21071 1.58579 2.58579C1.21071 2.96086 1 3.46957 1 4V18C1 18.5304 1.21071 19.0391 1.58579 19.4142C1.96086 19.7893 2.46957 20 3 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.375 1.62498C16.7728 1.22716 17.3124 1.00366 17.875 1.00366C18.4376 1.00366 18.9772 1.22716 19.375 1.62498C19.7728 2.02281 19.9963 2.56237 19.9963 3.12498C19.9963 3.68759 19.7728 4.22716 19.375 4.62498L10 14L6 15L7 11L16.375 1.62498Z"
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
