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
  const handleTextareaChange = (event) => {
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
        <div>
          <button onClick={onClose}>닫기</button>
        </div>
        <div>
          <h2>{bottomSheetTitle}</h2>
        </div>
        <div>
          <textarea
            name='requestDetails'
            id='requestDetails'
            cols={30}
            rows={10}
            value={formData.requestDetails || ''}
            onChange={handleTextareaChange}
          ></textarea>
        </div>
        <PrimaryButton buttonText={'다음'} onClick={onClick} />
      </div>
    </div>
  );
};

export default BottomSheet;
