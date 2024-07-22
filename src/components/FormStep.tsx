import styles from './FormStep.module.scss';

interface FormStepProps {
  question: string;
  bubbleText?: string;
  description?: string;
  options: string[] | object[];
  name: string;
  value: string | { id: number; text: string } | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReasonTextChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormStep = ({
  question,
  bubbleText,
  description,
  options,
  name,
  value,
  onChange,
  onReasonTextChange,
}: FormStepProps) => {
  return (
    <div>
      <div className={styles.textWrapper}>
        <h2 className={styles.question}>
          {question}
          {bubbleText && <span className={styles.bubble}>이제 다 왔어요!</span>}
        </h2>
        {description && <p>{description}</p>}
      </div>
      <div className={styles.customFormWrapper}>
        {options.map((option, index) => {
          const isObject = typeof option === 'object';
          const optionValue = typeof option === 'object' ? option.id : option;
          const optionText = typeof option === 'object' ? option.text : option;
          const isChecked = typeof value === 'object' ? value && value.id === option.id : value === option;

          return (
            <div key={index}>
              <label>
                <div>
                  <div>
                    <i className={'icon icon-close'} />
                  </div>
                  <span>돈</span>
                </div>
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
    </div>
  );
};

export default FormStep;
