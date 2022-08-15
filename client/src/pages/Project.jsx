import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import API from "../Api";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import ClientInfo from "../components/ClientInfo";
import ProjectDelete from "../components/ProjectDelete";
import ProjectForm from "../components/ProjectForm";

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await API.get("/getProject/" + id);
                setProject(response.data);
                setLoading(false);
            }
            catch (error) {
                setError(error);
            }
        }
        getProject();
    });

    if (error) {
        return <p>An error occured when loading this section.</p>
    }
    else if (loading) {
        return <Loading />
    }

    return (
        <div className="container">
            <Navbar page="demo" />
            <section className="project">
                <div className="project-header">
                    <div className="content">
                        <h1>{project.name}</h1>
                        <p>{project.description}</p>
                    </div>
                    <div className="btn-group">
                        <ProjectDelete projectId={project.id} />
                        <Link to="/demo" aria-label="delete" className="btn-primary btn-small"><FaArrowLeft /></Link>
                    </div>
                </div>

                <p className="status">Project status: <span>{project.status}</span></p>
                
                <ClientInfo client={project.client} />

                <h2>Update Project Details</h2>

                <ProjectForm project={project} />
            </section>
        </div>
    );
}

export default Project;