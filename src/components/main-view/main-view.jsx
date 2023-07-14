import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../api_URL";

//Components
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";


//Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";


export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const [movies, setMovies] = useState([]);

    const [favouriteMovies, setFavouriteMovies] = useState(movies);
    console.log('favourite movies, main view: ', favouriteMovies);

    const [filter, setFilter] = useState("");

    // fetch the user information and update the user state
    const Username = user ? user.Username : null
    console.log('username', Username);

    useEffect(() => {
        if (!token || !Username) {
            return;
        }

        fetch(`${API_URL}/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                setFavouriteMovies(data.FavouriteMovies);
            })
            .catch((error) => {
                console.log("Something went wrong", error);
            });
    }, [token, Username]);


    //Fetching the API from Heroku
    useEffect(() => {
        if (!token) {
            return;
        }

        fetch(`${API_URL}/movies`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                const movieFromApi = data.map((movie) => {
                    console.log(data);
                    return {
                        id: movie._id,
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
                console.log(movieFromApi);
            })
            .catch((error) => {
                console.log("Something went wrong", error);
            });
    }, [token]);

    return (
        <BrowserRouter>
            <Row className="justify-content-md-center">
                <NavigationBar
                    user={user}
                    onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                />
                <Routes>

                    <Route path="/signup" element={
                        <>
                            {user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={7}>
                                    <SignupView />
                                </Col>
                            )}
                        </>
                    }
                    />

                    <Route path="/login" element={
                        <>
                            {user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <LoginView
                                        onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                        }}
                                    />
                                </Col>
                            )}
                        </>
                    }
                    />

                    <Route path="/users" element={
                        <>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : (
                                <Col>
                                    <ProfileView
                                        user={user}
                                        token={token}
                                        setUser={setUser}
                                        movies={movies}
                                    />
                                </Col>
                            )}
                        </>
                    }
                    />

                    <Route
                        path="/movies/:movieId"
                        element={
                            <Row>
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>The list is empty!</Col>
                                    ) : (
                                        <Col md={8}>
                                            <MovieView
                                                movies={movies}
                                                user={user}
                                                setUser={setUser}
                                                token={token}
                                            />
                                        </Col>
                                    )}
                                </>
                            </Row>

                        }
                    />


                    <Route
                        path="/" element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <>
                                        <Row>
                                            <Form.Control
                                                type="text"
                                                value={filter}
                                                onChange={(e) => setFilter(e.target.value)}
                                                placeholder="Search movie..."
                                                className="search"
                                            />
                                        </Row>
                                        {movies.length === 0 ? (
                                            <Col>This list is empty.</Col>
                                        ) : (
                                            movies
                                                .filter((movie) =>
                                                    movie.Title
                                                        .toLowerCase()
                                                        .includes(filter.toLowerCase())
                                                )
                                                .map((movie) => (
                                                    <Col key={movie.id} md={4}>
                                                        <MovieCard movie={movie} />
                                                    </Col>
                                                ))
                                        )}
                                    </>
                                )}
                            </>
                        }
                    />


                </Routes>
            </Row>
        </BrowserRouter>
    );
};