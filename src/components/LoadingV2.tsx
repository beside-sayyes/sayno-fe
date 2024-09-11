import styles from './Loading.module.scss';
import { useEffect, useState } from 'react';

const Loading = ({ isV2 = true }) => {
  const [randomTip, setRandomTip] = useState('');

  const tips = [
    '상대방의 감정을 이해한다고 말해보세요.',
    '거절 멘트를 미리 연습해보세요.',
    '단호하게, 그러나 친절하게 말하세요.',
    '사실대로 말하는 것이 가장 좋습니다.',
    '차분하고 안정된 목소리로 말하세요.',
    '다른 가능성을 제시해보세요.',
  ];

  useEffect(() => {
    const setRandomTipHandler = () => {
      setRandomTip(tips[Math.floor(Math.random() * tips.length)]);
    };

    setRandomTipHandler();

    const intervalId = setInterval(setRandomTipHandler, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`${styles.layout} ${isV2 ? styles.typeV2 : ''}`}>
      <div className={styles.inner}>
        <div className={styles.imgWrapper}>
          <img src='/images/img_purple_heart.png' alt='loading image' className={styles.img} />
        </div>
        <p className={styles.subDescription}>최대 30초가 걸릴 수 있어요...</p>
        <h2 className={styles.title}>
          세이노가 거절멘트를
          <br />
          만들고 있어요!
        </h2>
        {/* 꿀팁 */}
        <div className={styles.tipItemWrapper}>
          <div className={styles.tipItemTitleWrapper}>
            <div className={styles.tipItemImgWrapper}>
              <img src='/images/icon_tip.png' alt='tip image' className={styles.img} />
            </div>
            <h2 className={styles.tipTitle}>대면 거절시 꿀팁</h2>
          </div>
          <p className={styles.tipDescription}>{randomTip}</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
