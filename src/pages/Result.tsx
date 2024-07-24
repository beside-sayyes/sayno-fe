import ResultHeader from '../components/ResultHeader.tsx';
import PrimaryButton from '../components/PrimaryButton.tsx';
import Footer from '../components/Footer.tsx';
import styles from './Result.module.scss';

const Result = () => {
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };

  return (
    <div>
      <ResultHeader />
      <div>
        {/* 결과 박스 */}
        <div className={styles.resultItemWrapper}>
          <div className={styles.resultItemTitleWrapper}>
            <div className={styles.imgWrapper}>
              <img src='/images/img_cmark.png' alt='mark image' className={styles.img} />
            </div>
            <h2 className={styles.title}>
              세이노는 상황을 <br />
              이렇게 해석했어요
            </h2>
          </div>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid architecto at aut deleniti eveniet,
            excepturi incidunt ipsam, ipsum labore laborum necessitatibus optio perspiciatis placeat quae quaerat rem
            soluta velit!
          </p>
        </div>
        {/* 결과 박스 */}
        <div className={styles.resultItemWrapper}>
          <div className={styles.resultItemTitleWrapper}>
            <div className={styles.imgWrapper}>
              <img src='/images/img_cmark.png' alt='mark image' className={styles.img} />
            </div>
            <h2 className={styles.title}>
              이렇게 거절해 보시는 건 <br />
              어떨까요?
            </h2>
          </div>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid architecto at aut deleniti eveniet,
            excepturi incidunt ipsam, ipsum labore laborum necessitatibus optio perspiciatis placeat quae quaerat rem
            soluta velit!
          </p>
          <div>
            <div className={styles.buttonWrapper}>
              <button type={'button'} className={`default-input ${styles.editButton}`}>
                <div className={styles.buttonIconWrapper}>
                  <i className={'icon icon-edit'} />
                </div>
                <span className={styles.buttonText}>수정하기</span>
              </button>
              <button type={'button'} className={`default-input ${styles.copyButton}`}>
                <div className={styles.buttonIconWrapper}>
                  <i className={'icon icon-copy'} />
                </div>
                <span className={styles.buttonText}>복사하기</span>
              </button>
            </div>
            <div className={styles.retryButtonWrapper}>
              <button type={'button'} className={`default-input ${styles.retryButton}`}>
                다시 만들래
              </button>
            </div>
          </div>
        </div>
        {/* 꿀팁 */}
        <div className={styles.resultItemWrapper}>
          <div className={styles.resultItemTitleWrapper}>
            <h2 className={styles.title}>대면 거절시 꿀팁</h2>
          </div>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid architecto at aut deleniti eveniet,
            excepturi incidunt ipsam, ipsum labore laborum necessitatibus optio perspiciatis placeat quae quaerat rem
            soluta velit! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae, distinctio dolore
            eligendi expedita perferendis! Animi aspernatur consequuntur dolore, dolorum eum ipsum laudantium odio
            placeat possimus quae qui suscipit vel.
          </p>
        </div>
      </div>
      {/* 추천해주세요 */}
      <div className={styles.recommendationWrapper}>
        <p className={styles.recommendationComment}>
          거절 멘트 생성 서비스 SAYNO <br /> 친구에게도 추천해주세요
        </p>
        <button
          className={`default-input ${styles.recommendationButton}`}
          type={'button'}
          aria-label={'공유링크 복사'}
          onClick={() => handleCopyClipBoard('https://sayno.com')}
        >
          <div className={styles.iconWrapper}>
            <i className={'icon icon-share'} />
          </div>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Result;
