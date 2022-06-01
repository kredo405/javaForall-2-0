import Keycloak from 'keycloak-js'

class KeycloakServices {
    keycloakLogin = async () => {
        const keycloak = new Keycloak({
            url: `${process.env.REACT_APP_BASE_URL_AUTH}/auth/`,
            realm: 'template',
            clientId: 'template-service'
        });

        let res = keycloak.init({
            onLoad: 'login-required'
        }).then(function (authenticated) {
            console.log(authenticated ? 'authenticated' : 'not authenticated');
        }).catch(function () {
            console.log('failed to initialize');
        });
        // .then((auth) => {
        //     if (!auth) {
        //       // Если пользователь не авторизован - перезагрузить страницу
        //       window.location.reload();
        //     } else {
        //       console.log("Authenticated");
        //     }
          
        //     // Пытаемся обновить токен каждые 6 секунд
        //     setInterval(() => {
        //       // Обновляем токен, если срок его действия истекает в течении 70 секунд
        //       keycloak.updateToken(70).then((refreshed) => {
        //         if (refreshed) {
        //           console.log('Token refreshed' + refreshed);
        //         } else {
        //           console.log('Token not refreshed, valid for '
        //             + Math.round(keycloak.tokenParsed.exp
        //             + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
        //         }
        //       }).catch(() => {
        //         console.log('Failed to refresh token');
        //       });
        //     }, 6000)
          
        //   }).catch(() => {
        //     console.log("Authenticated Failed");
        //   });

        return res;
    }
    keycloakLogout = () => {
        window.location.href = `${process.env.REACT_APP_BASE_URL_AUTH}/auth/realms/template/protocol/openid-connect/logout?redirect_uri=http://localhost:3000/main`;
    }

    login = () => {
        return this.keycloakLogin();
    }
    logout = () => {
        return this.keycloakLogout();
    }
}

export default KeycloakServices;