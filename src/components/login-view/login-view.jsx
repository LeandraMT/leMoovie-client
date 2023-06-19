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

        fetch("https://le-moovie.herokuapp.com/login", {
            method: "POST",
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (response.ok) {
                    onLoggedIn(username);
                }
                else {
                    alert("Login failed, please try again.");
                }
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="4"
                />
            </label>

            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                />
            </label>

            <button type="submit">
                Submit
            </button>
        </form>
    );
};