import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Keycloak from 'keycloak-js';

const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
          <BrowserRouter>
            <App />
          </BrowserRouter>
      );

      reportWebVitals();








