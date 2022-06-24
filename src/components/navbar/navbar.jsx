import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import './navbar.scss';
import Stack from '@mui/material/Stack';;


const NavBar = (props) => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { isAuth } = useSelector(state => state);

    const logout = () => {
        dispatch({ type: 'OUT' })
    };

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Link className='link__nav_brand' to={`/main`}>JavaForall</Link>
                    <Stack direction="row" spacing={2}>
                        {isAuth ?
                            <div>
                                <Button onClick={() => { history('/main'); logout() }} variant="primary">Выйти</Button>
                            </div>
                            :
                            <div>
                                <Button onClick={() => { history('/main/registration') }} variant="primary">Регистрация</Button>
                                <Button onClick={() => { history('/main/auth') }} variant="primary">Войти</Button>
                            </div>}

                    </Stack>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar;