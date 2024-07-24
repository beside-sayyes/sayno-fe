import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 네트워크 내 다른 장치도 접근 가능하게 설정, 포트 기본이 5173
  server: {
    host: true,
  },
});
