import { useEffect, useState, useContext } from "react";
import { ProjectsContext } from "../context/ProjectsContext";
import { ClientsContext } from "../context/ClientsContext";
import API from "../Api";
import Loading from "./Loading";

const ProjectModal = ({ modal, handleClose }) => {
    const {clients, dispatch: clientDispatch} = useContext(ClientsContext);
    const {dispatch: projectDispatch} = useContext(ProjectsContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] =  useState('');
    const [status, setStatus] =  useState('Not Started');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getClients = async () => {
            try {
                const response = await API.get("/getClients");
                clientDispatch({type: "SET_CLIENT", payload: response.data});
                setLoading(false);
            }
            catch (error) {
                setError(error);
            }
        }

        getClients();
    }, [clientDispatch]);

    const addProject = async () => {
        try {
            const response = await API.post("/addProject", { name, description, clientId, status });
            projectDispatch({type: "ADD_PROJECT", payload: response.data });
            setLoading(false);
            handleClose();
        }
        catch(error) {
            setError(error);
        }
    }

    const handleSave = (e) => {
        e.preventDefault();
        
        if (name === '' || description === '' || status === '') {
            return alert("Please fill in all fields");
        }

        setLoading(true);
        addProject();
        setName('');
        setDescription('');
        setStatus('Not Started');
        setClientId('');
    }

    if (error) {
        return <p>An unexpected error has occured.</p>
    }
    else if (loading) {
        return <Loading />
    }

    return (
        <div className="modal project-modal" style={modal === true ? {display: "block"} : {display: "none"}}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>New Project</h3>
                    <span className="close" onClick={() => handleClose()}>&times;</span>
                </div>
                <div className="modal-body">
                    <label htmlFor="name">name</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="description">description</label>
                    <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                    <label htmlFor="status">status</label>
                    <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <label htmlFor="client">client</label>
                    <select name="client" id="client" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                        <option value="">Select client...</option>
                        {clients.map(client => {
                            return <option key={client._id} value={client._id}>{client.name}</option>
                        })}
                    </select>

                    <button className="btn-primary" aria-label="save" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default ProjectModal;