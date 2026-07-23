
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './lib/i18n.js';
import { registerServiceWorker } from './registerSW.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>,
);

registerServiceWorker();
