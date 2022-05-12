import { Component } from 'react';
import { Routes, Route } from 'react-router-dom'
import { nanoid } from 'nanoid';
import NavBar from '../navbar/navbar';
import JavaForallSevices from '../../services/javaForalServices';
import Student from '../../pages/student';
import Home from '../../pages/home';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.updateUsers();
    }
    state = {
        users: [],
        term: '',
        filter: 'all'
    }

    javaForalServices = new JavaForallSevices();

    updateUsers = () => {
        this.javaForalServices
            .getAllUsers()
            .then(res => {
                console.log(res.data)
                const elements = res.data;
                this.setState({
                    users: [...elements],
                })
            })
    }

    deleteItem = (id) => {
        this.setState(({ users }) => {
            return {
                users: users.filter(item => item.id !== id)
            }
        })
        fetch(`https://javaforall.tech/api/front/developer/${id}`, {
            method: 'DELETE'
        })
    }

    addItem = (firstName, lastName, patronymic, age, daysWorkList, experience, position, stack) => {
        const randomId = nanoid()
        const newItem = {
            age,
            daysWorkList,
            experience,
            firstName,
            lastName,
            patronymic,
            position,
            stack,
            id: randomId,
        }
        fetch('https://javaforall.tech/api/front/developer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newItem)
        }).then(response => console.log(response));

        this.setState(({ users }) => {
            const newArr = [...users, newItem];
            return {
                users: newArr
            }
        });
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.firstName.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({ term });
    }



    filterPost = (items, filter) => {
        switch (filter) {
            case 'MONDAY':
                return items.filter(item => item.daysWorkList.includes('MONDAY'));
            case 'TUETHDAY':
                return items.filter(item => item.daysWorkList.includes('TUETHDAY'));
            case 'WEDNESDAY':
                return items.filter(item => item.daysWorkList.includes('WEDNESDAY'));
            case 'THURSDAY':
                return items.filter(item => item.daysWorkList.includes('THURSDAY'));
            case 'FRIDAY':
                return items.filter(item => item.daysWorkList.includes('FRIDAY'));
            case 'SATURDAY':
                return items.filter(item => item.daysWorkList.includes('SATURDAY'));
            case 'SUNDAY':
                return items.filter(item => item.daysWorkList.includes('SUNDAY'));
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({ filter });
    }

    render() {
        const { users, term, filter } = this.state;
        const qunUsers = this.state.users.length;
        const visibleData = this.filterPost(this.searchEmp(users, term), filter);

        return (
            <div className="app">
                <NavBar />
                <Routes>
                    <Route path="/" element={
                        <Home
                            onUpdateSearch={this.onUpdateSearch}
                            filter={filter}
                            onFilterSelect={this.onFilterSelect}
                            users={qunUsers}
                            data={visibleData}
                            onDelete={this.deleteItem}
                            onToggleProp={this.onToggleProp}
                            onAdd={this.addItem}
                        />
                    } />
                    <Route path="/student/:id" element={
                        <Student />
                    } />
                </Routes>
            </div>
        );
    }
}

export default App;