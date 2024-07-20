import Header from '../components/Header.tsx';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const navigate = useNavigate();

  const moveBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header onBackClick={moveBack} headerTitle={'생성 완료'} />
      Result
    </div>
  );
};

export default Result;
