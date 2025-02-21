import { useRouter } from 'next/navigation';
import { css } from '../../../../styled-system/css';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const router = useRouter();

  const handleStepClick = (step: number) => {
    router.push(`/teach/${step}`);
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        mb: '40px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'flex-end',
          gap: '4px',
        })}
      >
        <div className={css({ textStyle: 'heading4', color: 'yellow100' })}>
          {currentStep.toString().padStart(2, '0')}
        </div>
        <div className={css({ textStyle: 'subheading4', color: 'yellow50' })}>
          /
        </div>
        <div className={css({ textStyle: 'subheading4', color: 'yellow50' })}>
          {totalSteps.toString().padStart(2, '0')}
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          h: '8px',
        })}
      >
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            onClick={() => handleStepClick(step)}
            className={css({
              w: '100%',
              h: '100%',
              borderColor: 'yellow20',
              borderWidth: '1px',
              bg: step === currentStep ? 'yellow100' : 'yellow20',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              _hover: {
                bg: step === currentStep ? 'yellow100' : 'yellow50',
              },
            })}
          />
        ))}
      </div>
    </div>
  );
}
