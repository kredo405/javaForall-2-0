import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid';
import NavBar from '../navbar/navbar';
import JavaForallSevices from '../../services/javaForalServices';
import Student from '../../pages/student';
import Home from '../../pages/home';
import ErrorMessage from '../error-message/error-message';
import axios from 'axios';
import './app.css';

const App = () => {

    const [users, setUsers] = useState([]);
    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    let token = localStorage.getItem("token");
    let expires = localStorage.getItem("expires_in");
    const history = useNavigate();

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
        if (isAuth) {
            setUsers(users.filter(item => item.id !== id));
        } else {
            history('/auth');
        }


        const deleteUser = () => {
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

        if (Date.now() < expires && isAuth) {
            deleteUser();
        } else if (isAuth && Date.now() >= expires) {
            const javaForalServices = new JavaForallSevices();
            javaForalServices.refreshToken(deleteUser);
        }
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

        const addUser = () => {
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

        if (Date.now() < expires && isAuth) {
            addUser();
        } else if (isAuth && Date.now() >= expires) {
            const javaForalServices = new JavaForallSevices();
            javaForalServices.refreshToken(addUser);
        }
        if (isAuth) {
            const newArr = [...users, newItem];
            setUsers(newArr);
        } else {
            history('/auth');
        }
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

    const setAuth = () => {
        setIsAuth(true);
    }
    const setAuthOutput = () => {
        setIsAuth(false);
    }

    const qunUsers = users.length;
    const visibleData = filterPost(searchEmp(users, term), filter);

    console.log(process.env);

    return (
        <div className="app">
            <NavBar isAuth={isAuth} setAuthOutput={() => setAuthOutput()} setIsAuth={() => setAuth()} />
            <Home
                onUpdateSearch={onUpdateSearch}
                filter={filter}
                onFilterSelect={onFilterSelect}
                users={qunUsers}
                data={visibleData}
                onDelete={deleteItem}
                onAdd={addItem}
                isAuth={isAuth}
            />
            <Routes>
                <Route path="/student/:id" element={<Student isAuth={isAuth} />} />
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