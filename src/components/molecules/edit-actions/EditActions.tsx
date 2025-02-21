import { Cancel, Save } from '@repo/components/atoms/icons';
import { css } from '../../../../styled-system/css';

interface EditActionsProps {
  onSave: () => void;
  onCancel: () => void;
  isSaveDisabled?: boolean;
}

const EditActions: React.FC<EditActionsProps> = ({
  onSave,
  onCancel,
  isSaveDisabled = false,
}) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'stretch',
        w: '100%',
      })}
    >
      <button
        onClick={onCancel}
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          h: '40px',
          px: '24px',
          textStyle: 'paragraph1',
          transition: 'all 0.2s ease-in-out',
          borderWidth: '1px',
          borderRadius: '20px',
          color: 'red100',
          bg: 'red5',
          borderColor: 'red20',
          cursor: 'pointer',
          _hover: {
            bg: 'red10',
            borderColor: 'red50',
          },
          _active: {
            bg: 'red80',
            color: 'altred',
          },
        })}
      >
        Cancel
        <Cancel className={css({ stroke: 'red100', w: '20px', h: '20px' })} />
      </button>
      {/* <button
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          h: '40px',
          px: '24px',
          textStyle: 'paragraph1',
          transition: 'all 0.2s ease-in-out',
          borderWidth: '1px',
          borderRadius: '20px',
          color: 'yellow100',
          bg: 'yellow5',
          borderColor: 'yellow20',
          cursor: 'pointer',
          _hover: {
            bg: 'yellow10',
            borderColor: 'yellow50',
          },
          _active: {
            bg: 'yellow80',
            color: 'altyellow',
          },
        })}
      >
        Preview
        <Preview
          className={css({
            fill: 'yellow20',
            stroke: 'yellow100',
            h: '20px',
            w: '20px',
          })}
        />
      </button> */}
      <button
        onClick={onSave}
        disabled={isSaveDisabled}
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          h: '40px',
          px: '24px',
          textStyle: 'paragraph1',
          transition: 'all 0.2s ease-in-out',
          borderWidth: '1px',
          borderRadius: '20px',
          color: isSaveDisabled ? 'green20' : 'green100',
          bg: 'green5',
          borderColor: isSaveDisabled ? 'green10' : 'green20',
          cursor: isSaveDisabled ? 'not-allowed' : 'pointer',
          _hover: isSaveDisabled
            ? {}
            : {
                bg: 'green10',
                borderColor: 'green50',
              },
          _active: isSaveDisabled
            ? {}
            : {
                bg: 'green80',
                color: 'altgreen',
              },
        })}
      >
        Save
        <Save
          className={css({
            fill: isSaveDisabled ? 'green20' : 'green100',
            w: '20px',
            h: '20px',
          })}
        />
      </button>
    </div>
  );
};

export default EditActions;
