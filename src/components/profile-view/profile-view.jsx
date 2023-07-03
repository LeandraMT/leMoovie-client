import React from "react";

//Components
import { UpdateUser } from "./update-user";
import { UserInfo } from "./user-info";
import { FavouriteMovies } from "./favourite-movie";
import { MovieView } from "../movie-view/movie-view";

//Bootstrap
import { Row, Col, Container, Card } from "react-bootstrap";

export const ProfileView = ({ user, token, movie, onLoggedOut, updatedUser, setUser }) => {

    //Delete account
    const deleteUser = () => {
        fetch(`https://le-moovie.herokuapp.com/users/${user.Username}`, {
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

    return (
        <>
            <Container>
                <Row>
                    <h1>My Profile</h1>
                </Row>

                <Row>
                    <Col>
                        <UserInfo
                            name={user.Username}
                            email={user.Email}
                        />
                    </Col>

                    <Col>
                        <Card>
                            <Card.Title>Update Your Profile:</Card.Title>
                            <Card.Text>
                                <UpdateUser
                                    user={user}
                                    token={token}
                                />
                            </Card.Text>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FavouriteMovies
                            user={user}
                            token={token}
                            movies={movie}
                            setUser={setUser}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}