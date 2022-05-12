import { Component } from 'react';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios';
import { nanoid } from 'nanoid'
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
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
// javaForalServices.getUser(id).then(res => console.log(res));

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
        this.setState(({users}) => {
            return {
                users: users.filter(item => item.id !== id)
            }
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
        this.setState(({users}) => {
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
        this.setState({term});
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
        this.setState({filter});
    }

    render() {
        const {users, term, filter} = this.state;
        const qunUsers = this.state.users.length;
        const visibleData = this.filterPost(this.searchEmp(users, term), filter);

        return (
            <div className="app">
                <NavBar/>
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <AppInfo 
                    users={qunUsers}
                />
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;