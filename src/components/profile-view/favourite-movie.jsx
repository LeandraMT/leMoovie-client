import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

//Component
import { MovieView } from "../movie-view/movie-view";

//Bootstrap
import { Row, Col, Container, Button } from "react-bootstrap";



export const FavouriteMovies = ({ user, token, movies, setUser }) => {
    console.log(movies);
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
        <Container>
            <Row>
                <Col>
                    <MovieView
                        movie={movie}
                    />
                    {isFavourite ? (
                        <Button variant="danger" onClick={removeFavourite}>
                            Remove movie from list
                        </Button>
                    ) : (
                        <Button variant="success" onClick={addFavourite}>
                            Add movie to list
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    )
}