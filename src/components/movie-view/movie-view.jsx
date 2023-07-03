import { Link } from "react-router-dom";

export const MovieView = ({ movies, user, setUser, token }) => {
    const { movieId } = useParams();
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        const isFavourited = user.FavoriteMovies.includes(movieId)
        setIsFavourite(isFavourited)
    }, []);

    const removeFavourite = () => {
        fetch(`https://le-moovie.herokuapp.com/users/${user.Username}/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json({ msg: `${movie.Title} has been removed from your list.` })
                }
            })
            .then((data) => {
                setIsFavourite(false);
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            })
    }

    const addFavourite = () => {
        fetch(`https://le-moovie.herokuapp.com/users/${user.Username}/${movieId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json({ msg: `${movie.Title} has been added to your list.` })
                }
            })
            .then((data) => {
                setIsFavourite(true);
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            })
    }

    const movie = movies.find((m) => m.id === movieId);

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

            {isFavourite ? (
                <Button variant="danger" onClick={removeFavourite}>
                    Remove movie from list
                </Button>
            ) : (
                <Button variant="success" onClick={addFavourite}>
                    Add movie to list
                </Button>
            )}

            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};