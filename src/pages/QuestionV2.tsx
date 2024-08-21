import Header from '../components/Header.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FixedBottomButtonWrapper from '../components/FixedBottomButtonWrapper.tsx';
import BottomSheet from '../components/BottomSheet.tsx';
import axios from 'axios';
import Loading from '../components/Loading.tsx';
import RADIO_OPTIONS_V2 from '../constants/radioOptionsV2.ts';
import { getParticle } from '../utils/utils.ts';
import { FormData } from '../types/types.ts';
import ProgressStepper from '../components/ProgressStepper.tsx';
import FormStepV2 from '../components/FormStepV2.tsx';

const Question = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isDepthQuestionShow, setIsDepthQuestionShow] = useState(false);
  const [isBottomSheetShow, setIsBottomSheetShow] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    category: null,
    subCategory: null,
    requestDetails: null,
    gender: null,
    age: null,
    reason: null,
    style: null,
    polite: null,
  });
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const totalStep = 3;

  const navigate = useNavigate();

  const handleReasonTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      reason: prevFormData.reason ? { ...prevFormData.reason, text: value } : { id: 1, text: value },
    }));
  };

  const handleStepOneNext = () => {
    if (formData.category === null) {
      alert('상황을 입력해주세요');
      return;
    }

    if (RADIO_OPTIONS_V2.SUB_CATEGORY_OPTIONS[formData.category]?.length === 0) {
      setIsBottomSheetShow(true);
    } else if (
      RADIO_OPTIONS_V2.SUB_CATEGORY_OPTIONS[formData.category]?.length > 0 &&
      formData.subCategory === null &&
      !isDepthQuestionShow
    ) {
      setIsDepthQuestionShow(true);
      window.scrollTo(0, 0);
    } else if (isDepthQuestionShow) {
      if (formData.subCategory === null) {
        alert('추가 상황을 입력해주세요');
        return;
      }
      setIsBottomSheetShow(true);
    }
  };

  const handleNext = () => {
    if (step === 2) {
      if (formData.gender === null) {
        alert('성별을 선택해주세요');
        return;
      }
    }

    if (step === 3) {
      if (formData.age === null) {
        alert('나이를 선택해주세요');
        return;
      }
    }

    if (step === 4) {
      if (formData.reason === null) {
        alert('거절사유를 입력해주세요');
        return;
      }
    }

    if (step === 5) {
      if (formData.style === null) {
        alert('화법을 선택해주세요');
        return;
      }
    }

    if (step === 6) {
      if (formData.polite === null) {
        alert('반말/존댓말 여부를 선택해주세요');
        return;
      }

      generateSaynoMessage();
      return;
    }

    setStep(step + 1);
  };

  const onClose = () => {
    setIsBottomSheetShow(false);
  };

  const goStepTwo = () => {
    if (!formData.requestDetails) {
      alert('자세한 요청 사항을 적어주세요');
      return;
    }

    setStep(2);
  };

  const handleStepOneBack = () => {
    if (isDepthQuestionShow) {
      setIsDepthQuestionShow(false);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      if (name === 'category') {
        return {
          ...prevFormData,
          [name]: value,
          subCategory: null, // category 변경 시 subCategory를 null로 설정
          requestDetails: null, // category 변경 시 requestDetails를 null로 설정
        };
      } else if (name === 'subCategory') {
        return {
          ...prevFormData,
          [name]: value,
          requestDetails: null, // subCategory 변경 시 requestDetails를 null로 설정
        };
      } else if (name === 'reason') {
        const selectedReason = RADIO_OPTIONS_V2.REASON_OPTIONS.find((reason) => reason.id === Number(value));
        if (selectedReason && selectedReason.id === 1) {
          return {
            ...prevFormData,
            reason: { ...selectedReason, text: '' },
          };
        } else if (selectedReason && selectedReason.id === 4) {
          return {
            ...prevFormData,
            reason: { ...selectedReason, text: null }, // '세이노가 알아서 해줘' 선택 시 null 처리
          };
        } else {
          return {
            ...prevFormData,
            reason: selectedReason || null,
          };
        }
        return {
          ...prevFormData,
          reason: selectedReason || null,
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return !formData.category || (isDepthQuestionShow && !formData.subCategory);
      case 2:
        return !formData.gender;
      case 3:
        return !formData.age;
      case 4:
        return !formData.reason;
      case 5:
        return !formData.style;
      case 6:
        return !formData.polite;
      default:
        return true;
    }
  };

  const generateSaynoMessage = async () => {
    setIsLoading(true);

    const refuseBody = {
      situationCategory: formData.category,
      subSituationCategory: formData.subCategory,
      request: formData.requestDetails,
      targetSex: formData.gender,
      targetAge: formData.age,
      refuseReason: formData.reason ? formData.reason.text : '',
      narration: formData.style,
      polite: formData.polite,
    };

    const emotionBody = {
      situationCategory: formData.category,
      subSituationCategory: formData.subCategory,
      request: formData.requestDetails,
      targetSex: formData.gender,
      targetAge: formData.age,
    };

    try {
      const response1 = await axios.post(`${import.meta.env.VITE_API_URL}/refuse/register`, refuseBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const refuseId = response1?.data?.data;

      const response2 = await axios.post(`${import.meta.env.VITE_API_URL}/emotion-and-intent/register`, emotionBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const emotionId = response2?.data?.data;

      navigate(`/result?refuse_id=${refuseId}&emotion_id=${emotionId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsNextDisabled(validateStep(step));
  }, [formData, step, isDepthQuestionShow]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  console.log('formData', formData);

  return (
    <div>
      {isLoading ? <Loading /> : null}
      <Header onBackClick={step === 1 ? handleStepOneBack : handleBack} />
      <ProgressStepper totalSteps={totalStep} step={step} />
      {step === 1 && !isDepthQuestionShow ? (
        <FormStepV2
          question={
            <>
              반가워요! <br />
              어떤 부탁을 받으셨나요?
            </>
          }
          options={RADIO_OPTIONS_V2.CATEGORY_OPTIONS}
          name='category'
          value={formData.category}
          onChange={handleChange}
          iconStyle={true}
        />
      ) : null}
      {step === 1 && isDepthQuestionShow && formData.category ? (
        <FormStepV2
          question={
            <>
              <span className='highlight'>{formData.category}</span>
              {getParticle(formData.category)} 선택하셨네요! <br />
              어떤 상황이었나요?
            </>
          }
          options={RADIO_OPTIONS_V2.SUB_CATEGORY_OPTIONS[formData.category] || []}
          name='subCategory'
          value={formData.subCategory}
          onChange={handleChange}
          iconStyle={true}
        />
      ) : null}
      {step === 1 ? (
        <BottomSheet
          bottomSheetTitle={'어떤 요청을 받으셨어요?'}
          bottomSheetDesciption={'구체적으로 말씀해 주세요'}
          isShow={isBottomSheetShow}
          onClose={onClose}
          onClick={goStepTwo}
          formData={formData}
          setFormData={setFormData}
        />
      ) : null}
      {step === 2 ? (
        <FormStepV2
          question={
            <>
              상대방의 <br />
              성별을 알려주세요!
            </>
          }
          description={'요청자의 성별에 따라 호칭이 달라질 수 있어요'}
          options={RADIO_OPTIONS_V2.GENDER_OPTIONS}
          name='gender'
          value={formData.gender}
          onChange={handleChange}
        />
      ) : null}
      {step === 3 ? (
        <FormStepV2
          question={
            <>
              상대방의 <br />
              나이를 알려주세요!
            </>
          }
          description={'요청자의 연령대에 맞는 멘트를 생성해드려요'}
          options={RADIO_OPTIONS_V2.AGE_OPTIONS}
          name='age'
          value={formData.age}
          onChange={handleChange}
        />
      ) : null}
      {step === 4 ? (
        <FormStepV2
          question={
            <>
              거절하시는 이유는 <br />
              무엇인가요?
            </>
          }
          options={RADIO_OPTIONS_V2.REASON_OPTIONS}
          name='reason'
          value={formData.reason}
          onChange={handleChange}
          onReasonTextChange={handleReasonTextChange}
        />
      ) : null}
      {step === 5 ? (
        <FormStepV2
          question={
            <>
              어떤 화법으로 <br />
              거절하시겠어요?
            </>
          }
          options={RADIO_OPTIONS_V2.STYLE_OPTIONS}
          name='style'
          value={formData.style}
          onChange={handleChange}
        />
      ) : null}
      {step === 6 ? (
        <FormStepV2
          question={
            <>
              존댓말을 <br />
              사용하시겠어요?
            </>
          }
          bubbleText={'이제 다 왔어요!'}
          options={RADIO_OPTIONS_V2.POLITE_OPTIONS}
          name='polite'
          value={formData.polite}
          onChange={handleChange}
        />
      ) : null}
      <FixedBottomButtonWrapper
        buttonText={'다음'}
        onClick={step === 1 ? handleStepOneNext : handleNext}
        disabled={isNextDisabled}
      />
    </div>
  );
};

export default Question;
