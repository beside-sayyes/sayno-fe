import styles from './BottomSheet.module.scss';
import PrimaryButton from './PrimaryButton.tsx';
import { useEffect, useRef } from 'react';
import { FormData } from '../types/types.ts';

interface BottomSheetProps {
  isShow: boolean;
  bottomSheetTitle: string;
  bottomSheetDesciption: string;
  onClose: () => void;
  onClick: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const BottomSheet = ({ isShow, onClose, onClick, bottomSheetTitle, formData, setFormData }: BottomSheetProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 500;

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      requestDetails: value,
    }));
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.placeholder = '예 1) 부케를 받아달라고 요청했다.\n예 2) 사업자금을 빌려달라고 요청했다.';
    }
  }, []);

  return (
    <div className={`${styles.allWrapper} ${isShow ? styles['is-show'] : null}`}>
      <div className={styles.dimOverlay} />
      <div className={`${styles.contentWrapper} ${isShow ? styles['is-show'] : null}`}>
        <div className={styles.topWrapper}>
          <div>
            <h2 className={styles.bottomSheetTitle}>{bottomSheetTitle}</h2>
          </div>
          <button className={`default-input ${styles.Button}`} onClick={onClose} aria-label={'닫기'}>
            <div className={styles.closeIconWrapper}>
              <i className={'icon icon-close'} />
            </div>
          </button>
        </div>
        <div className={styles.textareaWrapper}>
          <textarea
            maxLength={maxLength}
            ref={textareaRef}
            name='requestDetails'
            id='requestDetails'
            className={styles.textarea}
            value={formData.requestDetails || ''}
            onChange={handleTextareaChange}
            placeholder={''}
          />
          <div className={styles.countTextWrapper}>
            <span className={styles.countText}>
              {formData?.requestDetails ? formData?.requestDetails?.length : '0'}/{maxLength}
            </span>
          </div>
        </div>
        <PrimaryButton buttonText={'다음'} onClick={onClick} disabled={!formData.requestDetails} />
      </div>
    </div>
  );
};

export default BottomSheet;
