import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import RefreshToken from '../services/keycloakServices'
import ErrorMessage from '../components/error-message/error-message';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import avatar from './photo.jpg';
import './student.scss';

const Student = () => {

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
    const history = useNavigate();

    const { id } = useParams();
    const { token, isAuth } = useSelector(state => state);

    const getInfo = () => {
        if(isAuth) {
            // if(Date.now() >= token.expires_in) {
            //     // RefreshToken(getInfo);
            // } else {
                const options = {
                    method: 'GET',
                    url: `${process.env.REACT_APP_BASE_URL_DATA}/api/front/developer/${id}`,
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
            // }
            
        } else {
            history('/main/auth');
        }
    }

    useEffect(() => {  
        getInfo();
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