import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../components/error-message/error-message';
import { _BASE_URL_DATA } from '../services/javaForalServices';
import { Spinner } from 'react-bootstrap';
import JavaForallSevices from '../services/javaForalServices';
import axios from 'axios';
import avatar from './photo.jpg';
import './student.scss';

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
    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        let expires = localStorage.getItem("expires_in");
        let token = localStorage.getItem("token");

        const getProfileInfo = () => {
            const options = {
                method: 'GET',
                url: `${_BASE_URL_DATA}/api/front/developer/${id}`,
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            };
            axios
            .request(options)
            .then(function (response) {
                console.log(response);
                setFirstName(response.firstName);
                setLastName(response.lastName);
                setPatronymic(response.patronymic);
                setAge(response.age);
                setPosition(response.position);
                setStack(response.stack);
                setDay(response.daysWorkList);
                setIsLoaded(true);
                setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response.data !== undefined && error.response.data !== '') {
                    setError(error.response.data);
                    setIsLoaded(false);
                    setLoading(false);
                } else {
                    setError(error);
                    setIsLoaded(false);
                    setLoading(false);
                }
            });
        }

        const javaForalServices = new JavaForallSevices();

        if (Date.now() >= expires) {
            setLoading(true);
            javaForalServices.refreshToken(getProfileInfo);
        } else  {
            getProfileInfo();
        }
    }, [id]);

    return (
        <div className="profile">
            {loading ?
                <div className="profile__spinner">
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="success" />
                    <Spinner animation="grow" variant="danger" />
                    <Spinner animation="grow" variant="warning" />
                    <Spinner animation="grow" variant="info" />
                    <Spinner animation="grow" variant="light" />
                </div> :
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
                </>}
        </div>
    )
}

export default Student