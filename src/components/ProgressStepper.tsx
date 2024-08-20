interface ProgressStepperProps {
  totalSteps: number;
  step: number;
}

const ProgressStepper = ({ totalSteps, step }: ProgressStepperProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = index + 1 < step;
        const isActive = index + 1 === step;
        return (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: isCompleted || isActive ? '#8A2BE2' : '#333',
                color: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
              }}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                style={{
                  width: 40,
                  height: 2,
                  backgroundColor: isCompleted ? '#8A2BE2' : '#333',
                  margin: '0 10px',
                }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressStepper;
