import styles from './Home.module.scss';
import PrimaryButton from '../components/PrimaryButton.tsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const moveRequestQuestion = () => {
    navigate('/request-question');
  };

  return (
    <div>
      <h1 className={styles.test}>관계도 지켜주고 시간도 아껴줘요</h1>
      <PrimaryButton buttonText={'시작해볼까요?'} onClick={moveRequestQuestion} />
    </div>
  );
};

export default Home;
