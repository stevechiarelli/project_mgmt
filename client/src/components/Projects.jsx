import { useEffect, useState, useContext } from "react";
import { ProjectsContext } from "../context/ProjectsContext";
import API from "../Api";
import Loading from "./Loading";
import ProjectCard from "./ProjectCard";

const Projects = () => {
    const {projects, dispatch} = useContext(ProjectsContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await API.get("/getProjects");
                dispatch({type: "SET_PROJECT", payload: response.data});
                setLoading(false);
            }
            catch (error) {
                setError(error);
            }
        }
        
        getProjects();
    }, [dispatch]);

    if (error) {
        return <p>An error occured when loading this section.</p>
    }
    else if (loading) {
        return <Loading />
    }

    return (
        <div className="projects">
            {projects.length > 0 ? (
                projects.map(project => {
                    return <ProjectCard key={project._id} project={project} />
                })
            ) : (
                <p>No projects found</p>
            )}
        </div>      
    );
}

export default Projects;