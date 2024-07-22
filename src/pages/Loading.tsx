import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/result');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1 className={'test'}>{'거절 생성'}</h1>
      <p>생성하고 있어요!</p>
    </div>
  );
};

export default Loading;
