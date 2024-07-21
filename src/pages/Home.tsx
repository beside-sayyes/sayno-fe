import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import FixedBottomButtonWrapper from '../components/FixedBottomButtonWrapper.tsx';

const Home = () => {
  const navigate = useNavigate();

  const moveQuestion = () => {
    navigate('/question');
  };

  return (
    <div>
      <h1 className={styles.test}>관계도 지켜주고 시간도 아껴줘요</h1>
      <FixedBottomButtonWrapper buttonText={'시작해볼까요?'} onClick={moveQuestion} />
    </div>
  );
};

export default Home;
