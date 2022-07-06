import { useState } from "react";
import { Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import './auth.scss';
import ErrorMessage from '../../components/error-message/error-message';
import { useDispatch } from "react-redux";



const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useNavigate();

    const onChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            'grant_type': 'password',
            'client_id': process.env.REACT_APP_CLIENTID,
            'client_secret': process.env.REACT_APP_CLIENT_SECRET,
            'username': email,
            'password': password
        }

        const options = {
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL_AUTH}/auth/realms/template/protocol/openid-connect/token`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
        }
        axios(options)
            .then(function (response) {
                console.log(response);
                setError(false);
                history(-1);
                setIsLoading(false);
                sessionStorage.setItem('token', response.data.access_token);
                sessionStorage.setItem('refresh_token', response.data.refresh_token);
                sessionStorage.setItem('expires_in', Date.now() + (response.data.expires_in * 1000));
                sessionStorage.setItem('isAuth', true);
            })
            .catch(function (error) {
                console.error(error);
                setError(true);
                setIsLoading(false);
                if (error.response.data !== undefined && error.response.data !== '') {
                    setErrorMessage(error.response.data);
                } else {
                    setErrorMessage(error);
                }
            });
    }

    return (
        <div className="auth">
            <div className="auth__title">
                <h1>Авторизация</h1>
            </div>
            <div className="auth__form">
                {isLoading ?
                    <div className="spinner__wrapper">
                        <Spinner animation="grow" variant="primary" />
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="danger" />
                        <Spinner animation="grow" variant="warning" />
                        <Spinner animation="grow" variant="info" />
                        <Spinner animation="grow" variant="light" />
                    </div>
                    :
                    <Form className="form" onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control required className="auth__input" onChange={onChange} name='email' value={email} type="text" placeholder="Введите email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control required className="auth__input" onChange={onChange} name='password' value={password} type="password" placeholder="Введите пароль" />
                        </Form.Group>
                        <div className="auth__button">
                            <Button variant="primary" type="submit">
                                Вход
                            </Button>
                        </div>
                    </Form>
                }
            </div>
            <div className="error">
                {error ? <ErrorMessage error={errorMessage} /> : null}
            </div>
        </div>
    )
}

export default Auth;

