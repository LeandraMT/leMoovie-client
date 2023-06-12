import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Titanic",
            image: "https://www.imdb.com/title/tt0120338/mediaviewer/rm2647458304/?ref_=tt_ov_i",
            description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
            director: "James Cameron",
            genre: "Drama"
        },
        {
            id: 2,
            title: "Encanto",
            image: "https://www.imdb.com/title/tt2953050/mediaviewer/rm2541025281/?ref_=tt_ov_i",
            description: "A Colombian teenage girl has to face the frustration of being the only member of her family without magical powers.",
            director: "Jared Bush",
            genre: "Animation"
        },
        {
            id: 3,
            title: "The Wolf of Wall Street",
            image: "https://www.imdb.com/title/tt0993846/mediaviewer/rm2842940160/?ref_=tt_ov_i",
            description: "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
            director: "Martin Scorsese",
            genre: "Biography"
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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

    return (
        <div>
            {movies.map((movie) => {
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            })}
        </div>
    )
}