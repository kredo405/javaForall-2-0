import { Component } from 'react';
import { Routes, Route } from 'react-router-dom'
import { nanoid } from 'nanoid';
import NavBar from '../navbar/navbar';
import JavaForallSevices from '../../services/javaForalServices';
import Student from '../../pages/student';
import Home from '../../pages/home';
import ErrorMessage from '../error-message/error-message';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.updateUsers();
    }
    state = {
        users: [],
        term: '',
        filter: 'all',
        isError: false,
        error: '',
    }

    javaForalServices = new JavaForallSevices();
    errorFalse = () => {
        this.setState(() => {
            return {
                isError: false,
            }
        });
    }

    updateUsers = () => {
        this.javaForalServices
            .getAllUsers()
            .then(res => {
                console.log(res)
                const elements = res;
                this.setState({
                    users: [...elements],
                })
            }).catch(function (error) {
                console.error(error);
                this.setState(() => {
                    return {
                        isError: true,
                        error: error
                    }
                });
            });
    }

    deleteItem = (id) => {
        this.setState(({ users }) => {
            return {
                users: users.filter(item => item.id !== id)
            }
        })
        fetch(`https://javaforall.tech/api/front/developer/${id}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        }).catch((error) => {
            console.error(error);
            this.setState(() => {
                return {
                    isError: true,
                    error: error
                }
            });
        });
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
        const body = {
            age,
            daysWorkList,
            experience,
            firstName,
            lastName,
            patronymic,
            position,
            stack,
        }
        fetch('https://javaforall.tech/api/front/developer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(body)
        }).then(response => console.log(response))
            .catch((error) => {
                console.error(error);
                this.setState(() => {
                    return {
                        isError: true,
                        error: error
                    }
                });
            });

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
        const { users, term, filter, isError, error, } = this.state;
        const qunUsers = this.state.users.length;
        const visibleData = this.filterPost(this.searchEmp(users, term), filter);

        if (isError) {
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
                    <div className="error">
                        <ErrorMessage func={() => this.errorFalse()} error={error} />
                    </div>
                </div>
            );
        } else {
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
}

export default App;