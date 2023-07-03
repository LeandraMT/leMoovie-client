import React from "react";
import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

export const UpdateUser = ({ user, token, updatedUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmitUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            BirthDate: birthday
        };

        //Update the user info
        fetch(`https://le-moovie.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    alert("Update failed. Try again.")
                }
            })
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                updatedUser(user);
            })
            .catch((err) => {
                alert(err);
            })
    }

    return (
        <>
            <Row>
                <Form onSubmit={handleSubmitUpdate}>
                    <Form.Group controlId="formUpdateUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="4"
                        />
                    </Form.Group>

                    <Form.Group controlId="formUpdatePassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                        />
                    </Form.Group>

                    <Form.Group controlId="formUpdateEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formUpdateBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="secondary" type="submit">Save</Button>
                </Form>
            </Row>
        </>
    )
}