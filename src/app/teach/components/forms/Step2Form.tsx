'use client';

import ButtonMedium from '@repo/components/atoms/buttons/ButtonMedium';
import { LeftArrow, RightArrow } from '@repo/components/atoms/icons';
import Input from '@repo/components/atoms/input/Input';
import { useRouter } from 'next/navigation';
import { css } from '../../../../../styled-system/css';
import { useTeachForm } from '../../context/TeachFormContext';

export function Step2Form() {
  const router = useRouter();
  const { formData, updateFormData } = useTeachForm();

  const handleBack = () => {
    router.push('/teach/1');
  };

  const handleNext = () => {
    // Add validation here
    router.push('/teach/3');
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '120px',
        h: '100%',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          h: '100%',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          })}
        >
          <div className={css({ textStyle: 'subheading1' })}>
            What will you be teaching?
          </div>
          <div
            className={css({
              textStyle: 'subheading4',
              color: 'yellow50',
            })}
          >
            Curriculum is structured based on courses and lessons. You can have
            multiple lessons in a course.
          </div>
        </div>

        <div
          className={css({
            display: 'flex ',
            flexDirection: 'row',
            gap: '16px',
            w: '100%',
            h: '320px',
          })}
        >
          <div
            className={css({
              w: '100%',
              bg: 'yellow20',
              borderColor: 'yellow20',
              borderWidth: '1px',
              borderRadius: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textStyle: 'subheading4',
              color: 'yellow100',
            })}
          >
            Courses
          </div>
          <div
            className={css({
              w: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            })}
          >
            <div
              className={css({
                w: '100%',
                h: '100%',
                display: 'flex',
                justifyContent: ' center',
                alignItems: 'center',
                bg: 'yellow10',
                borderColor: 'yellow20',
                borderWidth: '1px',
                borderRadius: '20px',
                color: 'yellow50',
                textStyle: 'subheading5',
              })}
            >
              Lessons
            </div>
            <div
              className={css({
                w: '100%',
                h: '100%',
                display: 'flex',
                justifyContent: ' center',
                alignItems: 'center',
                bg: 'yellow10',
                borderColor: 'yellow20',
                borderWidth: '1px',
                borderRadius: '20px',
                color: 'yellow50',
                textStyle: 'subheading5',
              })}
            >
              Lessons
            </div>
            <div
              className={css({
                w: '100%',
                h: '100%',
                display: 'flex',
                justifyContent: ' center',
                alignItems: 'center',
                bg: 'yellow10',
                borderColor: 'yellow20',
                borderWidth: '1px',
                borderRadius: '20px',
                color: 'yellow50',
                textStyle: 'subheading5',
              })}
            >
              Lessons
            </div>
          </div>
        </div>

        <Input
          label="Course Name"
          value={formData.courseName}
          onChange={(e) => updateFormData({ courseName: e.target.value })}
          placeholder="Enter course name"
        />
      </div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          justifyContent: 'flex-end',
        })}
      >
        <ButtonMedium onClick={handleBack} variant="yellow">
          <LeftArrow
            className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
          />
          Back
        </ButtonMedium>
        <ButtonMedium onClick={handleNext}>
          Next
          <RightArrow
            className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
          />
        </ButtonMedium>
      </div>
    </div>
  );
}
