interface PrimaryButtonProps {
  buttonText: string;
  onClick: () => void;
}

const PrimaryButton = ({ buttonText, onClick }: PrimaryButtonProps) => {
  return (
    <div>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
};

export default PrimaryButton;
