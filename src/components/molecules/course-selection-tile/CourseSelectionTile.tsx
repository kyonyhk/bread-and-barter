'use client';

import { Delete } from '@repo/components/atoms/icons';
import { useState } from 'react';
import { css, cx } from '../../../../styled-system/css';

interface CourseSelectionTileProps {
  courseNumber?: number;
  courseName: string;
  price: number;
  isSelected?: boolean;
  onSelect: () => void;
  isEditing?: boolean;
  onDelete?: () => void;
}

export default function CourseSelectionTile({
  courseNumber,
  courseName,
  price,
  isSelected,
  onSelect,
  isEditing = false,
  onDelete,
}: CourseSelectionTileProps) {
  const [isClicked, setIsClicked] = useState(false);

  console.log(isClicked);

  const handleClick = () => {
    setIsClicked(!isClicked);
    console.log(isClicked);
  };

  const formattedCourseNumber = courseNumber
    ? courseNumber.toString().padStart(2, '0')
    : '00';

  return (
    <div
      className={cx(
        css({
          w: '100%',
          h: '240px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px 8px',
          borderWidth: '1px',
          borderColor: isClicked ? 'yellow10' : 'yellow20',
          borderRadius: '16px',
          bg: isSelected ? 'yellow20' : 'yellow5',
          cursor: 'pointer',
          position: 'relative',
          _hover: { borderColor: 'yellow100' },
        }),
        !isClicked &&
          css({
            _hover: {
              bg: 'yellow10',
              borderColor: 'yellow50',
            },
          })
      )}
      onClick={onSelect}
    >
      {isEditing && onDelete && (
        <div
          className={css({
            position: 'absolute',
            top: '8px',
            right: '8px',
            cursor: 'pointer',
            transform: 'scale(1)',
            transition: 'transform 0.2s',
            _hover: { transform: 'scale(1.1)' },
          })}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Delete
            className={css({
              stroke: 'red100',
              w: '20px',
              h: '20px',
            })}
          />
        </div>
      )}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
        })}
      >
        {/* Course Number */}
        <div
          className={css({
            textStyle: 'paragraph3',
            color: isClicked ? 'black' : 'yellow50',
          })}
        >
          COURSE {formattedCourseNumber}
        </div>

        {/* Course Name */}
        <div
          className={css({
            textStyle: 'subheading5',
            color: isClicked ? 'black' : 'yellow100',
            textAlign: 'center',
          })}
        >
          {courseName}
        </div>
      </div>

      {/* Price */}
      <div
        className={css({
          textStyle: 'subheading4',
          color: isClicked ? 'black' : 'yellow80',
        })}
      >
        SGD {price}
      </div>
    </div>
  );
}
