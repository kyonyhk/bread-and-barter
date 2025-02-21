import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import TileButton from '@repo/components/atoms/buttons/TileButton';
import { Divider } from '@repo/components/atoms/divider';
import { Plus } from '@repo/components/atoms/icons';
import TextArea from '@repo/components/atoms/textarea/TextArea';
import { OnStateChangeHandler } from '@repo/types/courseSection';
import { useEffect, useState } from 'react';
import { css } from '../../../../styled-system/css';
import CourseObjectiveTile from './CourseObjectiveTile';

interface CourseObjectivesProps {
  initialObjectives: string[];
  isEditing: boolean;
  onObjectivesChange?: OnStateChangeHandler<string[]>;
  onEdit?: () => void;
}

const CourseObjectives = ({
  initialObjectives,
  isEditing,
  onObjectivesChange,
  onEdit,
}: CourseObjectivesProps) => {
  const [objectives, setObjectives] = useState<string[]>(initialObjectives);
  const [selectedObjectiveIndex, setSelectedObjectiveIndex] = useState<
    number | null
  >(null);
  const [editingObjectiveText, setEditingObjectiveText] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newObjectiveText, setNewObjectiveText] = useState('');

  // Update objectives when initialObjectives changes and we're not editing
  useEffect(() => {
    if (!isEditing) {
      setObjectives(initialObjectives);
      setSelectedObjectiveIndex(null);
      setEditingObjectiveText('');
      setIsAddingNew(false);
      setNewObjectiveText('');
    }
  }, [initialObjectives, isEditing]);

  // Reset editing state when editing mode changes
  useEffect(() => {
    if (!isEditing) {
      setSelectedObjectiveIndex(null);
      setEditingObjectiveText('');
      setIsAddingNew(false);
      setNewObjectiveText('');
      setObjectives(initialObjectives);
    }
  }, [isEditing, initialObjectives]);

  const notifyParentOfChanges = (newObjectives: string[]) => {
    if (onObjectivesChange && isEditing) {
      onObjectivesChange(newObjectives);
    }
  };

  const handleObjectiveSelect = (index: number) => {
    setSelectedObjectiveIndex(index);
    setEditingObjectiveText(objectives[index]);
    setIsAddingNew(false);
  };

  const handleObjectiveDelete = (index: number) => {
    const updatedObjectives = objectives.filter((_, i) => i !== index);
    setObjectives(updatedObjectives);
    notifyParentOfChanges(updatedObjectives);
    if (selectedObjectiveIndex === index) {
      setSelectedObjectiveIndex(null);
      setEditingObjectiveText('');
    }
  };

  const handleAddClick = () => {
    setIsAddingNew(true);
    setSelectedObjectiveIndex(null);
    setEditingObjectiveText('');
    setNewObjectiveText('');
  };

  const handleEditingTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditingObjectiveText(e.target.value);
  };

  const handleNewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewObjectiveText(e.target.value);
  };

  const handleUpdateObjective = () => {
    if (selectedObjectiveIndex !== null && editingObjectiveText.trim()) {
      const updatedObjectives = [...objectives];
      updatedObjectives[selectedObjectiveIndex] = editingObjectiveText.trim();
      setObjectives(updatedObjectives);
      notifyParentOfChanges(updatedObjectives);
      setSelectedObjectiveIndex(null);
      setEditingObjectiveText('');
    }
  };

  const handleAddObjective = () => {
    if (newObjectiveText.trim()) {
      const updatedObjectives = [...objectives, newObjectiveText.trim()];
      setObjectives(updatedObjectives);
      notifyParentOfChanges(updatedObjectives);
      setIsAddingNew(false);
      setNewObjectiveText('');
    }
  };

  // Show TileButton in empty state when not editing
  if (!initialObjectives.length && !isEditing) {
    return (
      <TileButton
        title="Add Course Objectives"
        subtitle="Add up to 3 learning objectives for your course"
        className={css({
          borderRadius: '16px',
        })}
        onClick={onEdit}
      />
    );
  }

  const canAddMore = objectives.length < 3;

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        w: '100%',
      })}
    >
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          width: '100%',
        })}
      >
        {objectives.map((objective, index) => (
          <CourseObjectiveTile
            key={index}
            objectiveNumber={index + 1}
            objectiveText={objective}
            isEditing={isEditing}
            onDelete={
              isEditing ? () => handleObjectiveDelete(index) : undefined
            }
            isSelected={selectedObjectiveIndex === index}
            onSelect={
              isEditing ? () => handleObjectiveSelect(index) : undefined
            }
          />
        ))}
      </div>

      {isEditing && (
        <>
          {(selectedObjectiveIndex !== null || isAddingNew) && (
            <Divider backgroundColor="yellow20" />
          )}

          {selectedObjectiveIndex !== null && (
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              })}
            >
              <div
                className={css({ textStyle: 'subheading5', color: 'yellow80' })}
              >
                Edit Objective {selectedObjectiveIndex + 1}
              </div>
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                })}
              >
                <TextArea
                  value={editingObjectiveText}
                  onChange={handleEditingTextChange}
                  placeholder="What would you like your students to learn?"
                  className={css({
                    textStyle: 'paragraph1',
                    color: 'altyellow',
                  })}
                />
                <ButtonLarge
                  onClick={handleUpdateObjective}
                  disabled={!editingObjectiveText.trim()}
                  className={css({ w: '100%' })}
                >
                  Update Objective
                </ButtonLarge>
              </div>
            </div>
          )}

          {isAddingNew && (
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              })}
            >
              <div
                className={css({ textStyle: 'subheading5', color: 'yellow80' })}
              >
                New Objective
              </div>
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                })}
              >
                <TextArea
                  value={newObjectiveText}
                  onChange={handleNewTextChange}
                  placeholder="What would you like your students to learn?"
                  className={css({
                    textStyle: 'paragraph1',
                    color: 'altyellow',
                  })}
                />
                <ButtonLarge
                  onClick={handleAddObjective}
                  disabled={!newObjectiveText.trim()}
                  className={css({ w: '100%' })}
                >
                  Add This Objective
                </ButtonLarge>
              </div>
            </div>
          )}

          {!isAddingNew && canAddMore && (
            <ButtonLarge
              onClick={handleAddClick}
              className={css({ w: '100%' })}
            >
              Add Objective
              <Plus className={css({ fill: 'yellow100' })} />
            </ButtonLarge>
          )}
        </>
      )}
    </div>
  );
};

export default CourseObjectives;
