import { useNavigate } from 'react-router-dom';
import ResultHeader from '../components/ResultHeader.tsx';

const Result = () => {
  const navigate = useNavigate();

  const moveBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <ResultHeader />
      Result
    </div>
  );
};

export default Result;
