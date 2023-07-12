import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../api_URL";

//Bootstrap
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        }

        fetch(`${API_URL}/login?Username=${username}&Password=${password}`, {
            method: "POST",

        }).then(res => res.json())
            .then((data) => {
                if (data) {
                    //localStorage.setItem("user", JSON.stringify(data));
                    //localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                }
                else {
                    alert("Login failed, please try again.");
                }
            })
    };


    return (
        <Container>
            <Form onSubmit={handleSubmit} className="login-form">
                <Row>
                    <Col sm={{ offset: 2 }} md={{ offset: 4 }} className="align-self-center mb-4 mt-4" id="login-heading">
                        Login
                    </Col>
                </Row>

                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        className="form-label"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="4"
                        placeholder="Enter your username"
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        className="form-label"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="6"
                        placeholder="Enter your password"
                    />
                </Form.Group>

                <Row>
                    <Col>
                        <Button variant="outline-dark" type="submit" className="submit-btn">
                            Submit
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col className="singup-link mt-4">
                        <Link to={`/signup`} className="signup-link">
                            Create an account
                        </Link>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};