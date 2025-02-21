import {
  Cancel,
  Check,
  DownArrow,
  Edit,
  UpArrow,
} from '@repo/components/atoms/icons';
import Tag from '@repo/components/atoms/tags/Tag';
import React, { useState } from 'react';
import { css } from '../../../../styled-system/css';
import { HStack } from '../../../../styled-system/jsx';
import EditActions from '../edit-actions/EditActions';

interface CourseAccordionProps {
  title: string;
  initialExpanded: boolean;
  isEditing: boolean;
  onEdit?: () => void;
  onSave?: () => void | Promise<void>;
  onCancel?: () => void;
  isSaved?: boolean;
  isCancelled?: boolean;
  noBorder?: boolean;
  hasChanges?: boolean;
  isLoading?: boolean;
  error?: string | null;
  children: React.ReactNode;
}

const CourseAccordion = ({
  title,
  initialExpanded,
  children,
  onEdit,
  onSave,
  onCancel,
  isEditing,
  isSaved,
  isCancelled,
  noBorder = false,
  hasChanges = false,
  isLoading = false,
  error = null,
}: CourseAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={css({
        w: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: noBorder ? '0px' : '24px',
        borderWidth: noBorder ? '0px' : '1px',
        borderColor: isExpanded ? 'yellow10' : 'yellow10',
        borderRadius: noBorder ? '0px' : '40px',
        bg: noBorder ? 'transparent' : isExpanded ? 'yellow5' : 'transparent',
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
          {!isEditing && isExpanded && onEdit && (
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
            <Tag variant="green">
              Changes Saved
              <Check
                className={css({
                  stroke: 'green100',
                  w: '16px',
                  h: '16px',
                })}
              />
            </Tag>
          )}
          {isCancelled && (
            <Tag variant="red">
              Changes Discarded
              <Cancel
                className={css({
                  stroke: 'red100',
                  w: '16px',
                  h: '16px',
                })}
              />
            </Tag>
          )}
          {isLoading && <Tag variant="yellow">Saving...</Tag>}
          {error && (
            <Tag variant="red">
              {error}
              <Cancel
                className={css({
                  stroke: 'red100',
                  w: '16px',
                  h: '16px',
                })}
              />
            </Tag>
          )}
        </div>
        {isEditing ? (
          <Tag>Editing</Tag>
        ) : (
          !noBorder &&
          (isExpanded ? (
            <UpArrow
              className={css({
                fill: 'yellow50',
                w: '24px',
                h: '24px',
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
                w: '24px',
                h: '24px',
                cursor: 'pointer',
                _hover: {
                  scale: 1.2,
                  fill: 'yellow100',
                },
              })}
              onClick={toggleAccordion}
            />
          ))
        )}
      </HStack>
      {isExpanded && (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            w: '100%',
          })}
        >
          {children}
          {isEditing && onSave && onCancel && (
            <EditActions
              onSave={onSave}
              onCancel={onCancel}
              isSaveDisabled={!hasChanges || isLoading}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CourseAccordion;
