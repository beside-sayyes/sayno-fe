import styles from './ProgressStepper.module.scss';

interface ProgressStepperProps {
  totalSteps: number;
  step: number;
}

const ProgressStepper = ({ totalSteps, step }: ProgressStepperProps) => {
  return (
    <div className={styles.ProgressStepperWrapper}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = index + 1 < step; // 지난 단계
        const isActive = index + 1 === step; // 현재 액티브
        return (
          <div key={index} className={styles.stepWrapper}>
            <span key={index} className={`${styles.step} ${isCompleted || isActive ? styles.activeStep : ''}`}>
              {index + 1}
            </span>
            {index < totalSteps - 1 && (
              <div className={`${styles.line} ${isCompleted ? styles.activeLine : ''}`}>
                {Array.from({ length: 4 }).map((_, index) => {
                  return <span key={index} className={styles.stepLineDot} />;
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressStepper;
