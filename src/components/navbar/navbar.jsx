import { Navbar, Container, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import KeycloakServices from '../../services/keycloakServices';
import Stack from '@mui/material/Stack';
import { Link, NavLink } from 'react-router-dom'
import './navbar.scss';

const NavBar = (props) => {

    const keycloakServices = new KeycloakServices();
    let userName = localStorage.getItem('user');
    const logout = () => {
        localStorage.clear();
        keycloakServices.logout();
    };

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Link className='link__nav_brand' to={`/main`}>JavaForall</Link>
                <Stack direction="row" spacing={2}>
                    <div className="navbar__dropdown">
                        <DropdownButton id="dropdown-basic-button" title={userName ? userName : 'user'}>
                            <Dropdown.Item>
                                <Link onClick={logout} className='link__nav' to={`/main`}>Выйти</Link>
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </Stack>
            </Container>
        </Navbar>
    )
}

export default NavBar;