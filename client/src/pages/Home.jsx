import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div className="container">
            <Navbar page="home" />
            <section className="hero">
                <h1>Project management made easy</h1>
                <p>This simple tool was created with Node.js, Express, MongoDB, and React. Click the try demo button below to get started!</p>
                <Link to="/demo" aria-label="try demo" className="btn-primary">Try Demo</Link>
            </section>
        </div>
    );
}

export default Home;