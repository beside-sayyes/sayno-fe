import PrimaryButton from './PrimaryButton.tsx';
import styles from './FixedBottomButtonWrapper.module.scss';

interface FixedBottomButtonWrapperProps {
  onClick: () => void;
  buttonText: string;
}

const FixedBottomButtonWrapper = ({ onClick, buttonText }: FixedBottomButtonWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      <PrimaryButton buttonText={buttonText} onClick={onClick} />
    </div>
  );
};

export default FixedBottomButtonWrapper;
