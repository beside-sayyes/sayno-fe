import ResultHeader from '../components/ResultHeader.tsx';
import PrimaryButton from '../components/PrimaryButton.tsx';
import Footer from '../components/Footer.tsx';

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
        <h3>먼저, 요청받으신 상황을 해석해드릴게요.</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto commodi dignissimos dolorem ducimus
          eum eveniet incidunt ipsum maiores maxime nisi non numquam porro quos sed, sit temporibus totam voluptatum?
        </p>
      </div>
      <div>
        <h3>이렇게 거절하시는거 어떠세요?</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto commodi dignissimos dolorem ducimus
          eum eveniet incidunt ipsum maiores maxime nisi non numquam porro quos sed, sit temporibus totam voluptatum?
        </p>
      </div>
      <div>
        <p>거절 멘트 생성 서비스 SAYNO, 친구에게도 추천해주세요</p>
        <PrimaryButton buttonText={'추천하기'} onClick={() => handleCopyClipBoard('https:/sayno.com')} />
      </div>
      <Footer />
    </div>
  );
};

export default Result;
