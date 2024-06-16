'use client';

import { useState } from 'react';
import { css, cx } from 'styled-system/css';

interface CourseSelectionTileProps {
  courseNumber: number;
  courseName: string;
  price: number;
}

export default function CourseSelectionTile({
  courseNumber,
  courseName,
  price,
}: CourseSelectionTileProps) {
  const [isClicked, setIsClicked] = useState(false);

  console.log(isClicked);

  const handleClick = () => {
    setIsClicked(!isClicked);
    console.log(isClicked);
  };

  const formattedCourseNumber = courseNumber.toString().padStart(2, '0');

  return (
    <div
      className={cx(
        css({
          w: '220px',
          h: '240px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px 8px',
          borderWidth: '1px',
          borderColor: isClicked ? 'yellow10' : 'yellow20',
          borderRadius: '16px',
          bg: isClicked ? 'yellow100' : 'yellow5',
          cursor: 'pointer',
        }),
        !isClicked &&
          css({
            _hover: {
              bg: 'yellow10',
              borderColor: 'yellow50',
              borderWidth: '2px',
            },
          })
      )}
      onClick={handleClick}
    >
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
          Course {formattedCourseNumber}
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
