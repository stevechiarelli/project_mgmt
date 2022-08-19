import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/main.css";
import App from "./App";
import { ProjectsContextProvider } from "./context/ProjectsContext";
import { ClientsContextProvider } from "./context/ClientsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ProjectsContextProvider>
            <ClientsContextProvider>
                <App />
            </ClientsContextProvider>
        </ProjectsContextProvider>
    </React.StrictMode>
);