interface FormStepProps {
  question: string;
  options: string[];
  name: string;
  value: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormStep = ({ question, options, name, value, onChange }: FormStepProps) => {
  return (
    <div>
      <h2>{question}</h2>
      {options.map((option, index) => {
        return (
          <label key={index}>
            <input type='radio' name={name} value={option} checked={value === option} onChange={onChange} />
            {option}
          </label>
        );
      })}
    </div>
  );
};

export default FormStep;
