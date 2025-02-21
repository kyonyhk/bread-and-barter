'use client';

import ButtonMedium from '@repo/components/atoms/buttons/ButtonMedium';
import { LeftArrow, RightArrow } from '@repo/components/atoms/icons';
import Input from '@repo/components/atoms/input/Input';
import { useRouter } from 'next/navigation';
import { css } from '../../../../../styled-system/css';
import { useTeachForm } from '../../context/TeachFormContext';

export function Step3Form() {
  const router = useRouter();
  const { formData, updateFormData } = useTeachForm();

  const handleBack = () => {
    router.push('/teach/2');
  };

  const handleNext = () => {
    // Add validation here
    router.push('/teach/4');
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '120px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        })}
      >
        <div>
          <div className={css({ textStyle: 'subheading1' })}>
            Good, now let's add your first lesson.
          </div>
          <div
            className={css({
              textStyle: 'subheading4',
              color: 'yellow50',
              mt: '8px',
            })}
          >
            You can add more lessons at a later time.
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
              bg: 'yellow10',
              borderColor: 'yellow20',
              borderWidth: '1px',
              borderRadius: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textStyle: 'subheading4',
              color: 'yellow50',
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
                bg: 'yellow20',
                borderColor: 'yellow20',
                borderWidth: '1px',
                borderRadius: '20px',
                color: 'yellow100',
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
                bg: 'yellow20',
                borderColor: 'yellow20',
                borderWidth: '1px',
                borderRadius: '20px',
                color: 'yellow100',
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
                bg: 'yellow20',
                borderColor: 'yellow20',
                borderWidth: '1px',
                borderRadius: '20px',
                color: 'yellow100',
                textStyle: 'subheading5',
              })}
            >
              Lessons
            </div>
          </div>
        </div>

        <Input
          label="Lesson Name"
          value={formData.lessonName}
          onChange={(e) => updateFormData({ lessonName: e.target.value })}
          placeholder="Enter lesson name"
        />

        <Input
          label="Lesson Fees"
          value={formData.lessonFees}
          onChange={(e) => updateFormData({ lessonFees: e.target.value })}
          placeholder="Enter lesson fees"
          type="number"
        />
      </div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          justifyContent: 'flex-end',
          mt: '16px',
        })}
      >
        <ButtonMedium onClick={handleBack} variant="yellow">
          <LeftArrow
            className={css({ fill: 'yellow100', h: '24px', w: '24px' })}
          />
          Back
        </ButtonMedium>
        <ButtonMedium onClick={handleNext}>
          Next
          <RightArrow
            className={css({ fill: 'yellow100', h: '24px', w: '24px' })}
          />
        </ButtonMedium>
      </div>
    </div>
  );
}
