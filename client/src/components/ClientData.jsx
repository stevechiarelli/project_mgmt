import { useState, useContext } from "react";
import { ClientsContext } from "../context/ClientsContext";
import { ProjectsContext } from "../context/ProjectsContext";
import { FaTrash } from "react-icons/fa";
import API from "../Api";

const ClientData = ({ client }) => {
    const {dispatch: clientDispatch} = useContext(ClientsContext);
    const {dispatch: projectDispatch} = useContext(ProjectsContext);
    const [error, setError] = useState(null);

    const deleteClient = async () => {
        try {
            const response = await API.delete("/deleteClient/" + client._id);
            clientDispatch({type: "DELETE_CLIENT", payload: response.data.client });

            if (response.data.project.deletedCount > 0) {
                projectDispatch({type: "DELETE_CLIENT_PROJECT", payload: response.data.client });
            }
        }
        catch(error) {
            setError(error);
        }
    }

    if (error) {
        return <tr><td>An unexpected error has occured.</td></tr>
    }

    return (
        <tr>
            <td>{ client.name }</td>
            <td>{ client.email }</td>
            <td>{ client.phone }</td>
            <td>
                <button className="btn-primary btn-small" aria-label="delete" onClick={deleteClient}><FaTrash /></button>
            </td>
        </tr>
    );
}

export default ClientData;