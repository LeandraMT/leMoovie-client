import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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
                        //id: movie.id,
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

    if (selectedMovie) {
        return (
            <MovieView
                movie={selectedMovie}
                onBackClick={() => {
                    setSelectedMovie(null)
                }}
            />
        )
    }

    if (!user) {
        return (
            <>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                or
                <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        return (
            <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
            />
        );
    }

    if (movies.length === 0) {
        return (
            <div>
                <div>This list is empty.</div>
            </div>
        );
    }

    return (
        <div>
            {movies.map((movie) => (
                <div>
                    <React.StrictMode>
                        <MovieCard
                            key={movie.Title}
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    </ React.StrictMode>
                </div>
            ))}
            <button onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
            }}>
                Logout
            </button>
        </div>
    );
}