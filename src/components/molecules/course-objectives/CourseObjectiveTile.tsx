import { css } from 'styled-system/css';

interface ObjectiveTileProps {
  objectiveNumber: number;
  objectiveText: string;
}

export default function CourseObjectiveTile({
  objectiveNumber,
  objectiveText,
}: ObjectiveTileProps) {
  const formattedObjectiveNumber = objectiveNumber.toString().padStart(2, '0');

  return (
    <div
      className={css({
        w: '220px',
        h: '240px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '8px',
        padding: '16px 8px',
        borderWidth: '1px',
        borderColor: 'yellow20',
        borderRadius: '16px',
        bg: 'yellow5',
        position: 'relative',
      })}
    >
      <div className={css({ textStyle: 'paragraph2', color: 'yellow50' })}>
        Objective {formattedObjectiveNumber}
      </div>
      <div className={css({ textStyle: 'subheading5', color: 'yellow80' })}>
        {objectiveText}
      </div>
      <div
        className={css({
          bottom: '8px',
          right: '8px',
          position: 'absolute',
          textStyle: 'heading1',
          color: 'yellow10',
          // color: 'transparent',
          WebkitTextStrokeWidth: '1px',
          // WebkitTextStrokeColor: 'yellow10',
          // WebkitTextFillColor: 'yellow20',
        })}
      >
        {formattedObjectiveNumber}
      </div>
    </div>
  );
}
