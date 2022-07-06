import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid';
import NavBar from '../navbar/navbar';
import JavaForallSevices from '../../services/javaForalServices';
import RefreshToken from '../../services/keycloakServices';
import Student from '../../pages/student';
import Home from '../../pages/home';
import ErrorMessage from '../error-message/error-message';
import Auth from '../../pages/auth/auth';
import Registration from '../../pages/registration/registration';
import axios from 'axios';
import './app.css';

const App = () => {

    const [users, setUsers] = useState([]);
    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState('');
    const token = sessionStorage.getItem('token');
    const expiresIn = sessionStorage.getItem('expires_in');
    const isAuth = sessionStorage.getItem('isAuth');
    const history = useNavigate();
    const javaForalServices = new JavaForallSevices();


    const getUsers = () => {

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
    }

    useEffect(() => {
        getUsers();
    }, []);

    const deleteItem = (id) => {
        setUsers(users.filter(item => item.id !== id));
        if (!isAuth) {
            history('/main/auth');
        } else {
            if (Date.now() >= expiresIn) {
                RefreshToken(deleteItem);
            } else {
                const options = {
                    method: 'DELETE',
                    url: `${process.env.REACT_APP_BASE_URL_DATA}/api/front/developer/${id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                axios
                    .request(options)
                    .then((response) => {
                        console.log(response);
                        getUsers();
                    })
                    .catch((error) => {
                        console.error(error);
                        getUsers();
                        if (error.response.data !== undefined && error.response.data !== '') {
                            setIsError(true);
                            setError(error.response.data);
                        } else {
                            setIsError(true);
                            setError(error);
                        }
                    });
            }
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

        const newArr = [...users, newItem];
        setUsers(newArr);
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
            <NavBar user={user} />
            <Routes>
                <Route path="/" element={<Navigate to="/main" replace />} />
                <Route path='/main' element={
                    <Home
                        onUpdateSearch={onUpdateSearch}
                        filter={filter}
                        onFilterSelect={onFilterSelect}
                        users={qunUsers}
                        data={visibleData}
                        onDelete={deleteItem}
                        onAdd={addItem}
                        getUsers={getUsers}
                    />
                } />
                <Route path="/main/student/:id" element={
                    <Student auth={auth} setAuth={() => setAuth()} setUser={(user) => setUser()} />} />
                <Route path="/main/auth" element={
                    <Auth />} />
                <Route path="/main/registration" element={
                    <Registration />} />
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