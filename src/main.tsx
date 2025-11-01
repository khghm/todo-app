import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// بررسی کنید element با id='root' وجود دارد
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Element با id="root" پیدا نشد!');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);