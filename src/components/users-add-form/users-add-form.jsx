import { Component } from 'react';
import './users-add-form.scss';

class UsersAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            patronymic: '',
            age: '',
            daysWorkList: [],
            experience: '',
            position: '',
            stack: '',
            stackValue: '',
            checkBox: {
                MONDAY: false,
                TUETHDAY: false,
                WEDNESDAY: false,
                THURSDAY: false,
                FRIDAY: false,
                SATURDAY: false,
                SUNDAY: false,
            }
        }
    }
    strStack = ''

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onValueChecked = (e) => {
        const checkObj = {};
        for (let key in this.state.checkBox) {
            if (key === e.target.name) {
                checkObj[key] = !this.state.checkBox[key];
            } else {
                checkObj[key] = this.state.checkBox[key];
            }
        }
        this.setState({
            checkBox: checkObj
        })
        setTimeout(() => {
            let arrChecked = []
            for (let key in this.state.checkBox) {
                if (this.state.checkBox[key] === true) {
                    arrChecked.push(key);
                }
            }
            this.setState({
                daysWorkList: arrChecked
            })
        }, 100);
    }

    onStackChange = (e) => {
        this.strStack = e.target.value;
        this.setState({
            stack: this.strStack.trim().split(' '),
            stackValue: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.firstName, this.state.lastName, this.state.patronymic,
            this.state.age, this.state.daysWorkList, this.state.experience,
            this.state.position, this.state.stack);

        this.setState({
            firstName: '',
            lastName: '',
            patronymic: '',
            age: '',
            daysWorkList: [],
            experience: '',
            position: '',
            stack: '',
            stackValue: '',
            checkBox: {
                MONDAY: false,
                TUETHDAY: false,
                WEDNESDAY: false,
                THURSDAY: false,
                FRIDAY: false,
                SATURDAY: false,
                SUNDAY: false,
            }
        })
    }

    render() {
        const { firstName, lastName, patronymic, age, experience, position, checkBox, stackValue } = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового</h3>
                <form
                    className="add-form"
                    onSubmit={this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Имя"
                        name="firstName"
                        value={firstName}
                        onChange={this.onValueChange} />
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Фамилия"
                        name="lastName"
                        value={lastName}
                        onChange={this.onValueChange} />
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Отчество"
                        name="patronymic"
                        value={patronymic}
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="Опыт"
                        name="experience"
                        value={experience}
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="Возвраст"
                        name="age"
                        value={age}
                        onChange={this.onValueChange} />
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Позиция"
                        name="position"
                        value={position}
                        onChange={this.onValueChange} />
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Стек через пробел(без запятых)"
                        name="stack"
                        value={stackValue}
                        onChange={this.onStackChange} />
                    <div className="dayChecbox">
                        <p><input checked={checkBox.MONDAY} className='checkBox' onChange={this.onValueChecked} type="checkbox" name="MONDAY" id='1' /><label htmlFor="1">Понедельник</label></p>
                        <p><input checked={checkBox.TUETHDAY} className='checkBox' onChange={this.onValueChecked} type="checkbox" name="TUETHDAY" id='2' /><label htmlFor="2">Вторник</label></p>
                        <p><input checked={checkBox.WEDNESDAY} className='checkBox' onChange={this.onValueChecked} type="checkbox" name="WEDNESDAY" id='3' /><label htmlFor="3">Среда</label></p>
                        <p><input checked={checkBox.THURSDAY} className='checkBox' onChange={this.onValueChecked} type="checkbox" name="THURSDAY" id='4' /><label htmlFor="4">Четверг</label></p>
                        <p><input checked={checkBox.FRIDAY} className='checkBox' onChange={this.onValueChecked} type="checkbox" name="FRIDAY" id='5' /><label htmlFor="5">Пятница</label></p>
                        <p><input checked={checkBox.SATURDAY} className='checkBox' onChange={this.onValueChecked} type="checkbox" name="SATURDAY" id='6' /><label htmlFor="6">Суббота</label></p>
                        <p><input checked={checkBox.SUNDAY} className='checkBox' onChange={this.onValueChecked} type="checkbox" name="SUNDAY" id='7' /><label htmlFor="7">Воскресенье</label></p>
                    </div>
                    <button type="submit"
                        className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
}

export default UsersAddForm;