import PrimaryButton from './PrimaryButton.tsx';
import styles from './FixedBottomButtonWrapper.module.scss';

interface FixedBottomButtonWrapperProps {
  onClick: () => void;
}

const FixedBottomButtonWrapper = ({ onClick }: FixedBottomButtonWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      <PrimaryButton buttonText={'다음'} onClick={onClick} />
    </div>
  );
};

export default FixedBottomButtonWrapper;
