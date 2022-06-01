import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
    url: `${process.env.REACT_APP_BASE_URL_AUTH}/auth/`,
    realm: 'template',
    clientId: 'template-service'
});

export default keycloak;