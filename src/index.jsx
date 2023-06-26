import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import "./index.scss";

import Container from "react-bootstrap/Container";



//Main component
const LeMoovieApp = () => {
    return (
        <Container>
            <MainView />
        </Container>
    );
};


//Finds the root of my app
const container = document.querySelector('#root');
const root = createRoot(container);

//Renders my app in DOM element
root.render(<LeMoovieApp />);