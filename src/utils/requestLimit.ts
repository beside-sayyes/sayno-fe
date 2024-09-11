// 요청 한도를 설정합니다.
const REQUEST_LIMIT = 3;
const ONE_HOUR_IN_MS = 60 * 60 * 1000;
const STORAGE_KEY = 'requestCount';
const STORAGE_TIMESTAMP_KEY = 'lastRequestTimestamp';

// 1시간 경과 여부 확인
export const isOneHourPassed = (timestamp: number): boolean => {
  const now = Date.now();
  return now - timestamp > ONE_HOUR_IN_MS;
};

// 초기화
export const initializeRequestCount = (): void => {
  localStorage.setItem(STORAGE_KEY, '0');
  localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());
};

// 현재 요청 카운트 가져옴
export const getRequestCount = (): number => {
  const count = localStorage.getItem(STORAGE_KEY);
  const lastTimestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY);

  // 별도 저장된 값이 없으면 초기화
  if (!count || !lastTimestamp) {
    initializeRequestCount();
    return 0;
  }

  const timestamp = parseInt(lastTimestamp, 10);

  // 1시간이 지났으면 초기화
  if (isOneHourPassed(timestamp)) {
    initializeRequestCount();
    return 0;
  }

  return parseInt(count, 10);
};

// 카운트 증가
export const incrementRequestCount = (): void => {
  let count = getRequestCount();
  count += 1;
  localStorage.setItem(STORAGE_KEY, count.toString());
  localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());
};

// 요청 가능 여부 체크
export const canMakeRequest = (): boolean => {
  return getRequestCount() < REQUEST_LIMIT;
};
