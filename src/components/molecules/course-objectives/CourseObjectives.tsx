import { useState } from 'react';
import { css } from 'styled-system/css';
import CourseObjectiveTile from './CourseObjectiveTile';
import EditObjectives from './EditObjectives';

interface CourseObjectivesProps {
  initialObjectives: string[];
  isEditing: boolean;
  onSave: (data: string[]) => void;
  onCancel: () => void;
}

const CourseObjectives = ({
  initialObjectives,
  isEditing,
  onSave,
  onCancel,
}: CourseObjectivesProps) => {
  const [objectives, setObjectives] = useState<string[]>(initialObjectives);
  const [currentObjective, setCurrentObjective] = useState<string>('');
  const [isEditingCourseObjectives, setIsEditingCourseObjectives] =
    useState(isEditing);

  // git

  const toggleCourseObjectivesEdit = () => {
    setIsEditingCourseObjectives(!isEditingCourseObjectives);
  };

  const handleAddObjective = () => {
    if (objectives.length < 3) {
      setObjectives([...objectives, '']);
      setIsEditingCourseObjectives(true);
    }
  };

  const handleSaveObjective = (index: number, objective: string) => {
    const updatedObjectives = [...objectives];
    updatedObjectives[index] = objective;
    setObjectives(updatedObjectives);
    setIsEditingCourseObjectives(false);
    onSave(updatedObjectives);
  };

  const handleCancelEdit = () => {
    setIsEditingCourseObjectives(false);
    onCancel();
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        w: '100%',
      })}
    >
      {objectives.map((objective, index) => (
        <EditObjectives
          key={index}
          objectiveNo={`Objective ${String(index + 1).padStart(2, '0')}`}
          objective={objective}
          isEditing={isEditing}
          onSave={(data) => handleSaveObjective(index, data.objective)}
          onCancel={handleCancelEdit}
          onAddObjective={handleAddObjective}
          canAddMore={objectives.length < 3}
        />
      ))}
      <div
        className={css({ display: 'flex', flexDirection: 'row', gap: '8px' })}
      >
        {objectives.map((objective, index) => (
          <CourseObjectiveTile
            key={index}
            objectiveNumber={index + 1}
            objectiveText={objective}
          />
        ))}
        {/* <CourseObjectiveTile
          objectiveNumber={1}
          objectiveText="Develop a strong foundation in pottery, including clay preparation and studio safety."
        />
        <CourseObjectiveTile
          objectiveNumber={2}
          objectiveText="Develop a strong foundation in pottery, including clay preparation and studio safety."
        />
        <CourseObjectiveTile
          objectiveNumber={3}
          objectiveText="Develop a strong foundation in pottery, including clay preparation and studio safety."
        /> */}
      </div>
    </div>
  );
};

export default CourseObjectives;
