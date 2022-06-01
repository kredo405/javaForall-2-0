import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: `${process.env.REACT_APP_BASE_URL_AUTH}/auth/`,
  realm: 'template',
  clientId: 'template-service'
});

keycloak.init({ onLoad: 'login-required', "checkLoginIframe": false }).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.info("Authenticated");
  } keycloak.loadUserProfile()
    .then(function (profile) {
      console.log((profile))
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
        <React.StrictMode>
          <BrowserRouter>
            <App username={profile.username}/>
          </BrowserRouter>
        </React.StrictMode>
      );
    }).catch(function () {
      console.log('Failed to load user profile');
    });



  reportWebVitals();


  localStorage.setItem("react-token", keycloak.token);
  localStorage.setItem("react-refresh-token", keycloak.refreshToken);


  setTimeout(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.debug('Token refreshed' + refreshed);
      } else {
        console.warn('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch((error) => {
      console.error('Failed to refresh token');
    });


  }, 60000)


}).catch((error) => {
  console.error("Authenticated Failed");
});






