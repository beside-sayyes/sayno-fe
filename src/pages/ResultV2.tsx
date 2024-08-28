import Footer from '../components/Footer.tsx';
import styles from './Result.module.scss';
import Toast from '../components/Toast.tsx';
import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ResultHeaderV2 from '../components/ResultHeaderV2.tsx';

const Result = ({ isV2 = true }) => {
  const [isShowToast, setIsShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [refuseMessage, setRefuseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const rejectCommentRef = useRef<HTMLParagraphElement>(null);

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const refuseId = queryParams.get('refuse_id');

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsShowToast(true);
  };

  const handleUrlCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('서비스 링크가 복사되었어요!');
    } catch (error) {
      showToast('복사에 실패하였습니다.');
      console.log(error);
    }
  };

  const handleRejectCommentCopyClipBoard = async () => {
    if (rejectCommentRef.current) {
      try {
        await navigator.clipboard.writeText(rejectCommentRef.current.textContent || '');
        showToast('거절 멘트가 복사되었어요!');
      } catch (error) {
        showToast('복사에 실패하였습니다.');
        console.log(error);
      }
    }
  };

  const fetchRefuseMessage = async (id: number) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL_V2}/refuse/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response?.data?.data;
      console.log('data', data);
      setRefuseMessage(data);
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
      const newRefuseId = response?.data?.data;
      navigate(`/result?refuse_id=${newRefuseId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const refuseIdNumber = refuseId ? Number(refuseId) : null;

    if (refuseIdNumber) {
      fetchRefuseMessage(refuseIdNumber);
    }
  }, [refuseId]);

  return (
    <div>
      <ResultHeaderV2 />
      <div>
        {/* 결과 박스 */}
        <div className={`${styles.resultItemWrapper} ${isV2 ? styles.typeV2 : ''}`}>
          <div className={styles.resultItemV2TitleWrapper}>
            <p className={`${styles.resultItemV2Desc} highlight`}>거절멘트 생성 결과</p>
            <h2 className={styles.resultItemV2Title}>세이노는 이렇게 거절했어요!</h2>
            <div className={styles.resultItemV2ImgWrapper}>
              <img className={styles.resultItemV2Img} src='images/img_congrats.png' />
            </div>
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
            {!isEditing ? (
              <button
                type={'button'}
                className={`default-input ${styles.descriptionEditButton}`}
                aria-label={'수정하기'}
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <div className={styles.descriptionEditIconWrapper}>
                  <i className={'icon icon-pencil'} />
                </div>
              </button>
            ) : null}
          </div>
          {!isEditing ? (
            <div className={styles.buttonAllWrapper}>
              <div className={styles.buttonWrapper}>
                <button type={'button'} className={`default-input ${styles.editButton}`} disabled={isLoading}>
                  <span className={styles.buttonText}>설정 추가하기</span>
                </button>
                <button
                  type={'button'}
                  className={`default-input ${styles.copyButton}`}
                  onClick={handleRejectCommentCopyClipBoard}
                  aria-label={'복사하기'}
                  disabled={isLoading}
                >
                  <div className={styles.buttonIconWrapper}>
                    <i className={`icon icon-copy ${isLoading ? 'is-disabled' : null}`} />
                  </div>
                  <span className={styles.buttonText}>복사하기</span>
                </button>
              </div>
              {/*<div className={styles.retryButtonWrapper}>*/}
              {/*  <button*/}
              {/*    type={'button'}*/}
              {/*    className={`default-input ${styles.retryButton}`}*/}
              {/*    disabled={isLoading}*/}
              {/*    aria-label={'다시 만들래'}*/}
              {/*    onClick={() => {*/}
              {/*      reRegisterRefuseMessage(Number(refuseId));*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    다시 만들래*/}
              {/*  </button>*/}
              {/*</div>*/}
            </div>
          ) : null}

          {isEditing ? (
            <div className={styles.buttonAllWrapper}>
              <button
                type={'button'}
                className={`default-input ${styles.copyButton} ${styles.typeFull}`}
                aria-label={'수정완료'}
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
      </div>
      {/* 결과 공유하기 */}
      <div className={styles.shareWrapper}>
        <button
          className={`default-input ${styles.shareButton}`}
          type={'button'}
          aria-label={'결과 공유하기'}
          onClick={() => handleUrlCopyClipBoard('https://justsayno.netlify.app')}
        >
          <div className={styles.iconWrapper}>
            <i className={'icon icon-share'} />
          </div>
          <span className={styles.recommendationText}>결과 공유하기</span>
        </button>
      </div>
      <Footer />
      <Toast message={toastMessage} isShow={isShowToast} onClose={() => setIsShowToast(false)} />
    </div>
  );
};

export default Result;
