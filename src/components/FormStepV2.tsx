import styles from './FormStep.module.scss';
import { OptionObject } from '../types/types.ts';
import RADIO_OPTIONS_V2 from '../constants/radioOptionsV2.ts';

interface FormStepProps {
  question: string | React.ReactNode;
  bubbleText?: string;
  description?: string;
  options: string[] | OptionObject[];
  name: string;
  value: string | OptionObject | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReasonTextChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  iconStyle?: boolean;
  isV2?: boolean;
  labelType?: string;
}

const FormStepV2 = ({
  question,
  bubbleText,
  description,
  options,
  name,
  value,
  onChange,
  onReasonTextChange,
  iconStyle = false,
  isV2 = true,
  labelType = 'none',
}: FormStepProps) => {
  const maxLength = 500;

  return (
    <div className={`${styles.formStep} ${isV2 ? styles.typeV2 : ''}`}>
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
          const optionValue = isObject ? (option as OptionObject).id : option;
          const optionText = isObject ? (option as OptionObject).text : option;
          const isChecked = isObject
            ? value && typeof value === 'object' && value.id === (option as OptionObject).id
            : value === option;
          const noSpaceOptionText = optionText.replace(/\s+/g, '');

          return (
            <div key={index} className={`${styles.customLabelWrapper} ${isChecked ? styles['is-selected'] : null}`}>
              <label className={styles.label}>
                {iconStyle ? (
                  <div className={styles.customIconWrapper}>
                    <div className={styles.customIconBox}>
                      <i className={`icon icon-${noSpaceOptionText}`} />
                    </div>
                  </div>
                ) : null}
                <input
                  type='radio'
                  name={name}
                  value={optionValue}
                  checked={!!isChecked}
                  onChange={onChange}
                  style={{ display: 'none' }}
                />
                {labelType === 'static' ? (
                  <span className={styles.labelText}>
                    <span className={'highlight'}>{optionText}</span>에서 <br />
                    부탁을 받았어요.
                  </span>
                ) : null}
                {labelType === 'dynamic' ? (
                  <span className={styles.labelText}>
                    {RADIO_OPTIONS_V2.SUB_CATEGORY_DESC_OPTIONS[optionText]} {optionText}
                  </span>
                ) : null}
                {labelType === 'none' ? <span className={styles.labelText}>{optionText}</span> : null}
              </label>
              {isObject && optionValue === 1 && isChecked && (
                <>
                  <textarea
                    maxLength={maxLength}
                    className={styles.textarea}
                    value={typeof value === 'object' && value && value.id === 1 ? value.text : ''}
                    onChange={onReasonTextChange}
                    placeholder='500자 이내로 입력해주세요~'
                  />
                  <div className={styles.countTextWrapper}>
                    <span className={styles.countText}>
                      {typeof value === 'object' && value && value.id === 1 ? value?.text?.length : '0'}/{maxLength}
                    </span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormStepV2;
