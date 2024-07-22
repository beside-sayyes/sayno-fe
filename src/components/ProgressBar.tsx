import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  step: number;
  stepText: string;
  totalSteps: number;
}

const ProgressBar = ({ step, stepText, totalSteps }: ProgressBarProps) => {
  return (
    <div>
      <div className={styles.stepTextWrapper}>
        <p className={styles.stepText}>{stepText}</p>
        <p className={styles.stepNumber}>
          {step}/{totalSteps}
        </p>
      </div>
      <div className={styles.progressBar}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className={`${styles.progressSegment} ${index < step ? styles['filled'] : ''}`} />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
