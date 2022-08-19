import { useState, useContext } from "react";
import { ProjectsContext } from "../context/ProjectsContext";
import { Link, useNavigate } from "react-router-dom";
import API from "../Api";
import Loading from "../components/Loading";

const ProjectForm = ({ project }) => {
    const navigate = useNavigate();

    const {dispatch} = useContext(ProjectsContext);
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] =  useState(project.status);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateProject = async () => {
        try {
            const response = await API.put("/updateProject/" + project._id, { name, description, status });
            dispatch({type: "ADD_PROJECT", payload: response.data });
            setLoading(false);
            navigate("/demo")
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
        updateProject();
    }

    if (error) {
        return <p>An unexpected error has occured.</p>
    }
    else if (loading) {
        return <Loading />
    }

    return (
        <>
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

            <div className="btn-group">
                <button className="btn-primary" aria-label="save" onClick={handleSave}>Save</button>
                <Link to="/demo" aria-label="cancel" className="btn-primary">Cancel</Link>
            </div>
        </>
    );
}

export default ProjectForm;