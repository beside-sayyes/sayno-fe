import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.header}>
      <button>뒤로 가기</button>
      <button onClick={moveHome}>메인 이동</button>
    </div>
  );
};

export default Header;
