import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { nanoid } from 'nanoid';
import NavBar from '../navbar/navbar';
import JavaForallSevices from '../../services/javaForalServices';
import Student from '../../pages/student';
import Home from '../../pages/home';
import ErrorMessage from '../error-message/error-message';
import axios from 'axios';
import './app.css';

const App = (props) => {

    const [users, setUsers] = useState([]);
    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');

    let token = localStorage.getItem("react-token");
  

    useEffect(() => {
        const javaForalServices = new JavaForallSevices();

        javaForalServices
            .getAllUsers()
            .then((response) => {
                console.log(response);
                const elements = response.data;
                setUsers([...elements]);
            })
            .catch((error) => {
                console.error(error);
                if (error.response.data !== undefined && error.response.data !== '') {
                    setIsError(true);
                    setError(error.response.data);
                } else {
                    setIsError(true);
                    setError(error);
                }
            });
    }, []);

    const deleteItem = (id) => {
            setUsers(users.filter(item => item.id !== id));

            const options = {
                method: 'DELETE',
                url: `${process.env.REACT_APP_BASE_URL_DATA}/api/front/developer/${id}`,
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`
                }
            };
            axios
                .request(options)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response.data !== undefined && error.response.data !== '') {
                        setIsError(true);
                        setError(error.response.data);
                    } else {
                        setIsError(true);
                        setError(error);
                    }
                });

    }

    const addItem = (firstName, lastName, patronymic, age, daysWorkList, experience, position, stack) => {
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

        const newArr = [...users, newItem];
        setUsers(newArr);

            const options = {
                method: 'POST',
                url: `${process.env.REACT_APP_BASE_URL_DATA}/api/front/developer`,
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body),
            };
            axios
                .request(options)
                .then(function (response) {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response.data !== undefined && error.response.data !== '') {
                        setIsError(true);
                        setError(error.response.data);
                    } else {
                        setIsError(true);
                        setError(error);
                    }
                });
    }

    const searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.firstName.indexOf(term) > -1
        })
    }

    const onUpdateSearch = (term) => {
        setTerm(term);
    }

    const filterPost = (items, filter) => {
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

    const onFilterSelect = (filter) => {
        setFilter(filter);
    }

    const qunUsers = users.length;
    const visibleData = filterPost(searchEmp(users, term), filter);

    return (
        <div className="app">
            <NavBar username={props.username}/>
            <Routes>
            <Route path="/" element={<Navigate to="/" replace />} />
                <Route path='/main' element={
                    <Home
                        onUpdateSearch={onUpdateSearch}
                        filter={filter}
                        onFilterSelect={onFilterSelect}
                        users={qunUsers}
                        data={visibleData}
                        onDelete={deleteItem}
                        onAdd={addItem}
                    />
                } />
                <Route path="/student/:id" element={<Student />} />
            </Routes>
            <div className="error">
                {isError ?
                    <ErrorMessage
                        error={error}
                        setError={() => setIsError(false)} />
                    : null}
            </div>
        </div>
    );
}

export default App;