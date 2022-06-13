import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { nanoid } from 'nanoid';
import NavBar from '../navbar/navbar';
import JavaForallSevices from '../../services/javaForalServices';
import Student from '../../pages/student';
import Home from '../../pages/home';
import ErrorMessage from '../error-message/error-message';
import axios from 'axios';
import Keycloak from 'keycloak-js';
import './app.css';


const authorization = (setUser) => {
    const keycloak = new Keycloak({
        realm: process.env.REACT_APP_REALM,
        url: `${process.env.REACT_APP_BASE_URL_AUTH}/auth`,
        clientId: process.env.REACT_APP_CLIENTID,
    });

    keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
        .then((auth) => {
            if (!auth) {
                window.location.reload();
            } else {
                console.info("Authenticated");
                localStorage.setItem("react-token", keycloak.token);
                localStorage.setItem("react-refresh-token", keycloak.refreshToken);
                keycloak.loadUserProfile()
                    .then(function (profile) {
                        console.log((profile))
                        localStorage.setItem('user', profile.username);
                        setUser(profile.username);
                    }).catch(function () {
                        console.log('Failed to load user profile');
                    });
                setTimeout(() => {
                    keycloak.updateToken(70).then((refreshed) => {
                        if (refreshed) {
                            console.debug('Token refreshed' + refreshed);
                        } else {
                            console.warn('Token not refreshed, valid for '
                                + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
                        }
                    }).catch((error) => {
                        console.error('Failed to refresh token');
                    });
                }, 60000)
            }
        }).catch((error) => {
            console.error("Authenticated Failed");
        });
}

const App = (props) => {

    const [users, setUsers] = useState([]);
    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState('');

    let token = localStorage.getItem("react-token");
    let session = localStorage.key(0);


    const getUsers = () => {
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
    }

    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        if(!token && session) {
            authorization(setUser);
        }
    });
    

    const deleteItem = (id) => {
        setUsers(users.filter(item => item.id !== id));
        if (!token) {
            authorization();
        } else {
            const options = {
                method: 'DELETE',
                url: `${process.env.REACT_APP_BASE_URL_DATA}/api/front/developer/${id}`,
                mode: 'cors',
                headers: {
                    // 'Access-Control-Allow-Origin': '*',
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
                    }else {
                        setIsError(true);
                        setError(error);
                    }
                });
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
                    />
                } />
                <Route path="/main/student/:id" element={
                    <Student auth={auth} setAuth={() => setAuth()} setUser={(user) => setUser()}/>} />
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