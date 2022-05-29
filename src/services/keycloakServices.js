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
        })

        return res;
    }
    keycloakLogout = () => {
        window.location.href = `${process.env.REACT_APP_BASE_URL_AUTH}/auth/realms/template/protocol/openid-connect/logout?redirect_uri=http://localhost:3000`;
    }

    login = () => {
        return this.keycloakLogin();
    }
    logout = () => {
        return this.keycloakLogout();
    }
}

export default KeycloakServices;