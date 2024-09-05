import styles from './Result.module.scss';
import Toast from '../components/Toast.tsx';
import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ResultHeaderV2 from '../components/ResultHeaderV2.tsx';
import BottomSheetV2 from '../components/BottomSheetV2.tsx';
import FooterV2 from '../components/FooterV2.tsx';
import RADIO_OPTIONS_V2 from '../constants/radioOptionsV2.ts';
import ERROR_CODES from '../constants/errorCodes.js';

const Result = ({ isV2 = true }) => {
  const [isShowToast, setIsShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [refuseMessage, setRefuseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isBottomSheetShow, setIsBottomSheetShow] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    style: RADIO_OPTIONS_V2.STYLE_OPTIONS[0],
    polite: RADIO_OPTIONS_V2.POLITE_OPTIONS[0],
  });

  const rejectCommentRef = useRef<HTMLParagraphElement>(null);

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const refuseId = queryParams.get('refuse_id');

  const generateReRegisterRefuseMessage = async () => {
    await reRegisterRefuseMessage(Number(refuseId));
  };

  const generateReAddRegisterRefuseMessage = async () => {
    await reAddRegisterRefuseMessage(Number(refuseId));
  };

  const onClose = () => {
    setIsBottomSheetShow(false);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsShowToast(true);
  };

  const handleUrlCopyClipBoard = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      showToast('결과 링크가 복사되었어요!');
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
      setRefuseMessage(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const reAddRegisterRefuseMessage = async (id: number) => {
    setIsLoading(true);

    const refuseBody = {
      claudeId: id,
      narration: selectedOptions.style,
      polite: selectedOptions.polite,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL_V2}/refuse/option-fix-register`, refuseBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newRefuseId = response?.data?.data;
      navigate(`/result?refuse_id=${newRefuseId}`);
    } catch (error) {
      const errorCode = error.response && error.response.status;
      if (errorCode === ERROR_CODES.TooManyRequest) {
        alert('세이노의 생성 기능은 최대 3회까지 이용하실 수 있어요!');
      }
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const reRegisterRefuseMessage = async (id: number) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL_V2}/refuse/re-register/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newRefuseId = response?.data?.data;
      navigate(`/result?refuse_id=${newRefuseId}`);
    } catch (error) {
      const errorCode = error.response && error.response.status;
      if (errorCode === ERROR_CODES.TooManyRequest) {
        alert('세이노의 생성 기능은 최대 3회까지 이용하실 수 있어요!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionChange = (type: 'style' | 'polite', value: string) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [type]: value,
    }));
  };

  useEffect(() => {
    const refuseIdNumber = refuseId ? Number(refuseId) : null;

    if (refuseIdNumber) {
      fetchRefuseMessage(refuseIdNumber);
    }
  }, [refuseId]);

  return (
    <div>
      <ResultHeaderV2 onClick={generateReRegisterRefuseMessage} disabled={isLoading} />
      <div>
        {/* 결과 박스 */}
        <div className={`${styles.resultItemWrapper} ${isV2 ? styles.typeV2 : ''}`}>
          <div className={styles.resultItemV2TitleWrapper}>
            <p className={`${styles.resultItemV2Desc} highlight`}>거절멘트 생성 결과</p>
            <h2 className={styles.resultItemV2Title}>세이노는 이렇게 거절했어요!</h2>
            <div className={styles.resultItemV2ImgWrapper}>
              <img className={styles.resultItemV2Img} src='/images/img_congrats.png' />
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
                disabled={isLoading}
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
                <button
                  type={'button'}
                  className={`default-input ${styles.editButton}`}
                  disabled={isLoading}
                  onClick={() => {
                    setIsBottomSheetShow(true);
                  }}
                >
                  <span className={styles.buttonText}>설정 변경하기</span>
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
      <div className={styles.middleTextWrapper}>
        <p className={styles.middleText}>
          설정 변경과 다시 만들기 기능은 1시간에 <br />
          최대 3번까지 이용할 수 있습니다.
        </p>
      </div>

      {/* 결과 공유하기 */}
      <div className={styles.shareWrapper}>
        <button
          className={`default-input ${styles.shareButton}`}
          type={'button'}
          aria-label={'결과 공유하기'}
          disabled={isLoading}
          onClick={handleUrlCopyClipBoard}
        >
          <div className={styles.iconWrapper}>
            <i className={'icon icon-share'} />
          </div>
          <span className={styles.recommendationText}>결과 공유하기</span>
        </button>
      </div>
      <FooterV2 />
      <Toast message={toastMessage} isShow={isShowToast} onClose={() => setIsShowToast(false)} />
      <BottomSheetV2
        bottomSheetTitle={'설정 변경하기'}
        isShow={isBottomSheetShow}
        onClose={onClose}
        onClick={generateReAddRegisterRefuseMessage}
        selectedOptions={selectedOptions}
        handleOptionChange={handleOptionChange}
        disabled={isLoading}
      />
    </div>
  );
};

export default Result;
