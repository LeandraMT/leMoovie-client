import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password
        };

        fetch(`https://le-moovie.herokuapp.com/login?Username=${username}&Password=${password}`, {
            method: "POST",

        }).then(res => res.json())
            .then((response) => {
                console.log(response)
                onLoggedIn(username, response.token)
                if (response) {

                }
                else {
                    alert("Login failed, please try again.");
                }
            });
    }

    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="4"
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                />
            </Form.Group>

            <Button variant="dark" type="submit">
                Submit
            </Button>
        </Form>
    );
};