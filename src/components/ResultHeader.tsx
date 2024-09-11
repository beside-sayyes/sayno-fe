import { useNavigate } from 'react-router-dom';
import styles from './ResultHeader.module.scss';

const ResultHeader = () => {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/v1');
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button className={`default-input`} onClick={moveHome} aria-label={'홈으로 가기'}>
          <div className={styles.IconWrapper}>
            <i className={'icon icon-home'} />
          </div>
        </button>
      </div>
    </header>
  );
};

export default ResultHeader;
