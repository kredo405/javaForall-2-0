class KeycloakServices {
    keycloakLogout = () => {
        window.location.href = `${process.env.REACT_APP_BASE_URL_AUTH}/auth/realms/${process.env.REACT_APP_REALM}/protocol/openid-connect/logout?redirect_uri=${process.env.REACT_APP_REDIRECT_URL }`;
    }
    logout = () => {
        return this.keycloakLogout();
    }
}

export default KeycloakServices;