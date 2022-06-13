import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../components/error-message/error-message';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import avatar from './photo.jpg';
import './student.scss';
import Keycloak from 'keycloak-js';

const authorization = (setAuth) => {

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

                keycloak.loadUserProfile()
                    .then(function (profile) {
                        console.log((profile))
                        localStorage.setItem('user', profile.username);
                        localStorage.setItem("react-token", keycloak.token);
                        localStorage.setItem("react-refresh-token", keycloak.refreshToken);
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

                return keycloak
            }
        }).catch((error) => {
            console.error("Authenticated Failed");
        });
}

const Student = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [age, setAge] = useState('');
    const [position, setPosition] = useState('');
    const [stack, setStack] = useState([]);
    const [day, setDay] = useState([]);
    const [error, setError] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    let token = localStorage.getItem("react-token");

    useEffect(() => {

        const options = {
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL_DATA}/api/front/developer/${id}`,
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };
        axios
            .request(options)
            .then(function (response) {
                console.log(response);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setPatronymic(response.data.patronymic);
                setAge(response.data.age);
                setPosition(response.data.position);
                setStack(response.data.stack);
                setDay(response.data.daysWorkList);
                setIsLoaded(true);
                setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response.data !== undefined && error.response.data !== '') {
                    setError(error.response.data);
                    setIsLoaded(false);
                    setLoading(true);
                } else {
                    setError(error);
                }
            });

    }, [id]);

    if (loading) {
        return (
            <div>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
                <div className="profile__error">
                    <ErrorMessage setError={() => setIsLoaded(true)} error={error} />
                </div>
            </div>

        )
    } else {
        return (
            <div className="profile">
                <>
                    <div className="profile__img-wrapper">
                        <img src={avatar} alt="аватар" />
                    </div>
                    <div className="profile__info">
                        <h3 className="profile">Информация</h3>
                        <div className="profile__item">
                            <p id='name'>Имя:</p>
                            <label htmlFor="name">{lastName}</label>
                        </div>
                        <div className="profile__item">
                            <p id='name'>Фамилия:</p>
                            <label htmlFor="name">{firstName}</label>
                        </div>
                        <div className="profile__item">
                            <p id='name'>Отчество:</p>
                            <label htmlFor="name">{patronymic}</label>
                        </div>
                        <div className="profile__item">
                            <p id='name'>Возвраст:</p>
                            <label htmlFor="name">{age}</label>
                        </div>
                        <div className="profile__item">
                            <p id='name'>Позиция:</p>
                            <label htmlFor="name">{position}</label>
                        </div>
                        <div className="profile__item">
                            <p id='name'>Стек:</p>
                            <label htmlFor="name">{stack.toString()}</label>
                        </div>
                        <div className="profile__item">
                            <p id='name'>Дни:</p>
                            <label htmlFor="name">{day.toString()}</label>
                        </div>
                    </div>
                    <div className="profile__error">
                        {isLoaded ? null : <ErrorMessage setError={() => setIsLoaded(true)} error={error} />}
                    </div>
                </>
            </div>
        )
    }
}

export default Student