import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import config from './Api/ApiConfig';
import { configure } from 'axios-hooks';

configure({ axios: config });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
