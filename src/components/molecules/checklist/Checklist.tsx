import ButtonMedium from '@repo/components/atoms/buttons/ButtonMedium';
import { LeftArrow, RightArrow } from '@repo/components/atoms/icons';
import { css, cx } from '../../../../styled-system/css';
import ChecklistCell from './ChecklistCell';

interface ChecklistProps {
  isExpanded: boolean;
  className: string;
  onToggle: () => void;
  onSubmitForApproval?: () => void;
  isSubmitting?: boolean;
  courseDetails?: {
    duration: boolean;
    description: boolean;
    maxStudents: boolean;
    location: boolean;
    allComplete: boolean;
  };
  objectives?: {
    minimumCount: boolean;
    contentQuality: boolean;
    properNumbering: boolean;
    allComplete: boolean;
  };
  credentials?: {
    exists: boolean;
    meetsLength: boolean;
    allComplete: boolean;
  };
  materials?: {
    minimumCount: boolean;
    validUrls: boolean;
    allComplete: boolean;
  };
  timeslots?: {
    minimumCount: boolean;
    validSlots: boolean;
    allComplete: boolean;
  };
}

export default function Checklist({
  isExpanded,
  className,
  onToggle,
  onSubmitForApproval,
  isSubmitting = false,
  courseDetails = {
    duration: false,
    description: false,
    maxStudents: false,
    location: false,
    allComplete: false,
  },
  objectives = {
    minimumCount: false,
    contentQuality: false,
    properNumbering: false,
    allComplete: false,
  },
  credentials = {
    exists: false,
    meetsLength: false,
    allComplete: false,
  },
  materials = {
    minimumCount: false,
    validUrls: false,
    allComplete: false,
  },
  timeslots = {
    minimumCount: false,
    validSlots: false,
    allComplete: false,
  },
}: ChecklistProps) {
  const Icon = isExpanded ? RightArrow : LeftArrow;

  // Check if all items are complete
  const isAllComplete =
    courseDetails.allComplete &&
    objectives.allComplete &&
    credentials.allComplete &&
    materials.allComplete &&
    timeslots.allComplete;

  return (
    <div
      style={
        {
          '--pulse-duration': '2s',
        } as React.CSSProperties
      }
      className={cx(
        css({
          maxW: isExpanded ? '320px' : '64px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px',
          padding: '24px 16px',
          borderWidth: '1px',
          borderRadius: '20px',
          backdropFilter: 'auto',
          backdropBlur: '2px',
          zIndex: 9000,
          transition: 'all 0.3s ease-in-out',
          bg:
            isAllComplete && !isExpanded
              ? 'green5'
              : isAllComplete
                ? 'black50'
                : 'black50',
          borderColor:
            isAllComplete && !isExpanded
              ? 'green20'
              : isAllComplete
                ? 'green20'
                : 'yellow20',
          _hover:
            isAllComplete && !isExpanded
              ? {
                  bg: 'green10',
                  borderColor: 'green100',
                }
              : undefined,
        }),
        className
      )}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          gap: '24px',
          justifyContent: isExpanded ? 'space-between' : 'center',
          alignItems: 'flex-start',
        })}
      >
        {isExpanded && (
          <div className={css({ display: 'flex', flexDirection: 'column' })}>
            <div
              className={css({
                textStyle: 'subheading4',
                color: isAllComplete ? 'green100' : 'yellow100',
              })}
            >
              Course Details Checklist
            </div>
            <div
              className={css({
                textStyle: 'paragraph1',
                color: isAllComplete ? 'green80' : 'yellow50',
              })}
            >
              {isAllComplete
                ? 'All requirements met! You can now submit your course for approval.'
                : 'Fill up the details for the course to complete this step.'}
            </div>
          </div>
        )}
        <div onClick={onToggle}>
          <Icon
            className={css({
              w: '24px',
              h: '24px',
              fill: isAllComplete ? 'green100' : 'yellow100',
              transform: 'scale(1)',
              transition: 'all 0.2s ease-in-out',
              cursor: 'pointer',
              opacity: 0.5,
              _hover: {
                transform: 'scale(1.1)',
                opacity: 1,
              },
            })}
          />
        </div>
      </div>
      {isExpanded ? (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            w: '100%',
          })}
        >
          <ChecklistCell
            title="Add description & duration"
            isExpanded={isExpanded}
            isCompleted={courseDetails.duration && courseDetails.description}
            isAllComplete={isAllComplete}
          />
          <ChecklistCell
            title="Add timeslots"
            isExpanded={isExpanded}
            isCompleted={timeslots.allComplete}
            isAllComplete={isAllComplete}
          />
          <ChecklistCell
            title="Add objectives"
            isExpanded={isExpanded}
            isCompleted={objectives.allComplete}
            isAllComplete={isAllComplete}
          />
          <ChecklistCell
            title="Add credentials & experience"
            isExpanded={isExpanded}
            isCompleted={credentials.allComplete}
            isAllComplete={isAllComplete}
          />
          <ChecklistCell
            title="Add materials"
            isExpanded={isExpanded}
            isCompleted={materials.allComplete}
            isAllComplete={isAllComplete}
          />
          {isAllComplete && (
            <ButtonMedium
              className={css({
                w: '100%',
                mt: '8px',
                bg: 'green5',
                color: 'green100',
                borderWidth: '1px',
                borderColor: 'green20',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease-in-out',
                _hover: !isSubmitting
                  ? {
                      bg: 'green10',
                      borderColor: 'green100',
                    }
                  : undefined,
              })}
              onClick={() => {
                if (!isSubmitting && onSubmitForApproval) {
                  onSubmitForApproval();
                }
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
              <RightArrow
                className={css({
                  w: '24px',
                  h: '24px',
                  fill: 'green100',
                })}
              />
            </ButtonMedium>
          )}
        </div>
      ) : (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            mt: '16px',
          })}
        >
          <ChecklistCell
            title="Add description & duration"
            isExpanded={isExpanded}
            isCompleted={courseDetails.duration && courseDetails.description}
            isAllComplete={isAllComplete}
          />
          <ChecklistCell
            title="Add timeslots"
            isExpanded={isExpanded}
            isCompleted={timeslots.allComplete}
            isAllComplete={isAllComplete}
          />
          <ChecklistCell
            title="Add objectives"
            isExpanded={isExpanded}
            isCompleted={objectives.allComplete}
            isAllComplete={isAllComplete}
          />
          <ChecklistCell
            title="Add credentials & experience"
            isExpanded={isExpanded}
            isCompleted={credentials.allComplete}
            isAllComplete={isAllComplete}
          />
          <ChecklistCell
            title="Add materials"
            isExpanded={isExpanded}
            isCompleted={materials.allComplete}
            isAllComplete={isAllComplete}
          />
        </div>
      )}
    </div>
  );
}
