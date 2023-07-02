import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    const [movies, setMovies] = useState([]);

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);


    //Fetching the API from Heroku
    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://le-moovie.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                const movieFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        Title: movie.Title,
                        ImagePath: movie.ImagePath,
                        Description: movie.Description,
                        Genre: {
                            Name: movie.Genre.Name
                        },
                        Director: {
                            Name: movie.Director.Name
                        },
                        Featured: movie.Featured.toString()
                    };
                });
                setMovies(movieFromApi);
            })
            .catch((error) => {
                console.log("Something went wrong", error);
            });
    }, [token]);

    return (
        <BrowserRouter>
            <Row className="justify-content-md-center">
                <NavigationBar
                    user={user}
                    onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                />
                <Routes>

                    <Route path="/" element={
                        <Row>
                            {movies.map((movie) => (
                                <Col md={3} key={movie._id}>
                                    <MovieCard movie={movie} />
                                </Col>
                            ))}
                        </Row>
                    }
                    />

                    <Route path="/movies/:movieId" element={
                        <MovieView />
                    }
                    />

                    <Route path="/login" element={
                        <>
                            {user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={6}>
                                    <LoginView
                                        onLoggedIn={(user) => {
                                            setUser(user);
                                            setToken(user.token);
                                            localStorage.setItem("user", JSON.stringify(user));
                                            localStorage.setItem("token", user.token);
                                        }}
                                    />
                                </Col>
                            )}
                        </>
                    }
                    />

                    <Route path="/signup" element={
                        <>
                            {user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={6}>
                                    <SignupView />
                                </Col>
                            )}
                        </>
                    }
                    />
                </Routes>

                {user && (
                    <Col md={1}>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setUser(null);
                                setToken(null);
                                localStorage.clear();
                            }}
                        >
                            Logout
                        </Button>
                    </Col>
                )}
            </Row>
        </BrowserRouter>
    );
};