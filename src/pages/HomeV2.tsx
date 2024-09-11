import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import FixedBottomButtonWrapper from '../components/FixedBottomButtonWrapper.tsx';

const Home = ({ isV2 = true }) => {
  const navigate = useNavigate();

  const moveQuestion = () => {
    navigate('/question');
  };

  return (
    <div className={`${styles.home} ${isV2 ? styles.typeV2 : ''}`}>
      <div className={styles.titleWrapper}>
        <h1 className={`${styles.title} highlight`}>
          시간과 관계를 지켜주는
          <br />
          AI 거절멘트 생성 서비스
        </h1>
        <div className={styles.logoWrapper}>
          <img className={styles.logoImg} src='/images/logo_sayno.png' alt='sayno logo' />
        </div>
        <div className={styles.titleImgWrapper}>
          <img className={styles.titleImg} src='/images/img_sayno_hand.png' alt='sayno hand' />
        </div>
      </div>
      <div className={styles.featureWrapper}>
        <ul className={styles.featureGroup}>
          <li className={styles.featureList}>
            <div className={styles.featureIconWrapper}>
              <div className={styles.featureIconBox}>
                <i className={'icon icon-light-bulb'} />
              </div>
            </div>
            <p className={styles.featureText}>
              3단계로 <br />
              간편하게!
            </p>
          </li>
          <li className={styles.featureList}>
            <div className={styles.featureIconWrapper}>
              <div className={styles.featureIconBox}>
                <i className={'icon icon-light-bolt'} />
              </div>
            </div>
            <p className={styles.featureText}>
              재빠른 <br />
              답변 선택!
            </p>
          </li>
          <li className={styles.featureList}>
            <div className={styles.featureIconWrapper}>
              <div className={styles.featureIconBox}>
                <i className={'icon icon-share-copy'} />
              </div>
            </div>
            <p className={styles.featureText}>
              만든 후 <br />
              공유/복사!
            </p>
          </li>
        </ul>
      </div>
      <div className={styles.fixedMainTextWrapper}>
        <p className={styles.fixedMainText}>
          벌써 <span className={'highlight'}>500개</span>가 넘는 거절멘트들이 모였어요!
        </p>
      </div>
      <FixedBottomButtonWrapper buttonText={'시작하기'} onClick={moveQuestion} />
    </div>
  );
};

export default Home;
