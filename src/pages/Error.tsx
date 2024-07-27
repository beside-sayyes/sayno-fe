import styles from './Error.module.scss';
import { useNavigate } from 'react-router-dom';
import FixedBottomButtonWrapper from '../components/FixedBottomButtonWrapper.tsx';

const Error = () => {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.error}>
      <div>
        <div className={styles.imgWrapper}>
          <img className={styles.errorImg} src='images/img_error.png' alt='error image' />
        </div>
        <h1 className={styles.title}>404 Not Found</h1>
        <p className={styles.description}>올바른 주소로 서비스를 이용해 주세요.</p>
      </div>
      <FixedBottomButtonWrapper buttonText={'처음으로 돌아가기'} onClick={moveHome} />
    </div>
  );
};

export default Error;
