import React from "react";
import { useState } from "react";
import { API_URL } from "../../api_URL";

//Bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import { FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { ModalHeader } from "react-bootstrap";

export const UpdateUser = ({ user, token, updatedUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    //Delete account
    const deleteUser = () => {
        fetch(`${API_URL}/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    alert("Your account has been deleted.");
                    onLoggedOut();
                }
                else {
                    alert("Something went wrong...")
                }
            })
            .catch((err) => {
                alert(err);
            });
    }

    const handleSubmitUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            BirthDate: birthday
        };

        //Update the user info
        fetch(`${API_URL}/users/${user.Username}`, {
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
                updatedUser(data);
            })
            .catch((err) => {
                alert(err);
            })
    }

    return (
        <>
            <Row md={7}>
                <Form onSubmit={handleSubmitUpdate} sm={{ offset: 2 }} md={{ offset: 4 }}>
                    <FormGroup controlId="formUpdateUsername">
                        <FormLabel>Username:</FormLabel>
                        <FormControl
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="4"
                            placeholder={user.Username}
                        />
                    </FormGroup>

                    <FormGroup controlId="formUpdatePassword">
                        <FormLabel>Password:</FormLabel>
                        <FormControl
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                        />
                    </FormGroup>

                    <FormGroup controlId="formUpdateEmail">
                        <FormLabel>Email:</FormLabel>
                        <FormControl
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder={user.Email}
                        />
                    </FormGroup>

                    <FormGroup controlId="formUpdateBirthday">
                        <FormLabel>Birthday:</FormLabel>
                        <FormControl
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <Row>
                        <Col>
                            <Button variant="light" type="submit" className="save-btn">
                                Save
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="danger" onClick={handleShowModal} className="del-btn">
                                Delete account
                            </Button>
                        </Col>
                    </Row>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <ModalHeader closeButton>
                            <Modal.Title>Delete account</Modal.Title>
                        </ModalHeader>
                        <Modal.Body className="modal-text">Are you sure you want to delete your account permanently?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={deleteUser}>
                                Confirm
                            </Button>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
            </Row>
        </>
    )
}