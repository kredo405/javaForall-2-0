import { Component } from 'react';
import './users-add-form.scss';
import qs from 'qs';
import axios from 'axios';

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

            const body = {
                age: this.state.age,
                daysWorkList: this.state.daysWorkList,
                experience: this.state.experience,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                patronymic: this.state.patronymic,
                position: this.state.position,
                stack: this.state.stack,
            }
    
                const options = {
                    method: 'post',
                    url: `${process.env.REACT_APP_BASE_URL_DATA}/api/front/developer`,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    data: JSON.stringify(body),
                }
                axios
                    .request(options)
                    .then((response) => {
                        console.log(response);
                        this.props.getUsers();
                    })
                    .catch((error) => {
                        console.error(error);
                        this.props.getUsers();
                        if (error.response.data !== undefined && error.response.data !== '') {
                            // setIsError(true);
                            // setError(error.response.data);
                        } else {
                            // setIsError(true);
                            // setError(error);
                        }
                    });

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
                <h3>???????????????? ????????????</h3>
                <form
                    className="add-form"
                    onSubmit={this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="??????"
                        name="firstName"
                        value={firstName}
                        onChange={this.onValueChange} />
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="??????????????"
                        name="lastName"
                        value={lastName}
                        onChange={this.onValueChange} />
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="????????????????"
                        name="patronymic"
                        value={patronymic}
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="????????"
                        name="experience"
                        value={experience}
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="????????????????"
                        name="age"
                        value={age}
                        onChange={this.onValueChange} />
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="??????????????"
                        name="position"
                        value={position}
                        onChange={this.onValueChange} />
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="???????? ?????????? ????????????(?????? ??????????????)"
                        name="stack"
                        value={stackValue}
                        onChange={this.onStackChange} />
                    <div className="dayChecbox">
                        <p><input checked={checkBox.MONDAY} className='checkBox' onChange={this.onValueChecked} type="checkbox" name="MONDAY" id='1' /><label htmlFor="1">??????????????????????</label></p>
                        <p><input checked={checkBox.TUETHDAY} className='checkBox' onChange={this.onValueChecked} type="checkbox" name="TUETHDAY" id='2' /><label htmlFor="2">??????????????</label></p>
                        <p><input checked={checkBox.WEDNESDAY} className='checkBox' onChange={this.onValueChecked} type="checkbox" name="WEDNESDAY" id='3' /><label htmlFor="3">??????????</label></p>
                        <p><input checked={checkBox.THURSDAY} className='checkBox' onChange={this.onValueChecked} type="checkbox" name="THURSDAY" id='4' /><label htmlFor="4">??????????????</label></p>
                        <p><input checked={checkBox.FRIDAY} className='checkBox' onChange={this.onValueChecked} type="checkbox" name="FRIDAY" id='5' /><label htmlFor="5">??????????????</label></p>
                        <p><input checked={checkBox.SATURDAY} className='checkBox' onChange={this.onValueChecked} type="checkbox" name="SATURDAY" id='6' /><label htmlFor="6">??????????????</label></p>
                        <p><input checked={checkBox.SUNDAY} className='checkBox' onChange={this.onValueChecked} type="checkbox" name="SUNDAY" id='7' /><label htmlFor="7">??????????????????????</label></p>
                    </div>
                    <button type="submit"
                        className="btn btn-outline-light">????????????????</button>
                </form>
            </div>
        )
    }
}

export default UsersAddForm;