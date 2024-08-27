const RADIO_OPTIONS_V2 = {
  CATEGORY_OPTIONS: ['직장', '일상', '학교'],
  SUB_CATEGORY_OPTIONS: {
    직장: ['업무', '회식/모임', '교육/훈련', '인사 관련', '동료 부탁', '기타'],
    일상: ['사회적 모임', '금전', '약속', '기타'],
    학교: ['과제', '스터디', '행사', '기타'],
  },
  SUB_CATEGORY_DESC_OPTIONS: {
    업무: '추가적인 업무요청',
    '회식/모임': '참석하기 싫은',
    '교육/훈련': '참석하기 싫은',
    '인사 관련': '갑작스러운 면담',
    '동료 부탁': '갑작스러운',
    '사회적 모임': '결혼식, 동창회 등',
    금전: '곤란한',
    약속: '참석하기 싫은',
    과제: '하기 싫은',
    스터디: '참석하기 싫은',
    행사: '참석하기 싫은',
    기타: '',
  },
  SUB_RELATIONSHIP_OPTIONS: {
    직장: [
      {
        id: 2,
        text: '직장동료',
      },
      {
        id: 3,
        text: '직장상사',
      },
      {
        id: 4,
        text: '거래처',
      },
      {
        id: 5,
        text: '대표',
      },
      {
        id: 6,
        text: '부하직원',
      },
      {
        id: 1,
        text: '직접입력',
      },
    ],
    일상: [
      {
        id: 2,
        text: '친구',
      },
      {
        id: 3,
        text: '지인',
      },
      {
        id: 4,
        text: '가족',
      },
      {
        id: 5,
        text: '모르는 사람',
      },
      {
        id: 1,
        text: '직접입력',
      },
    ],
    학교: [
      {
        id: 2,
        text: '선배',
      },
      {
        id: 3,
        text: '후배',
      },
      {
        id: 4,
        text: '동기',
      },
      {
        id: 5,
        text: '교수님/선생님',
      },
      {
        id: 1,
        text: '직접입력',
      },
    ],
  },
  GENDER_OPTIONS: ['남자', '여자'],
  AGE_OPTIONS: ['10대', '20대', '30대', '40대', '50대'],
  REASON_OPTIONS: [
    {
      id: 1,
      text: '직접 입력',
    },
    {
      id: 2,
      text: '일정이 안돼서',
    },
    {
      id: 3,
      text: '돈이 없어서',
    },
    {
      id: 4,
      text: '세이노가 알아서 해줘',
    },
  ],
  STYLE_OPTIONS: ['다정하게', '직구로', '유머러스하게'],
  POLITE_OPTIONS: ['존댓말 사용', '반말 사용'],
};

export default RADIO_OPTIONS_V2;
