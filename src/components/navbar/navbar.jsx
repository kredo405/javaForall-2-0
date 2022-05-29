import { Navbar, Container, Nav } from 'react-bootstrap';
import KeycloakServices from '../../services/keycloakServices';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'
import './navbar.scss';

const NavBar = (props) => {
    const { isAuth, setIsAuth, setAuthOutput } = props;
    const token = localStorage.getItem("token");
    const keycloakServices = new KeycloakServices();

    const login = () => {
        keycloakServices.login()
    }
    const logout = () => {
        localStorage.clear();
        keycloakServices.logout();
    }

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/"><Link className='link__nav' to={`/`}>JavaForall</Link></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Главная</Nav.Link>
                </Nav>
                <Stack direction="row" spacing={2}>
                        <Link onClick={logout} className='link__nav' to={`/`}>Выйти</Link> 
                        <>
                        <Link onClick={login} className='link__nav' to={`/`}>Войти</Link>
                        </>
                </Stack>
            </Container>
        </Navbar>
    )
}

export default NavBar;