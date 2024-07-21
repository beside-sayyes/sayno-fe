import ProgressBar from '../components/ProgressBar.tsx';
import Header from '../components/Header.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormStep from '../components/FormStep.tsx';
import FixedBottomButtonWrapper from '../components/FixedBottomButtonWrapper.tsx';
import BottomSheet from '../components/BottomSheet.tsx';

interface FormData {
  category: string | null;
  subCategory: string | null;
  requestDetails: string | null;
}

const Question = () => {
  const [step, setStep] = useState(1);
  const [isDepthQuestionShow, setIsDepthQuestionShow] = useState(false);
  const [isBottomSheetShow, setIsBottomSheetShow] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    category: null,
    subCategory: null,
    requestDetails: null,
  });

  const totalStep = 3;
  const categoryOptions = ['돈', '약속', '학교', '회사', '결혼', '기타'];
  const subCategoryOptions = {
    돈: [],
    약속: [],
    학교: ['과제'],
    회사: ['회식', '업무'],
    결혼: ['청첩장 모임', '결혼식 참여', '축가 및 축사', '결혼기념일'],
    기타: [],
  };

  console.log('formData', formData);

  const handleStepOneNext = () => {
    if (formData.category === null) {
      alert('상황을 입력해주세요');
    }

    if (subCategoryOptions[formData.category]?.length === 0) {
      setIsBottomSheetShow(true);
    } else if (
      subCategoryOptions[formData.category]?.length > 0 &&
      formData.subCategory === null &&
      !isDepthQuestionShow
    ) {
      setIsDepthQuestionShow(true);
    } else if (isDepthQuestionShow) {
      if (formData.subCategory === null) {
        alert('추가 상황을 입력해주세요');
        return;
      }
    } else if (subCategoryOptions[formData.category]?.length > 0 && formData.subCategory) {
      setIsBottomSheetShow(true);
    }
  };

  const handleNext = () => {
    if (step === totalStep) {
      return;
    }

    setStep(step + 1);
  };

  const onClose = () => {
    setIsBottomSheetShow(false);
  };

  const goStepTwo = () => {
    setStep(2);
  };

  const handleStepOneBack = () => {
    if (isDepthQuestionShow) {
      setIsDepthQuestionShow(false);
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
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };

  const navigate = useNavigate();

  return (
    <div>
      <Header onBackClick={step === 1 ? handleStepOneBack : handleBack} headerTitle={'요청 입력'} />
      <ProgressBar step={step} totalSteps={totalStep} />
      {step === 1 && !isDepthQuestionShow ? (
        <FormStep
          question='요청 받으신 상황을 선택해주세요!'
          options={categoryOptions}
          name='category'
          value={formData.category}
          onChange={handleChange}
        />
      ) : null}
      {step === 1 && isDepthQuestionShow && formData.category ? (
        <FormStep
          question={`'${formData.category}'를 선택하셨네요! 어떤 상황이셨어요?`}
          options={subCategoryOptions[formData.category]}
          name='subCategory'
          value={formData.subCategory}
          onChange={handleChange}
        />
      ) : null}
      {step === 1 ? (
        <BottomSheet
          bottomSheetTitle={'어떤 요청을 받으셨어요?'}
          isShow={isBottomSheetShow}
          onClose={onClose}
          onClick={goStepTwo}
          formData={formData}
          setFormData={setFormData}
        />
      ) : null}
      <FixedBottomButtonWrapper buttonText={'다음'} onClick={step === 1 ? handleStepOneNext : handleNext} />
    </div>
  );
};

export default Question;
