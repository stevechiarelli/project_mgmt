import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
    return (
        <div className="card">
            <div className="content">
                <h3>{project.name}</h3>
                <p>Status: <span>{project.status}</span></p>
            </div>
            <Link to={`/project/${project._id}`} aria-label="view" className="btn-outline btn-small">view</Link>
        </div>
    );
}

export default ProjectCard;