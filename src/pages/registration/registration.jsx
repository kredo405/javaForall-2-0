import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ErrorMessage from '../../components/error-message/error-message';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registration.scss';
import axios from 'axios';

const Registration = (props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState([]);
    const [isError, setIsError] = useState(false);
    const history = useNavigate();


    const onValueChange = (e) => {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value);
                break;
            case 'surname':
                setSurname(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'login':
                setLogin(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                return null;
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            firstName: name,
            lastName: surname,
            email: email,
            enabled: true,
            username: login,
            credentials: [
                {
                    "type": "password",
                    "value": `${password}`,
                    "temporary": false
                }
            ],
        }
        const body = {
            client_id: encodeURIComponent('admin-cli'),
            client_secret: encodeURIComponent('ie9vyhnqQ9tE5RutjCtE0FA127qnURWF'),
            grant_type: encodeURIComponent('client_credentials')
        }
        const data = Object.keys(body)
            .map((key) => `${key}=${encodeURIComponent(body[key])}`)
            .join('&');

        const options = {
            method: 'POST',
            url: 'http://localhost:8181/auth/realms/master/protocol/openid-connect/token',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data,
        };

        axios.request(options).then(function (response) {
            console.log(response.data);

            const options = {
                method: 'POST',
                url: 'http://localhost:8181/auth/admin/realms/template/users',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${response.data.access_token}`,
                },
                data: JSON.stringify(userData),
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
                history('/main');
            }).catch(function (error) {
                console.error(error);
                setError(error)
                setIsError(true)
            })

        }).catch(function (error) {
            console.error(error);
        });

    }

    return (
        <div className="registration">
            <div className="registration__title-wrapper">
                <h1 className="registration__title">Регистрация</h1>
            </div>
            <form onSubmit={onSubmit} className="registration__form">
                <Box
                    className="registration__inputs"
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '55ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        required
                        color="secondary"
                        id="outlined-required"
                        label="Имя"
                        name='name'
                        value={name}
                        onChange={onValueChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Фамилия"
                        name='surname'
                        value={surname}
                        onChange={onValueChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        name='email'
                        value={email}
                        onChange={onValueChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Логин"
                        name='login'
                        value={login}
                        onChange={onValueChange}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Пароль"
                        type="password"
                        name='password'
                        autoComplete="current-password"
                        value={password}
                        onChange={onValueChange}
                    />
                </Box>
                <div className="registration__btn-wrapper">
                    <button type="submit"
                        className="btn btn-primary">Зарегистрироваться</button>
                </div>
            </form>
            <div className="registration__erroe">
                {isError ? <ErrorMessage setError={() => setIsError(false)} error={error} /> : null}
            </div>
        </div>

    );
}

export default Registration;