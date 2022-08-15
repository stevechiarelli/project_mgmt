import { useState } from "react";
import Navbar from "../components/Navbar";
import Clients from "../components/Clients";
import Projects from "../components/Projects";
import ClientModal from "../components/ClientModal";
import ProjectModal from "../components/ProjectModal";

const Demo = () => {
    const [clientModal, setClientModal] = useState(false);
    const [projectModal, setProjectModal] = useState(false);

    const handleClose = () => {
        setClientModal(false);
        setProjectModal(false);
    }

    const handleNewProject = () => {
        setProjectModal(true);
    }

    const handleNewClient = () => {
        setClientModal(true);
    }

    return (
        <div className="container">
            <Navbar page="demo" />
            <section className="demo">
                <div className="top-bar">
                    <h2>Projects</h2>
                    <button className="btn-primary btn-small" aria-label="new project" onClick={handleNewProject}>new project</button>
                </div>

                <Projects />

                <div className="top-bar">
                    <h2>Clients</h2>
                    <button className="btn-primary btn-small" aria-label="new client" onClick={handleNewClient}>new client</button>
                </div>

                <Clients />
            </section>

            <ClientModal modal={clientModal} handleClose={handleClose} />
            <ProjectModal modal={projectModal} handleClose={handleClose} />
        </div>
    );
};

export default Demo;