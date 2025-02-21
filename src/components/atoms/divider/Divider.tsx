import { css } from '../../../../styled-system/css';

interface DividerProps {
  backgroundColor?: string;
}

export const Divider = ({ backgroundColor }: DividerProps) => {
  return (
    <div
      className={css({
        width: '100%',
        height: '1px',
        backgroundColor: 'yellow20',
      })}
    />
  );
};
