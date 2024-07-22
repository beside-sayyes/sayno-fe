import { useNavigate } from 'react-router-dom';
import styles from './ResultHeader.module.scss';

const Header = () => {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.header}>
      <button className={`default-input`} onClick={moveHome}>
        <div className={styles.IconWrapper}>
          <i className={'icon icon-home'} />
        </div>
      </button>
    </div>
  );
};

export default Header;
