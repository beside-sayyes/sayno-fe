import Header from '../components/Header.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FixedBottomButtonWrapper from '../components/FixedBottomButtonWrapper.tsx';
import axios from 'axios';
import RADIO_OPTIONS_V2 from '../constants/radioOptionsV2.ts';
import { getParticle } from '../utils/utils.ts';
import { FormDataV2 } from '../types/types.ts';
import ProgressStepper from '../components/ProgressStepper.tsx';
import FormStepV2 from '../components/FormStepV2.tsx';
import FormStepV2T2 from '../components/FormStepV2T2.tsx';
import LoadingV2 from '../components/LoadingV2.tsx';

const Question = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isDepthQuestionShow, setIsDepthQuestionShow] = useState(false);
  // const [isBottomSheetShow, setIsBottomSheetShow] = useState(false);
  const [formData, setFormData] = useState<FormDataV2>({
    category: null,
    subCategory: null,
    requestDetails: null,
    subRelationship: null,
    reason: null,
    style: null,
    polite: null,
  });
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const totalStep = 3;

  const navigate = useNavigate();

  const handleSubRelationshipChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      subRelationship: prevFormData.subRelationship
        ? { ...prevFormData.subRelationship, text: value }
        : { id: 1, text: value },
    }));
  };

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

    if (formData.subCategory === null && !isDepthQuestionShow) {
      setIsDepthQuestionShow(true);
      return;
    }

    if (formData.subCategory === null) {
      alert('추가 상황을 입력해주세요');
      return;
    }
    setStep(step + 1);
  };

  const handleNext = () => {
    if (step === 2) {
      if (!formData.subCategory) {
        alert('자세한 요청 사항을 적어주세요');
        return;
      }
    }

    if (step === 3) {
      if (formData.reason === null) {
        alert('거절사유를 입력해주세요');
        return;
      }

      generateSaynoMessage();
      return;
    }

    setStep(step + 1);
  };

  // const onClose = () => {
  //   setIsBottomSheetShow(false);
  // };

  // const goStepTwo = () => {
  //   if (!formData.requestDetails) {
  //     alert('자세한 요청 사항을 적어주세요');
  //     return;
  //   }
  //
  //   setStep(2);
  // };

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
      } else if (name === 'subRelationship') {
        const selectedSubRelationship = RADIO_OPTIONS_V2.SUB_RELATIONSHIP_OPTIONS[formData.category].find(
          (subRelationship) => subRelationship.id === Number(value),
        );
        if (selectedSubRelationship && selectedSubRelationship.id === 1) {
          return {
            ...prevFormData,
            subRelationship: { ...selectedSubRelationship, text: '' },
          };
        } else {
          return {
            ...prevFormData,
            subRelationship: selectedSubRelationship || null,
          };
        }
        return {
          ...prevFormData,
          subRelationship: selectedSubRelationship || null,
        };

        return {
          ...prevFormData,
          subRelationship: value,
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
        return !formData.subRelationship;
      case 3:
        return !formData.reason;
      default:
        return true;
    }
  };

  const generateSaynoMessage = async () => {
    setIsLoading(true);

    const refuseBody = {
      primaryCategory: formData.category,
      secondaryCategory: formData.subCategory,
      relationship: formData.subRelationship ? formData.subRelationship.text : '',
      situation: formData.requestDetails,
      reason: formData.reason ? formData.reason.text : '',
      // narration: formData.style,
      // polite: formData.polite,
    };

    // const emotionBody = {
    //   situationCategory: formData.category,
    //   subSituationCategory: formData.subCategory,
    //   request: formData.requestDetails,
    // };

    try {
      const response1 = await axios.post(`${import.meta.env.VITE_API_URL_V2}/refuse/register`, refuseBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const refuseId = response1?.data?.data;

      // const response2 = await axios.post(`${import.meta.env.VITE_API_URL}/emotion-and-intent/register`, emotionBody, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      //
      // const emotionId = response2?.data?.data;

      navigate(`/result?refuse_id=${refuseId}`);
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
  console.log('step', step);

  return (
    <div>
      {isLoading ? <LoadingV2 /> : null}
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
          labelType={'static'}
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
          labelType={'dynamic'}
        />
      ) : null}
      {/*{step === 1 ? (*/}
      {/*  <BottomSheet*/}
      {/*    bottomSheetTitle={'어떤 요청을 받으셨어요?'}*/}
      {/*    bottomSheetDesciption={'구체적으로 말씀해 주세요'}*/}
      {/*    isShow={isBottomSheetShow}*/}
      {/*    onClose={onClose}*/}
      {/*    onClick={goStepTwo}*/}
      {/*    formData={formData}*/}
      {/*    setFormData={setFormData}*/}
      {/*  />*/}
      {/*) : null}*/}
      {step === 2 ? (
        <FormStepV2T2
          question={
            <>
              부탁에 대한 <br />
              자세한 정보를 알려주세요.
            </>
          }
          options={RADIO_OPTIONS_V2.SUB_RELATIONSHIP_OPTIONS[formData.category]}
          formData={formData}
          name='subRelationship'
          value={formData.subRelationship}
          onChange={handleChange}
          onReasonTextChange={handleSubRelationshipChange}
        />
      ) : null}
      {step === 3 ? (
        <FormStepV2
          question={
            <>
              이제 세이노와 함께 <br />
              거절을 해볼까요?
            </>
          }
          options={RADIO_OPTIONS_V2.REASON_OPTIONS}
          name='reason'
          value={formData.reason}
          onChange={handleChange}
          onReasonTextChange={handleReasonTextChange}
          description={'거절 사유를 입력해주세요!'}
          customLabelFull={true}
          labelType={'dynamic'}
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
