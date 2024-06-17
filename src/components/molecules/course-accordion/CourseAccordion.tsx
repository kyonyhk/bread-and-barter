import { DownArrow, Edit, UpArrow } from '@repo/components/atoms/icons';
import Tag from '@repo/components/atoms/tags/Tag';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

interface SaveCourseData {}

interface CourseDetailsSaveData extends SaveCourseData {
  duration: string;
  courseDetails: string;
}

interface CourseObjectivesSaveData extends SaveCourseData {
  objectives: string;
}
interface CredentialsExperienceSaveData extends SaveCourseData {
  experience: string;
}

interface CourseRequirementsSaveData extends SaveCourseData {
  requirements: string;
}

interface CourseAccordionProps<T extends SaveCourseData> {
  title: string;
  children: React.ReactNode;
  initialExpanded: boolean;
  onEdit?: () => void;
  onSave?: (data: T) => void;
  onCancel?: () => void;
  isEditing?: boolean;
  isSaved?: boolean;
  isCancelled?: boolean;
}

const CourseAccordion = <T extends SaveCourseData>({
  title,
  initialExpanded,
  children,
  onEdit,
  onSave,
  onCancel,
  isEditing,
  isSaved,
  isCancelled,
}: CourseAccordionProps<T>) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={css({
        maxW: '720px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
        borderWidth: '1px',
        borderColor: isExpanded ? 'yellow10' : 'yellow10',
        borderRadius: '40px',
        bg: isExpanded ? 'yellow5' : 'transparent',
      })}
    >
      <HStack
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'yellow100',
          textStyle: 'subheading3',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            justifyContent: 'flex-start',
            alignItems: 'center',
          })}
        >
          {title}
          {!isEditing && isExpanded && (
            <Edit
              className={css({
                stroke: 'yellow50',
                height: '23px',
                width: '23px',
                cursor: 'pointer',
                _hover: { stroke: 'yellow100' },
              })}
              onClick={onEdit}
            />
          )}
          {isSaved && (
            <Tag
              color="altgreen"
              backgroundColor="green50"
              borderColor="green50"
            >
              Changes Saved
            </Tag>
          )}
          {isCancelled && (
            <Tag color="altred" backgroundColor="red50" borderColor="red50">
              Changes Discarded
            </Tag>
          )}
        </div>
        {isEditing ? (
          <Tag>Editing</Tag>
        ) : isExpanded ? (
          <UpArrow
            className={css({
              fill: 'yellow50',
              w: '23px',
              h: '23px',
              cursor: 'pointer',
              _hover: {
                scale: 1.2,
                fill: 'yellow100',
              },
            })}
            onClick={toggleAccordion}
          />
        ) : (
          <DownArrow
            className={css({
              fill: 'yellow100',
              w: '23px',
              h: '23px',
              cursor: 'pointer',
              _hover: {
                scale: 1.2,
                fill: 'yellow100',
              },
            })}
            onClick={toggleAccordion}
          />
        )}
      </HStack>
      {isExpanded && (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default CourseAccordion;
