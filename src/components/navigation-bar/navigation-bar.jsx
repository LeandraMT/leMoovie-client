import "./navigation-bar.scss";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar expand="lg">
            <Navbar.Brand as={Link} to="/login" className="ms-2">
                LeMoovie
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {!user && (
                        <>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/signup">
                                Signup
                            </Nav.Link>
                        </>
                    )}

                    {user && (
                        <>
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/users">
                                My Profile
                            </Nav.Link>
                            <Nav.Link onClick={onLoggedOut}>
                                Logout
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}