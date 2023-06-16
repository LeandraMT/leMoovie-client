import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    //Fetching the API from Heroku
    useEffect(() => {
        fetch("https://le-moovie.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                const movieFromApi = data.map((movie) => {
                    console.log(movie);
                    return {
                        id: movie.id,
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


    if (movies.length === 0) {
        return <div>This list is empty.</div>;
    }

    const handleMovieClick = (newSelectedMovie) => {
        setSelectedMovie(newSelectedMovie);
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={handleMovieClick}
                />
            ))}
        </div>
    );


    /*return (
        <div>
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
        </div>
    );
    */
}