import { css, cx } from '../../../../styled-system/css';

export type IconProps = React.SVGProps<SVGSVGElement>;

export const Icon = ({ className, ...props }: IconProps) => (
  <svg {...props} className={cx(css({ height: 16, width: 16 }), className)} />
);

Icon.displayName = `Icon`;
