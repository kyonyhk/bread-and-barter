import ButtonNoBorder from '@repo/components/atoms/buttons/ButtonNoBorder';
import { Divider } from '@repo/components/atoms/divider/';
import { Plus } from '@repo/components/atoms/icons';
import TextArea from '@repo/components/atoms/textarea/TextArea';
import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import EditActions from '../edit-actions/EditActions';

interface EditObjectiveProps {
  objectiveNo: string;
  objective: string;
  isEditing: boolean;
  onSave: (data: { objective: string }) => void;
  onCancel: () => void;
  onAddObjective: () => void;
  canAddMore: boolean;
}

const EditObjectives = ({
  objectiveNo,
  objective,
  isEditing,
  onSave,
  onCancel,
  onAddObjective,
  canAddMore,
}: EditObjectiveProps) => {
  const [currentObjective, setCurrentObjective] = useState(objective);

  return isEditing ? (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        w: '100%',
      })}
    >
      <>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          })}
        >
          {canAddMore && (
            <ButtonNoBorder onClick={onAddObjective}>
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
          )}
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
        <Divider backgroundColor="yellow20" />
      </>
    </div>
  ) : null;
};

export default EditObjectives;
