import ProgressBar from '../components/ProgressBar.tsx';
import Header from '../components/Header.tsx';
import { useNavigate } from 'react-router-dom';

const RequestQuestion = () => {
  const navigate = useNavigate();

  const moveBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header onBackClick={moveBack} headerTitle={'요청 입력'} />
      <ProgressBar />
      요청 입력화면
    </div>
  );
};

export default RequestQuestion;
