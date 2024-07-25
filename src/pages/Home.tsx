import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import FixedBottomButtonWrapper from '../components/FixedBottomButtonWrapper.tsx';

const Home = () => {
  const navigate = useNavigate();

  const moveQuestion = () => {
    navigate('/question');
  };

  return (
    <div className={styles.home}>
      <div>
        <h1 className={styles.title}>
          관계도 지켜주고,
          <br />
          시간도 아껴줘요
        </h1>
        <div className={styles.logoWrapper}>
          <img className={styles.logoImg} src='images/logo_sayno.png' alt='sayno logo' />
        </div>
      </div>
      <FixedBottomButtonWrapper buttonText={'시작해 볼까요?'} onClick={moveQuestion} />
    </div>
  );
};

export default Home;
