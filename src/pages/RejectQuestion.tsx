import ProgressBar from '../components/ProgressBar.tsx';
import Header from '../components/Header.tsx';
import { useNavigate } from 'react-router-dom';

const RejectQuestion = () => {
  const navigate = useNavigate();

  const moveBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header onBackClick={moveBack} headerTitle={'요청 입력'} />
      <ProgressBar />
      거절 생성화면
    </div>
  );
};

export default RejectQuestion;
