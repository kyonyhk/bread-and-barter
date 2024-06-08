import { DownArrow, Edit, UpArrow } from '@repo/components/atoms/icons';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

interface CourseAccordionProps {
  title: string;
  children: React.ReactNode;
  initialExpanded?: boolean;
}

const CourseAccordion = ({
  title,
  initialExpanded,
  children,
}: CourseAccordionProps) => {
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
          <Edit
            className={css({
              stroke: 'yellow50',
              height: '23px',
              width: '23px',
              cursor: 'pointer',
              _hover: { stroke: 'yellow100' },
            })}
          />
        </div>
        {isExpanded ? (
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
        {/* <IconWrapper
          name={isExpanded ? 'UpArrow' : 'DownArrow'}
          cssIcon={{ fill: 'yellow100', width: '24px', height: '24px' }}
        /> */}
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
