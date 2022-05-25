import { Navbar, Container, Nav } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'
import './navbar.scss';

const NavBar = (props) => {
    const { isAuth, setIsAuth } = props;

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/"><Link className='link__nav' to={`/`}>JavaForall</Link></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Главная</Nav.Link>
                </Nav>
                <Stack direction="row" spacing={2}>
                    {isAuth ?
                        <Link onClick={setIsAuth} className='link__nav' to={`/`}>Выйти</Link> :
                        <>
                        <Link className='link__nav' to={`/registration`}>Регистрация</Link>
                        <Link className='link__nav' to={`/auth`}>Войти</Link>
                        </>}
                </Stack>
            </Container>
        </Navbar>
    )
}

export default NavBar;