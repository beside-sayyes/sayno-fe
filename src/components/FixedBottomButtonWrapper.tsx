import PrimaryButton from './PrimaryButton.tsx';
import styles from './FixedBottomButtonWrapper.module.scss';

interface FixedBottomButtonWrapperProps {
  onClick: () => void;
  buttonText: string;
  disabled?: boolean;
}

const FixedBottomButtonWrapper = ({ onClick, buttonText, disabled }: FixedBottomButtonWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      <PrimaryButton buttonText={buttonText} onClick={onClick} disabled={disabled} />
    </div>
  );
};

export default FixedBottomButtonWrapper;
