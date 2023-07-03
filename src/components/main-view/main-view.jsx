import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";

//Components
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateUser } from "../profile-view/update-user";

//Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    const [movies, setMovies] = useState([]);
    console.log(movies);

    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);


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
                    console.log(data);
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
                console.log(movieFromApi);
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

                    <Route
                        path="/movies/:movieId"
                        element={
                            <Row>
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>The list is empty!</Col>
                                    ) : (
                                        <Col md={8}>
                                            <MovieView movies={movies} />
                                        </Col>
                                    )}
                                </>
                            </Row>
                        }
                    />


                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-4" key={movie._id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
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

                    <Route path="/users" element={
                        <>
                            <Col md={6}>
                                {user ? (
                                    <ProfileView
                                        user={user}
                                        token={token}
                                        onLoggedOut={() => {
                                            setUser(null);
                                            setToken(null);
                                            localStorage.clear();
                                        }}
                                    />
                                ) : (
                                    <Navigate to="/login" replace />
                                )}
                            </Col>
                        </>
                    }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};