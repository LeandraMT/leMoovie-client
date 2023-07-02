import { Link } from "react-router-dom";

export const MovieView = ({ movie }) => {
    console.log(movie);
    return (
        <div>
            <div>
                <img src={movie.ImagePath} className="w-100" alt={movie.Title} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>

            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    )
}