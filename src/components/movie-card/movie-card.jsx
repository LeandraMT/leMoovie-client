import React from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card style={{ width: '18rem' }} className="h-100" id="movie-card">
            <Card.Img variant="top" className="card-image" src={movie.ImagePath} />
            <Card.Body className="card-body">
                <Card.Title>{movie.Title}</Card.Title>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link" className="submit-btn" id="movie-btn">
                        Open
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
};


MovieCard.prototype = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};