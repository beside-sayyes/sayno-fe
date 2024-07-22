import styles from './BottomSheet.module.scss';
import PrimaryButton from './PrimaryButton.tsx';

interface BottomSheetProps {
  isShow: boolean;
  bottomSheetTitle: string;
  onClose: () => void;
  onClick: () => void;
  formData: {
    category: string | null;
    subCategory: string | null;
    requestDetails: string | null;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      category: string | null;
      subCategory: string | null;
      requestDetails: string | null;
    }>
  >;
}

const BottomSheet = ({ isShow, onClose, onClick, bottomSheetTitle, formData, setFormData }: BottomSheetProps) => {
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      requestDetails: value,
    }));
  };

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
        <div>
          <textarea
            name='requestDetails'
            id='requestDetails'
            className={styles.textarea}
            value={formData.requestDetails || ''}
            onChange={handleTextareaChange}
            placeholder={'예 1) 부케를 받아달라고 요청했다.'}
          ></textarea>
        </div>
        <PrimaryButton buttonText={'다음'} onClick={onClick} disabled={!formData.requestDetails} />
      </div>
    </div>
  );
};

export default BottomSheet;
