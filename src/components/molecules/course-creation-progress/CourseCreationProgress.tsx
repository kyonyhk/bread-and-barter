import { useAuth } from '@repo/app/auth/AuthContext';
import ProgressCell from '@repo/components/molecules/course-creation-progress/ProgressCell';
import { css } from '../../../../styled-system/css';

interface CourseCreationProgressProps {
  currentStep: number;
  checklistProgress: {
    step1Completed: boolean;
    step2Completed: boolean;
    step3Completed: boolean;
  };
  teacherId?: string;
}

export default function CourseCreationProgress({
  currentStep,
  checklistProgress,
  teacherId,
}: CourseCreationProgressProps) {
  const { user } = useAuth();

  // Check if user is authorized (teacher or admin)
  const isAuthorized =
    user && (user.id === teacherId || user.user_metadata?.is_admin === true);

  // Don't render anything if user is not authorized
  if (!isAuthorized) {
    return null;
  }

  const steps = [
    {
      number: 1,
      title: 'Create Course & Lessons',
      isCompleted: checklistProgress.step1Completed,
    },
    {
      number: 2,
      title: 'Fill Up Course Details',
      isCompleted: checklistProgress.step2Completed,
    },
    {
      number: 3,
      title: 'Course & Lessons Approval',
      isCompleted: checklistProgress.step3Completed,
    },
  ];

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 0px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '40px',
        borderWidth: '1px',
        borderColor: 'yellow20',
        bg: 'yellow5',
        gap: '24px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          })}
        >
          <div
            className={css({
              textStyle: 'subheading3',
              color: 'yellow100',
              textAlign: 'center',
            })}
          >
            Course Creation Progress
          </div>
          <div
            className={css({
              textStyle: 'paragraph1',
              color: 'yellow50',
              textAlign: 'center',
            })}
          >
            {currentStep === 1 &&
              'Create your course and add lessons to get started.'}
            {currentStep === 2 &&
              "Great, now that you have created the course and lessons, it's time to add in the details."}
            {currentStep === 3 &&
              'Almost there! Submit your course for approval.'}
          </div>
        </div>
      </div>
      <div
        className={css({ display: 'flex', flexDirection: 'row', gap: '40px' })}
      >
        {steps.map((step) => (
          <ProgressCell
            key={step.number}
            stepNumber={step.number}
            title={step.title}
            isActive={currentStep === step.number}
            isCompleted={step.isCompleted}
          />
        ))}
      </div>
    </div>
  );
}
