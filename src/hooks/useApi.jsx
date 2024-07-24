import axios from 'axios';
import UAParser from 'ua-parser-js';

const useApi = () => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const parser = new UAParser();
  const { browser, device } = parser.getResult();

  const config = {
    osName: 'Web',
    appVersion: '0.0.2', // TODO: 라이브 배포 시 최신 버전으로 업데이트
    deviceModel: device?.model,
    userTimeZone: userTimeZone,
    deviceType: device?.type === undefined ? 'desktop' : device?.type, // desktop의 경우 parser의 반환값이 undefined라 별도의 string 부여
    browserName: browser?.name,
    browserVersion: browser?.version,
  };

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'os-name': config.osName,
      'app-version': config.appVersion,
      'device-model': config.deviceModel,
      'user-time-zone': config.userTimeZone,
      'device-type': config.deviceType,
      'browser-name': config.browserName,
      'browser-version': config.browserVersion,
    },
  });

  return api;
};

export default useApi;
