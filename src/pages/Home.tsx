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
          시간과 관계를 지켜주는 <br />
          AI 거절멘트 생성 서비스
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
