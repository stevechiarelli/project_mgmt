import { useState, useContext } from "react";
import { ProjectsContext } from "../context/ProjectsContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import API from "../Api";
import Loading from "../components/Loading";

const ProjectDelete = ({ projectId }) => {
    const navigate = useNavigate();

    const {dispatch} = useContext(ProjectsContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const deleteProject = async () => {
        try {
            setLoading(true);
            const response = await API.delete("/deleteProject/" + projectId);
            dispatch({type: "DELETE_PROJECT", payload: response.data });
            setLoading(false);
            
            navigate("/demo");
        }
        catch(error) {
            setError(error);
        }
    }

    if (error) {
        return <p>An unexpected error has occured.</p>
    }
    else if (loading) {
        return <Loading />
    }

    return (
        <button className="btn-primary btn-small" aria-label="delete" onClick={deleteProject}><FaTrash /></button>
    );
}

export default ProjectDelete; 