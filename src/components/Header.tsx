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
    <header className={styles.header}>
      <div className={styles.inner}>
        <button className={`default-input ${styles.Button}`} onClick={onBackClick} aria-label={'뒤로 가기'}>
          <div className={styles.backIconWrapper}>
            <i className={'icon icon-back'} />
          </div>
        </button>
        <button className={`default-input ${styles.Button}`} onClick={moveHome} aria-label={'홈으로 가기'}>
          <div className={styles.closeIconWrapper}>
            <i className={'icon icon-close'} />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
