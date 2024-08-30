import styles from './FormStep.module.scss';
import { FormDataV2, OptionObject } from '../types/types.ts';
import RADIO_OPTIONS_V2 from '../constants/radioOptionsV2.ts';
import { getParticle } from '../utils/utils.ts';
import { Fragment, useEffect, useRef } from 'react';

interface FormStepV2T2Props {
  question: string | React.ReactNode;
  description?: string;
  options: string[] | OptionObject[];
  name: string;
  value: string | OptionObject | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReasonTextChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  iconStyle?: boolean;
  isV2?: boolean;
  labelType?: string;
  formData: FormDataV2;
}

const FormStepV2T2 = ({
  question,
  description,
  options,
  name,
  value,
  onChange,
  onReasonTextChange,
  iconStyle = false,
  isV2 = true,
  isT2 = true,
  labelType = 'none',
  formData,
}: FormStepV2T2Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 500;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.placeholder =
        'ex)\ncase 1. 회식을 당일통보 받았다.\ncase 2. 사업자금을 500만원 빌려달라는 부탁을 받았다.\ncase 3. 안친한 친구가 부케를 받아달라고 요청했다.';
    }
  }, []);

  return (
    <div className={`${styles.formStep} ${isV2 ? styles.typeV2 : ''} ${isT2 ? styles.type2 : ''}`}>
      <div className={styles.textWrapper}>
        <h2 className={styles.question}>{question}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.beforeInfoWrapper}>
        <p className={styles.beforeInfo}>
          <span className={'highlight'}>[{formData.category}]</span>에서{' '}
          <span className={'highlight'}>[{formData.subCategory}]</span>
          {getParticle(formData.subCategory || '')} 선택하셨어요.
        </p>
      </div>
      <div className={styles.subTextAllWrapper}>
        <div className={styles.subTextWrapper}>
          <p className={styles.subText}>상대방과의 관계를 선택해주세요.</p>
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
              <Fragment key={index}>
                <div className={`${styles.customLabelWrapper} ${isChecked ? styles['is-selected'] : null}`}>
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
                        <span className={styles.descText}>{RADIO_OPTIONS_V2.SUB_DESC_OPTIONS[optionText]}</span>
                        {optionText}
                      </span>
                    ) : null}
                    {labelType === 'none' ? <span className={styles.labelText}>{optionText}</span> : null}
                  </label>
                </div>
                {/* 직접 입력 input */}
                {isObject && optionValue === 1 && isChecked && (
                  <div className={styles.directlyWrapper}>
                    <input
                      type='text'
                      className={styles.textInput}
                      placeholder={'관계 입력'}
                      name={'subRelationship'}
                      onChange={onReasonTextChange}
                    />
                    <div className={styles.warningWrapper}>
                      <div className={styles.warningIconWrapper}>
                        <i className={'icon icon-exclamation-mark'} />
                      </div>
                      <span className={styles.warningText}>오탈자를 주의해주세요.</span>
                    </div>
                  </div>
                )}

                {/* END 직접 입력 input */}
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className={styles.subTextAllWrapper}>
        <div className={styles.subTextWrapper}>
          <p className={styles.subText}>상황을 구체적으로 작성해주세요.</p>
        </div>
        <div>
          <textarea
            maxLength={maxLength}
            ref={textareaRef}
            name='requestDetails'
            id='requestDetails'
            className={styles.textarea}
            value={formData.requestDetails || ''}
            onChange={onChange}
            placeholder={''}
          />
          <div className={styles.countTextWrapper}>
            <span className={styles.countText}>
              {formData.requestDetails ? formData.requestDetails?.length : '0'}/{maxLength}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormStepV2T2;
