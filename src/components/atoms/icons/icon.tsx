import React from 'react';
import { css, cx } from '../../../../styled-system/css';

export type IconProps = React.SVGProps<SVGSVGElement>;

export const Icon = ({ className, ...props }: IconProps) => (
  <svg
    {...props}
    className={cx(css({ height: '24px', width: '24px' }), className)}
  />
);

Icon.displayName = `Icon`;
