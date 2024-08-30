import { useNavigate } from 'react-router-dom';
import styles from './ResultHeader.module.scss';

const ResultHeader = ({ onClick, isV2 = true }) => {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/');
  };

  return (
    <header className={`${styles.header} ${isV2 ? styles.typeV2 : ''}`}>
      <div className={styles.inner}>
        <div className={styles.logoImgWrapper} onClick={moveHome}>
          <img className={styles.logoImg} src='images/logo_sayno.png' alt='sayno logo' />
        </div>
        <button className={`default-input ${styles.refreshButton}`} onClick={onClick}>
          <div className={styles.IconWrapper}>
            <i className={'icon icon-refresh'} />
          </div>
          <span className={styles.buttonText}>다시 만들기</span>
        </button>
      </div>
    </header>
  );
};

export default ResultHeader;
