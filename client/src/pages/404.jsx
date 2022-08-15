import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="error">
            <div className="content">
                <h1>404</h1>
                <h3>Oops.. You just found an error page...</h3>
                <p>We're sorry but the page you requested was not found.</p>
                <Link to="/" aria-label="return home" className="btn-primary btn-small">Return home</Link>
            </div>
        </div>
    );
}

export default Error404;