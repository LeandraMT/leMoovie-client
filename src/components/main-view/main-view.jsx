<<<<<<< Updated upstream
import react from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Titanic",
            image: "https://www.tvguide.com/a/img/catalog/provider/1/2/1-9050537522.jpg",
            description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
            director: "James Cameron",
            genre: "Drama"
        },
        {
            id: 2,
            title: "Encanto",
            image: "https://th.bing.com/th/id/OIP.2AzhGx6b55YrLLaYANkEGwHaIb?pid=ImgDet&rs=1",
            description: "A Colombian teenage girl has to face the frustration of being the only member of her family without magical powers.",
            director: "Jared Bush",
            genre: "Animation"
        },
        {
            id: 3,
            title: "The Wolf of Wall Street",
            image: "https://th.bing.com/th/id/R.ca85b0a51be6a481b042841ec8c4f8f9?rik=GZfmvrYl7S2EOg&riu=http%3a%2f%2fwww.danielyeow.com%2fwp-content%2fuploads%2fTheWolfofWallStreet-poster.jpg&ehk=9pInwuqq%2bHihzJeOyUkpxRoiyWqy8djHUd9%2brEx%2bYjM%3d&risl=&pid=ImgRaw&r=0",
            description: "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
            director: "Martin Scorsese",
            genre: "Biography"
        },
    ]);
=======
import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
>>>>>>> Stashed changes

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

<<<<<<< Updated upstream
=======
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    //Fetching the API from Heroku
    useEffect(() => {


        fetch("https://le-moovie.herokuapp.com/movies")
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
            });
    }, []);

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
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
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }
>>>>>>> Stashed changes

    if (movies.length === 0) {
        return (
            <div>
                <div>This list is empty.</div>
            </div>
        );
    }

    return (
        <div>
<<<<<<< Updated upstream
            {movies.map((movie) => {
                return (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                );
            })}
=======
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
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>
                Logout
            </button>
>>>>>>> Stashed changes
        </div>
    );
}