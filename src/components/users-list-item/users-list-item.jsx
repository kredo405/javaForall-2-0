import { Link } from 'react-router-dom'
import './users-list-item.css';
import Keycloak from 'keycloak-js';

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


const UsersListItem = (props) => {
    const { firstName, lastName, patronymic, onDelete, id} = props;
    let token = localStorage.getItem("react-token");
    return (
        <li className="list-group-item d-flex justify-content-between">
            {token ?
            <Link className='link' to={`/main/student/${id}`}>
            <span className="list-group-item-label">
                {firstName + ' ' + lastName + ' ' + patronymic}
            </span>
        </Link>
            :
            <a href='#' onClick={authorization} className='link' >
                <span className="list-group-item-label">
                    {firstName + ' ' + lastName + ' ' + patronymic}
                </span>
            </a>
            }
            
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                    className="btn-trash btn-sm "
                    onClick={onDelete}
                >
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </li>
    )
}

export default UsersListItem;