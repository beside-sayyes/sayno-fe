interface FormStepProps {
  introText?: string;
  question: string;
  description?: string;
  options: string[] | object[];
  name: string;
  value: string | { id: number; text: string } | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReasonTextChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormStep = ({
  introText,
  question,
  description,
  options,
  name,
  value,
  onChange,
  onReasonTextChange,
}: FormStepProps) => {
  return (
    <div>
      {introText && <p>{introText}</p>}
      <h2>{question}</h2>
      {description && <p>{description}</p>}
      {options.map((option, index) => {
        const isObject = typeof option === 'object';
        const optionValue = typeof option === 'object' ? option.id : option;
        const optionText = typeof option === 'object' ? option.text : option;
        const isChecked = typeof value === 'object' ? value && value.id === option.id : value === option;

        return (
          <div key={index}>
            <label>
              <input type='radio' name={name} value={optionValue} checked={isChecked} onChange={onChange} />
              {optionText}
            </label>
            {isObject && optionValue === 1 && isChecked && (
              <textarea
                value={typeof value === 'object' && value.id === 1 ? value.text : ''}
                onChange={onReasonTextChange}
                placeholder='직접 입력하세요'
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FormStep;
