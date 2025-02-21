'use client';

import ButtonMedium from '@repo/components/atoms/buttons/ButtonMedium';
import { RightArrow } from '@repo/components/atoms/icons';
import Input from '@repo/components/atoms/input/Input';
import TextArea from '@repo/components/atoms/textarea/TextArea';
import { useRouter } from 'next/navigation';
import { css } from '../../../../../styled-system/css';
import { useTeachForm } from '../../context/TeachFormContext';

export function Step1Form() {
  const router = useRouter();
  const { formData, updateFormData } = useTeachForm();

  const handleNext = () => {
    // Add validation here
    router.push('/teach/2');
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        h: '100%',
        gap: '120px',
      })}
    >
      {/* Main content area */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          h: '100%',
          overflow: 'auto', // Allow scrolling if content is too long
        })}
      >
        <div className={css({ textStyle: 'subheading1' })}>
          Before you begin, your students need to know you better.
        </div>

        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => updateFormData({ firstName: e.target.value })}
        />

        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => updateFormData({ lastName: e.target.value })}
        />

        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flex: '1',
          })}
        >
          <label
            className={css({ textStyle: 'paragraph1', color: 'yellow100' })}
          >
            Tell your students something interesting about yourself!
          </label>
          <TextArea
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            placeholder="What makes you a good teacher?"
          />
        </div>
      </div>

      {/* Button container - fixed at bottom */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        })}
      >
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
