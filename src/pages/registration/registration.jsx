import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import './registration.scss';

const Registration = (props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onValueChange = (e) => {
        console.log(e);
        switch(e.target.id) {
            case 'outlined-required name':
                setName(e.target.value);
            case ''    
        }
    }

    return (
        <div className="registration">
            <div className="registration__title-wrapper">
                <h1 className="registration__title">Регистрация</h1>
            </div>
            <form className="registration__form">
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
                        value={name}
                        onChange={onValueChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Фамилия"
                        value={surname}
                        onChange={setSurname}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Отчество"
                        value={patronymic}
                        onChange={setPatronymic}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        value={email}
                        onChange={setEmail}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Логин"
                        value={login}
                        onChange={setLogin}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Пароль"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={setPassword}
                    />
                </Box>
                    <div className="registration__btn-wrapper">
                    <button type="submit"
                        className="btn btn-primary">Зарегистрироваться</button>
                    </div>
            </form>
        </div>

    );
}

export default Registration;