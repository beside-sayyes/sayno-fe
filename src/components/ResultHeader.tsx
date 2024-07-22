import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.header}>
      <p>생성 완료</p>
      <button className={`default-input`} onClick={moveHome}>
        메인 이동
      </button>
    </div>
  );
};

export default Header;
