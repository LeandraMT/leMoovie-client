import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_URL } from '../../api_URL';

//Bootstrap
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const MovieView = ({ movies, user, setUser, token }) => {
    const { movieId } = useParams();
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        if (!user) {
            return;
        }

        const isFavourited = user && user.FavouriteMovies && user.FavouriteMovies.includes(movieId);
        setIsFavourite(isFavourited);
    }, [user]);


    const removeFavourite = () => {
        fetch(`${API_URL}/users/${user.Username}/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                setIsFavourite(false);
                setUser(data);
            })
    }

    const addFavourite = () => {
        fetch(`${API_URL}/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                setIsFavourite(true);
                setUser(data);
            })
    }

    const movie = movies.find((m) => m.id === movieId);

    return (
        <Row className="movie-view">
            <div>
                <div>
                    <img src={movie.ImagePath} className="w-100 mb-4" alt={movie.Title} />
                </div>
                <div className="mb-2">
                    <span>Title: </span>
                    <span>{movie.Title}</span>
                </div>
                <div className="mb-2">
                    <span>Description: </span>
                    <span>{movie.Description}</span>
                </div>
                <div className="mb-2">
                    <span>Director: </span>
                    <span>{movie.Director.Name}</span>
                </div>
                <div className="mb-2">
                    <span>Genre: </span>
                    <span>{movie.Genre.Name}</span>
                </div>

                {isFavourite ? (
                    <Button variant="danger" size="sm" onClick={removeFavourite}>
                        Remove from list
                    </Button>
                ) : (
                    <Link to={`/users`}>
                        <Button variant="success" size="sm" onClick={addFavourite}>
                            Add to list
                        </Button>

                    </Link>

                )}
                <br></br>
                <br></br>
                <Link to={`/`}>
                    <Button variant="secondary" size="sm" className="back-button">
                        Back
                    </Button>
                </Link>
            </div>
        </Row>
    );
};