import { useState } from "react";

//Bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://le-moovie.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => {
                if (response.ok) {
                    alert("Signup successful");
                    window.location.reload();
                }
                else {
                    alert("Signup failed");
                }
            });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit} className="signup-view">
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter email"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridBirthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Set a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="4"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Set a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="6"
                    />
                </Form.Group>

                <Button variant="outline-dark" type="submit" className="submit-btn">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};