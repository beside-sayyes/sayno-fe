// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
import styles from './Loading.module.scss';

const Loading = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('/result');
  //   }, 2000);
  //
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.inner}>
        <div className={styles.imgWrapper}>
          <img src='images/img_purple_heart.png' alt='loading image' className={styles.img} />
        </div>
        <h2 className={styles.title}>
          거절멘트를
          <br />
          생성하고 있어요
        </h2>
        <p className={styles.description}>조금만 기다려 주세요!</p>
      </div>
    </div>
  );
};

export default Loading;
