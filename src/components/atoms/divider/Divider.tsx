import { css } from 'styled-system/css';

interface DividerProps {
  backgroundColor?: string;
}

const Divider = ({ backgroundColor = 'yellow20' }: DividerProps) => {
  return (
    <div className={css({ w: '100%', h: '1px', bg: backgroundColor })}></div>
  );
};

export default Divider;
