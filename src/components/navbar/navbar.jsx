import { Navbar, Container, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import KeycloakServices from '../../services/keycloakServices';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'
import Keycloak from 'keycloak-js';
import './navbar.scss';

const authorization = () => {
    const keycloak = new Keycloak({
        realm: process.env.REACT_APP_REALM,
        url: `${process.env.REACT_APP_BASE_URL_AUTH}/auth`,
        clientId: process.env.REACT_APP_CLIENTID,
    });

    keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
        .then((auth) => {
            if (!auth) {
                window.location.reload();
            } else {
                console.info("Authenticated");
                localStorage.setItem("react-token", keycloak.token);
                localStorage.setItem("react-refresh-token", keycloak.refreshToken);
                keycloak.loadUserProfile()
                    .then(function (profile) {
                        console.log((profile))
                        localStorage.setItem('user', profile.username);
                    }).catch(function () {
                        console.log('Failed to load user profile');
                    });
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
            }
        }).catch((error) => {
            console.error("Authenticated Failed");
        });
}

const NavBar = (props) => {

    const keycloakServices = new KeycloakServices();
    let userName = localStorage.getItem('user');
    const logout = () => {
        localStorage.clear();
        keycloakServices.logout();
    };

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Link className='link__nav_brand' to={`/main`}>JavaForall</Link>
                <Stack direction="row" spacing={2}>
                    {userName ?
                        <div className="navbar__dropdown">
                            <DropdownButton id="dropdown-basic-button" title={props.user ? props.user : userName}>
                                <Dropdown.Item>
                                    <Link onClick={logout} className='link__nav' to={`/main`}>Выйти</Link>
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                        :
                        <Button onClick={authorization} variant="primary">Войти</Button>}
                </Stack>
            </Container>
        </Navbar>
    )
}

export default NavBar;