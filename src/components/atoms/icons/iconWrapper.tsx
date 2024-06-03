import { css } from '../../../../styled-system/css';
import { SystemStyleObject } from '../../../../styled-system/types';
import { ColorId } from '../../theme/colors/colors';
import * as widgets from './svg';

export type IconName = keyof typeof widgets;

export type IconWrapperProps = {
  name: IconName;
  // should be use with css.raw() see packages/kinetic-ui/src/atoms/button/Button.stories.tsx
  cssIcon?: SystemStyleObject;
  color?: ColorId;
};

export const IconWrapper = ({ name, cssIcon, color }: IconWrapperProps) => {
  const Icon = widgets[name];

  return <Icon className={css({ color, width: 16, height: 16, ...cssIcon })} />;
};
