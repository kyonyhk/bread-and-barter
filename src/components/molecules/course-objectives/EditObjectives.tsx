import ButtonNoBorder from '@repo/components/atoms/buttons/ButtonNoBorder';
import Divider from '@repo/components/atoms/divider/Divider';
import { Plus } from '@repo/components/atoms/icons';
import TextArea from '@repo/components/atoms/textarea/TextArea';
import { useState } from 'react';
import { css } from 'styled-system/css';
import EditActions from '../edit-actions/EditActions';

interface EditObjectiveProps {
  objectiveNo: string;
  objective: string;
  isEditing: boolean;
  onSave: (data: { objective: string }) => void;
  onCancel: () => void;
}

const EditObjectives = ({
  objectiveNo,
  objective,
  isEditing,
  onSave,
  onCancel,
}: EditObjectiveProps) => {
  const [currentObjective, setCurrentObjective] = useState(objective);

  return (
    <div
      className={css({ display: 'flex', flexDirection: 'column', gap: '24px' })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        })}
      >
        <ButtonNoBorder>
          <Plus
            className={css({
              stroke: 'yellow100',
              fill: 'yellow100',
              w: '24px',
              h: '24px',
            })}
          />
          Add Objective
        </ButtonNoBorder>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <div className={css({ textStyle: 'subheading5', color: 'yellow80' })}>
          {objectiveNo}
        </div>
        <TextArea
          value={currentObjective}
          placeholder="What would you like your students to learn?"
          onChange={(e) => setCurrentObjective(e.target.value)}
          className={css({ textStyle: 'paragraph1', color: 'altyellow' })}
        />
        <EditActions
          onSave={() => onSave({ objective: currentObjective })}
          onCancel={onCancel}
        />
      </div>
      <Divider />
    </div>
  );
};

export default EditObjectives;
