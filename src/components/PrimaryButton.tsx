import styles from './PrimaryButton.module.scss';

interface PrimaryButtonProps {
  buttonText: string;
  onClick: () => void;
  disabled?: boolean;
}

const PrimaryButton = ({ buttonText, onClick, disabled }: PrimaryButtonProps) => {
  return (
    <div>
      <button className={`default-input ${styles.button}`} onClick={onClick} disabled={disabled}>
        {buttonText}
      </button>
    </div>
  );
};

export default PrimaryButton;
