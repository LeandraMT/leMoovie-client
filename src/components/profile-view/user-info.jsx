import React from "react";
import { Row, Col, Card } from "react-bootstrap";

export const UserInfo = ({ name, email }) => {
    return (
        <Card>
            <Card.Text>Name: {name}</Card.Text>
            <Card.Text>Email: {email}</Card.Text>
        </Card>
    )

}