import { Link } from "react-router-dom";

//Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Container>
            <Row>
                <Navbar expand="xxl" className="border-bottom border-bottom-dark" id="navigation-bar">
                    <Col xs={10}>
                        <Navbar.Brand as={Link} to="/login" className="ms-2" id="navbar-heading">
                            <span>LeMoovie</span>
                        </Navbar.Brand>
                    </Col>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {!user && (
                                <>
                                    <Nav.Link as={Link} to="/login" className="navbar-links">
                                        Login
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/signup" className="navbar-links">
                                        Signup
                                    </Nav.Link>
                                </>
                            )}

                            {user && (
                                <>
                                    <Nav.Link as={Link} to="/" className="navbar-links">
                                        Home
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/users" className="navbar-links">
                                        My Profile
                                    </Nav.Link>
                                    <Nav.Link onClick={onLoggedOut} className="navbar-links">
                                        Logout
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Row>
        </Container>
    )
}