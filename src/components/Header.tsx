import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

interface HeaderProps {
  onBackClick: () => void;
}

const Header = ({ onBackClick }: HeaderProps) => {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.header}>
      <button className={`default-input ${styles.Button}`} onClick={onBackClick} aria-label={'뒤로 가기'}>
        <div className={styles.backIconWrapper}>
          <i className={'icon icon-back'} />
        </div>
      </button>
      <button className={`default-input ${styles.Button}`} onClick={moveHome}>
        <div className={styles.closeIconWrapper}>
          <i className={'icon icon-close'} />
        </div>
      </button>
    </div>
  );
};

export default Header;
