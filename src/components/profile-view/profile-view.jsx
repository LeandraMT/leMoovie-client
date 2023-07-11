import React from "react";
import { useState, useEffect } from "react";

//Bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

//Components
import { MovieCard } from "../movie-card/movie-card";
import { UpdateUser } from "./update-user";
import { MovieView } from "../movie-view/movie-view";

export const ProfileView = ({ user, token, setUser, movies }) => {

    const handleUpdateUser = (updatedUser) => {
        setUser(updatedUser)
    }

    return (
        <>
            <h1>My Profile</h1>
            <Row>
                <Col>
                    <div>Username: {user.Username}</div>
                    <div>Email: {user.Email}</div>
                </Col>

                <Col>
                    <UpdateUser
                        user={user}
                        token={token}
                        updatedUser={handleUpdateUser}
                    />
                </Col>
            </Row>

            <h3>Favourite Movies</h3>
            <Row>
                {user.FavouriteMovies ? (
                    user.FavouriteMovies.map((movieId) => {
                        const movie = movies.find((m) => m.id === movieId);
                        return (
                            <Col key={movie.id}>
                                <MovieCard movie={movie} />
                            </Col>
                        );
                    })
                ) : (
                    <div>No favorite movies</div>
                )}

            </Row>
        </>
    );
};