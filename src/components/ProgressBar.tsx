interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar = ({ step, totalSteps }: ProgressBarProps) => {
  return (
    <div>
      {step} / {totalSteps}
    </div>
  );
};

export default ProgressBar;
