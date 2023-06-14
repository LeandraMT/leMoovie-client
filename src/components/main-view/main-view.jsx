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
}