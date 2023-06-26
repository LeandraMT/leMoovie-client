import React from "react";
import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

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
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={6}>
                    <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={9}>
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => {
                            setSelectedMovie(null)
                        }}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <div>
                    <div> This list is empty.</div>
                </div>
            ) : (
                <Row className="row">
                    <>
                        {movies.map((movie) => (
                            <Col className="mb-4 col" key={movie._id} md={3}>
                                <MovieCard
                                    movie={movie}
                                    onMovieClick={(newSelectedMovie) => {
                                        setSelectedMovie(newSelectedMovie);
                                    }}
                                />
                            </Col>
                        ))}
                    </>
                    <button onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}>
                        Logout
                    </button>
                </Row>
            )}
        </Row>
    );
};