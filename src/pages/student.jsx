import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import avatar from './photo.jpg';
import './student.scss';

const Student = () => {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [patronymic, setPatronymic] = useState(null);
    const [age, setAge] = useState(null);
    const [position, setPosition] = useState(null);
    const [stack, setStack] = useState([]);
    const [day, setDay] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetch(`https://javaforall.tech/api/front/developer/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setFirstName(result.firstName);
                    setLastName(result.lastName);
                    setPatronymic(result.patronymic);
                    setAge(result.age);
                    setPosition(result.position);
                    setStack(result.stack);
                    setDay(result.daysWorkList);
                    console.log(result)

                },
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);
                }
            )
    }, [])

    return (
        <div className="profile">
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
        </div>
    )
}




export default Student