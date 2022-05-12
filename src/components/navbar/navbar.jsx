import { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';


import './navbar.scss';

class NavBar extends Component {

    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">JavaForall</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default NavBar;