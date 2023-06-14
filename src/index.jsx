import { createRoot } from "react-dom/client";
import "./index.scss";
import { MainView } from "./components/main-view/main-view";


//Main component
const LeMoovieApp = () => {
    return (
        <MainView />
    );
};


//Finds the root of my app
const container = document.querySelector('#root');
const root = createRoot(container);

//Renders my app in DOM element
root.render(<LeMoovieApp />);