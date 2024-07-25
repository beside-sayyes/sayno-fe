import ResultHeader from '../components/ResultHeader.tsx';
import Footer from '../components/Footer.tsx';
import styles from './Result.module.scss';
import Toast from '../components/Toast.tsx';
import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const [isShowToast, setIsShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [refuseMessage, setRefuseMessage] = useState('');
  const [emotionAndIntentText, setEmotionAndIntentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmotionLoading, setIsEmotionLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const rejectCommentRef = useRef<HTMLParagraphElement>(null);

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const refuseId = queryParams.get('refuse_id');
  const emotionId = queryParams.get('emotion_id');

  const handleUrlCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage('서비스 링크가 복사되었어요!');
      setIsShowToast(true);
    } catch (error) {
      setToastMessage('복사에 실패하였습니다.');
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
        setToastMessage('복사에 실패하였습니다.');
        setIsShowToast(true);
        console.log(error);
      }
    }
  };

  const fetchEmotionAndIntent = async (id: number) => {
    setIsEmotionLoading(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/emotion-and-intent/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response?.data?.data;
      setEmotionAndIntentText(data?.emotionAndIntentText);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEmotionLoading(false);
    }
  };

  const fetchRefuseMessage = async (id: number) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/refuse/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response?.data?.data;
      setRefuseMessage(data?.refuseText);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const reRegisterRefuseMessage = async (id: number) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/refuse/re-register/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response?.data?.data;
      const newRefuseId = data;
      navigate(`/result?refuse_id=${newRefuseId}&emotion_id=${emotionId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const refuseIdNumber = refuseId ? Number(refuseId) : null;
    const emotionIdNumber = emotionId ? Number(emotionId) : null;

    if (refuseIdNumber) {
      fetchRefuseMessage(refuseIdNumber);
    }

    if (emotionIdNumber) {
      fetchEmotionAndIntent(emotionIdNumber);
    }
  }, [refuseId, emotionId]);

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
            {isEmotionLoading ? <LoadingSpinner /> : null}
            <p className={styles.description}>{emotionAndIntentText}</p>
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
            {isLoading ? <LoadingSpinner /> : null}
            <p
              className={styles.description}
              ref={rejectCommentRef}
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
            >
              {refuseMessage}
            </p>
          </div>
          {!isEditing ? (
            <div className={styles.buttonAllWrapper}>
              <div className={styles.buttonWrapper}>
                <button
                  type={'button'}
                  className={`default-input ${styles.editButton}`}
                  disabled={isLoading}
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  <div className={styles.buttonIconWrapper}>
                    <i className={`icon icon-edit ${isLoading ? 'is-disabled' : null}`} />
                  </div>
                  <span className={styles.buttonText}>수정하기</span>
                </button>
                <button
                  type={'button'}
                  className={`default-input ${styles.copyButton}`}
                  onClick={handleRejectCommentCopyClipBoard}
                  disabled={isLoading}
                >
                  <div className={styles.buttonIconWrapper}>
                    <i className={`icon icon-copy ${isLoading ? 'is-disabled' : null}`} />
                  </div>
                  <span className={styles.buttonText}>복사하기</span>
                </button>
              </div>
              <div className={styles.retryButtonWrapper}>
                <button
                  type={'button'}
                  className={`default-input ${styles.retryButton}`}
                  disabled={isLoading}
                  onClick={() => {
                    reRegisterRefuseMessage(Number(refuseId));
                  }}
                >
                  다시 만들래
                </button>
              </div>
            </div>
          ) : null}

          {isEditing ? (
            <div className={styles.buttonAllWrapper}>
              <button
                type={'button'}
                className={`default-input ${styles.copyButton} ${styles.typeFull}`}
                onClick={() => {
                  setIsEditing(false);
                  setRefuseMessage(rejectCommentRef.current?.innerText || '');
                }}
              >
                <span className={styles.buttonText}>수정완료</span>
              </button>
            </div>
          ) : null}
        </div>
        {/* 꿀팁 */}
        <div className={styles.tipItemWrapper}>
          <div className={styles.tipItemTitleWrapper}>
            <div className={styles.tipItemImgWrapper}>
              <img src='/images/icon_tip.png' alt='tip image' className={styles.img} />
            </div>
            <h2 className={styles.tipTitle}>대면 거절시 꿀팁</h2>
          </div>
          <p className={styles.tipDescription}>
            "와, 부케를 나한테 주다니 정말 고마워! 하지만 난 아직 마음의 준비가 안 됐나 봐. 부케를 받으면 3개월 안에
            결혼해야 한다는 말이 있잖아? 나 아직 연애도 시작 못했는데! 다른 친구에게 기회를 주는 게 어떨까? 그래도
            초대해줘서 정말 고마워, 멋진 결혼식 기대할게!"
          </p>
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
