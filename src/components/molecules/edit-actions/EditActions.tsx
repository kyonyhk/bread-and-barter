import ButtonMedium from '@repo/components/atoms/buttons/ButtonMedium';
import { Cancel, Preview, Save } from '@repo/components/atoms/icons';
import { css } from 'styled-system/css';

interface EditActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

const EditActions: React.FC<EditActionsProps> = ({ onSave, onCancel }) => {
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
      <ButtonMedium
        onClick={onCancel}
        color="red100"
        backgroundColor="red5"
        borderColor="red20"
        hoverColor="red100"
        hoverBackgroundColor="red10"
        hoverBorderColor="red50"
        activeColor="altred"
        activeBackgroundColor="red80"
        activeBorderColor="red100"
      >
        Cancel
        <Cancel className={css({ stroke: 'red100', w: '20px', h: '20px' })} />
      </ButtonMedium>
      <ButtonMedium
        color="yellow100"
        backgroundColor="yellow5"
        borderColor="yellow20"
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
      </ButtonMedium>
      <ButtonMedium
        onClick={onSave}
        color="green100"
        backgroundColor="green5"
        borderColor="green20"
        hoverColor="green100"
        hoverBackgroundColor="green10"
        hoverBorderColor="green50"
        activeColor="altgreen"
        activeBackgroundColor="green80"
        activeBorderColor="green100"
      >
        Save
        <Save className={css({ fill: 'green100', w: '20px', h: '20px' })} />
      </ButtonMedium>
    </div>
  );
};

export default EditActions;
