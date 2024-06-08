import { css, cx } from '../../../../styled-system/css';
import { IconName, IconWrapper } from './iconWrapper';

interface IconButtonProps {
  icon: IconName;
  onClick?: () => void;
}

const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <button
      className={cx(
        css({
          padding: '8px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
        })
      )}
      onClick={onClick}
    >
      <IconWrapper name={icon} />
    </button>
  );
};

export default IconButton;
