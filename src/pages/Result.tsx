import ResultHeader from '../components/ResultHeader.tsx';
import Footer from '../components/Footer.tsx';
import styles from './Result.module.scss';
import Toast from '../components/Toast.tsx';
import { useRef, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner.tsx';

const Result = () => {
  const [isShowToast, setIsShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const rejectCommentRef = useRef<HTMLParagraphElement>(null);

  const handleUrlCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage('서비스 링크가 복사되었어요!');
      setIsShowToast(true);
    } catch (error) {
      setToastMessage('복사에 실패하였습니다');
      setIsShowToast(true);
      console.log(error);
    }
  };

  const handleRejectCommentCopyClipBoard = async () => {
    if (rejectCommentRef.current) {
      try {
        await navigator.clipboard.writeText(rejectCommentRef.current.textContent || '');
        setToastMessage('거절 멘트가 복사되었어요!');
        setIsShowToast(true);
      } catch (error) {
        setToastMessage('복사에 실패하였습니다');
        setIsShowToast(true);
        console.log(error);
      }
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
              <img src='/images/icon_cmark.png' alt='mark image' className={styles.img} />
            </div>
            <h2 className={styles.title}>
              세이노는 상황을 <br />
              이렇게 해석했어요
            </h2>
          </div>
          <div className={styles.descriptionWrapper}>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid architecto at aut deleniti eveniet,
              excepturi incidunt ipsam, ipsum labore laborum necessitatibus optio perspiciatis placeat quae quaerat rem
              soluta velit!
            </p>
          </div>
        </div>
        {/* 결과 박스 */}
        <div className={styles.resultItemWrapper}>
          <div className={styles.resultItemTitleWrapper}>
            <div className={styles.imgWrapper}>
              <img src='/images/icon_cmark.png' alt='mark image' className={styles.img} />
            </div>
            <h2 className={styles.title}>
              이렇게 거절해 보시는 건 <br />
              어떨까요?
            </h2>
          </div>
          <div className={`${styles.descriptionWrapper} ${styles.typeReject}`}>
            <LoadingSpinner />
            <p className={styles.description} ref={rejectCommentRef}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid architecto at aut deleniti eveniet,
              excepturi incidunt ipsam, ipsum labore laborum necessitatibus optio perspiciatis placeat quae quaerat rem
              soluta velit!
            </p>
          </div>
          <div>
            <div className={styles.buttonWrapper}>
              <button type={'button'} className={`default-input ${styles.editButton}`}>
                <div className={styles.buttonIconWrapper}>
                  <i className={'icon icon-edit'} />
                </div>
                <span className={styles.buttonText}>수정하기</span>
              </button>
              <button
                type={'button'}
                className={`default-input ${styles.copyButton}`}
                onClick={handleRejectCommentCopyClipBoard}
              >
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
        <div className={styles.tipItemWrapper}>
          <div className={styles.tipItemTitleWrapper}>
            <div className={styles.tipItemImgWrapper}>
              <img src='/images/icon_tip.png' alt='tip image' className={styles.img} />
            </div>
            <h2 className={styles.tipTitle}>대면 거절시 꿀팁</h2>
          </div>
          <p className={styles.tipDescription}>단호하게, 그러나 친절하게 말하세요.</p>
        </div>
      </div>
      {/* 추천해주세요 */}
      <div className={styles.recommendationWrapper}>
        <p className={styles.recommendationComment}>
          거절 멘트 생성 서비스 <span className={styles.recommendationSubComment}>SAYNO</span> <br /> 친구에게도
          추천해주세요!
        </p>
        <button
          className={`default-input ${styles.recommendationButton}`}
          type={'button'}
          aria-label={'공유링크 복사'}
          onClick={() => handleUrlCopyClipBoard('https://sayno.com')}
        >
          <div className={styles.iconWrapper}>
            <i className={'icon icon-share'} />
          </div>
          <span className={styles.recommendationText}>추천하기</span>
        </button>
      </div>
      <Footer />
      <Toast message={toastMessage} isShow={isShowToast} onClose={() => setIsShowToast(false)} />
    </div>
  );
};

export default Result;
