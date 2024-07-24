import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/Base.scss';
import './styles/Global.scss';
import './styles/Icon.scss';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
