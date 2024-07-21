import ProgressBar from '../components/ProgressBar.tsx';
import Header from '../components/Header.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormStep from '../components/FormStep.tsx';
import FixedBottomButtonWrapper from '../components/FixedBottomButtonWrapper.tsx';
import BottomSheet from '../components/BottomSheet.tsx';

const Question = () => {
  const [step, setStep] = useState(1);
  const [isSituationSelected, setIsSituationSelected] = useState(false);
  const [isBottomSheet, setIsBottomSheet] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    requestDetails: '',
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

  // const handleNext = () => {
  //   if (step >= totalStep) {
  //     return;
  //   }
  //
  //   if (step === 1) {
  //     if (subCategoryOptions[formData.category]?.length === 0) {
  //       setIsBottomSheet(true);
  //     } else if (subCategoryOptions[formData.category]?.length > 0) {
  //       setIsSubQuestionShow(true);
  //     } else if (isSubQuestionShow) {
  //       setIsBottomSheet(true);
  //     }
  //   } else if (step === 2) {
  //     setStep(step + 1);
  //   } else if (step === 3) {
  //     alert('step 3입니다.');
  //   }
  // };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const moveBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header onBackClick={moveBack} headerTitle={'요청 입력'} />
      <ProgressBar step={step} totalSteps={totalStep} />
      {step === 1 ? (
        <FormStep
          question='요청 받으신 상황을 선택해주세요!'
          options={categoryOptions}
          name='category'
          value={formData.category}
          onChange={handleChange}
        />
      ) : null}
      {step === 1 && subCategoryOptions[formData.category]?.length > 0 ? (
        <FormStep
          question={`'${formData.category}'를 선택하셨네요! 어떤 상황이셨어요?`}
          options={subCategoryOptions[formData.category]}
          name='subCategory'
          value={formData.subCategory}
          onChange={handleChange}
        />
      ) : null}
      {step === 3 && <BottomSheet />}

      <FixedBottomButtonWrapper onClick={handleNext} />
    </div>
  );
};

export default Question;
