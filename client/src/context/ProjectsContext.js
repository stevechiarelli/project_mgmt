import { createContext, useReducer } from "react";

const ProjectsContext = createContext();

const projectsReducer = (state, action) => {
    switch (action.type) {
        case "SET_PROJECT":
            return {
                projects: action.payload
            }
        case "ADD_PROJECT":
            return {
                projects: [action.payload, ...state.projects]
            }
        case "DELETE_PROJECT":
            return {
                projects: state.projects.filter((project) => project._id !== action.payload._id)
            }
        case "DELETE_CLIENT_PROJECT":
            return {
                projects: state.projects.filter((project) => project.clientId !== action.payload._id)
            }
        default:
            return state
    }
}

const ProjectsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(projectsReducer, {
        projects: null
    })

    return (
        <ProjectsContext.Provider value={{...state, dispatch}}>
            { children }
        </ProjectsContext.Provider>
    );
}

export { ProjectsContext, projectsReducer, ProjectsContextProvider };