import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

interface HeaderProps {
  headerTitle: string;
  onBackClick: () => void;
}

const Header = ({ headerTitle, onBackClick }: HeaderProps) => {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.header}>
      <button onClick={onBackClick}>뒤로 가기</button>
      <h1 className={'test'}>{headerTitle}</h1>
      <button onClick={moveHome}>메인 이동</button>
    </div>
  );
};

export default Header;
