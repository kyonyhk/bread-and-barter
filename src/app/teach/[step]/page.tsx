'use client';

import { css } from '../../../../styled-system/css';
import { StepIndicator } from '../components/StepIndicator';
import { Step1Form } from '../components/forms/Step1Form';
import { Step2Form } from '../components/forms/Step2Form';
import { Step3Form } from '../components/forms/Step3Form';
import { Step4Form } from '../components/forms/Step4Form';
import { TeachFormProvider } from '../context/TeachFormContext';

export default function TeachStepPage({
  params,
}: {
  params: { step: string };
}) {
  const step = parseInt(params.step);

  return (
    <TeachFormProvider>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <StepIndicator currentStep={step} totalSteps={4} />
        {step === 1 && <Step1Form />}
        {step === 2 && <Step2Form />}
        {step === 3 && <Step3Form />}
        {step === 4 && <Step4Form />}
      </div>
    </TeachFormProvider>
  );
}
