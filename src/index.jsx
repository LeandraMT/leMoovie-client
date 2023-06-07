import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";


//Main component
const LeMoovieApp = () => {
    return (
        <div className="le-moovie">
            <div>Welcome to leMoovie!</div>
        </div>
    );
};


//Finds the root of my app
const container = document.querySelector('#root');
const root = createRoot(container);

//Renders my app in DOM element
root.render(<LeMoovieApp />);