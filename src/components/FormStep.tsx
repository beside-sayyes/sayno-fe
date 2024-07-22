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
  iconStyle?: boolean;
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
  iconStyle = false,
}: FormStepProps) => {
  return (
    <div>
      <div className={styles.textWrapper}>
        <h2 className={styles.question}>
          {question}
          {bubbleText && <span className={styles.bubble}>이제 다 왔어요!</span>}
        </h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={iconStyle ? styles.customIconFormWrapper : styles.customNormalWrapper}>
        {options.map((option, index) => {
          const isObject = typeof option === 'object';
          const optionValue = typeof option === 'object' ? option.id : option;
          const optionText = typeof option === 'object' ? option.text : option;
          const isChecked = typeof value === 'object' ? value && value.id === option.id : value === option;

          return (
            <div key={index} className={`${styles.customLabelWrapper} ${isChecked ? styles['is-selected'] : null}`}>
              <label className={styles.label}>
                {iconStyle ? (
                  <div className={styles.customIconWrapper}>
                    <div className={styles.customIconBox}>
                      <i className={'icon icon-close'} />
                    </div>
                  </div>
                ) : null}
                <input
                  type='radio'
                  name={name}
                  value={optionValue}
                  checked={isChecked}
                  onChange={onChange}
                  style={{ display: 'none' }}
                />
                <span className={styles.labelText}>{optionText}</span>
              </label>
              {isObject && optionValue === 1 && isChecked && (
                <textarea
                  className={styles.textarea}
                  value={typeof value === 'object' && value.id === 1 ? value.text : ''}
                  onChange={onReasonTextChange}
                  placeholder='예 1) 부케를 받아달라고 요청했다.'
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
