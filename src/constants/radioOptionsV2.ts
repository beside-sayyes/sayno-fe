const RADIO_OPTIONS_V2 = {
  CATEGORY_OPTIONS: ['직장', '일상', '학교'],
  SUB_CATEGORY_OPTIONS: {
    돈: [],
    약속: [],
    학교: ['과제', '기타'],
    회사: ['회식', '업무', '기타'],
    결혼: ['청첩장 모임', '결혼식 참여', '축가 및 축사', '결혼기념일', '기타'],
    기타: [],
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
