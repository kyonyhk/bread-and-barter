import { useState } from 'react';
import { css } from 'styled-system/css';
import CourseObjectiveTile from './CourseObjectiveTile';
import EditObjectives from './EditObjectives';

interface CourseObjectivesProps {
  objectives: string;
  isEditing: boolean;
  onSave: (data: { objective: string }) => void;
  onCancel: () => void;
}

const CourseObjectives = ({
  objectives,
  isEditing,
  onSave,
  onCancel,
}: CourseObjectivesProps) => {
  const [currentObjective, setCurrentObjective] = useState('');
  const [isEditingCourseObjectives, setIsEditingCourseObjectives] =
    useState(isEditing);

  const toggleCourseObjectivesEdit = () => {
    setIsEditingCourseObjectives(!isEditingCourseObjectives);
  };

  return (
    <div
      className={css({ display: 'flex', flexDirection: 'column', gap: '24px' })}
    >
      <EditObjectives
        objectiveNo="Objective 01"
        objective={currentObjective}
        isEditing={isEditingCourseObjectives}
        onSave={() => onSave({ objective: currentObjective })}
        onCancel={onCancel}
      />
      <div
        className={css({ display: 'flex', flexDirection: 'row', gap: '8px' })}
      >
        <CourseObjectiveTile
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
        />
      </div>
    </div>
  );
};

export default CourseObjectives;
