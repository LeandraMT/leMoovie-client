import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            access: username,
            secret: password
        };

        fetch("https://le-moovie.herokuapp.com/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                }
                else {
                    alert("No such user. Please try again.");
                }
            })
            .catch((e) => {
                alert("Something went wrong...");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    required
                    minLength="4"
                    onChange={(e) => setUsername(e.target.value)} />
            </label>

            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    required
                    minLength="6"
                    onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button type="submit">
                Submit
            </button>
        </form>
    );
};