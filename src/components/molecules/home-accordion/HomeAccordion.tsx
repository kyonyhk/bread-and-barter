import { DownArrow, UpArrow } from '@repo/components/atoms/icons';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

interface HomeAccordionProps {
  title: string;
  children: React.ReactNode;
  initialExpanded?: boolean;
}

const HomeAccordion = ({
  title,
  initialExpanded,
  children,
}: HomeAccordionProps) => {
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
        gap: '25px',
        padding: '25px',
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
          color: 'yellow80',
          textStyle: 'subheading4',
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
        </div>

        {/* Icon */}
        {isExpanded ? (
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
        )}
      </HStack>
      {isExpanded && (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            color: 'yellow50',
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default HomeAccordion;
