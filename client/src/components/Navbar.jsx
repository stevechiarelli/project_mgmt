import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import gear from "../assets/images/loading-gear.gif";
import watermark from "../assets/images/gear_watermark.png";

const Navbar = ({ page }) => {
    if (page === "home") {
        document.querySelector("body").classList.add("no-scroll");
    }
    else {
        document.querySelector("body").classList.remove("no-scroll");
    }

    return (
        <header>
            <Link to="/" className="logo"><img src={logo} alt="logo" /></Link>
            <img src={page === "home" ? gear : watermark} className="gear" alt="gear" />
            <nav>
                <ul className="nav-links">
                    <li><Link to="/" aria-label="home" className={page === "home" ? "active" : ""}>Home</Link></li>
                    <li><Link to="/demo" aria-label="demo" className={page === "demo" ? "active" : ""}>Demo</Link></li>
                    <li><Link to="/contact" aria-label="contact" className={page === "contact" ? "active" : ""}>Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;