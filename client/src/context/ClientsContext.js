import { createContext, useReducer } from "react";

const ClientsContext = createContext();

const clientsReducer = (state, action) => {
    switch (action.type) {
        case "SET_CLIENT":
            return {
                clients: action.payload
            }
        case "ADD_CLIENT":
            return {
                clients: [action.payload, ...state.clients]
            }
        case "DELETE_CLIENT":
            return {
                clients: state.clients.filter((client) => client._id !== action.payload._id)
            }
        default:
            return state
    }
}

const ClientsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(clientsReducer, {
        clients: null
    })

    return (
        <ClientsContext.Provider value={{...state, dispatch}}>
            { children }
        </ClientsContext.Provider>
    );
}

export { ClientsContext, clientsReducer, ClientsContextProvider };