import { useState } from "react";
import Navbar from "../components/Navbar";

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] =  useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, message);
    }

    return (
        <div className="container">
            <Navbar page="contact" />
            <section className="contact">
                <h2>Contact</h2>

                <label htmlFor="name">name</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="email">email</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="message">message</label>
                <textarea name="message" id="message" cols="30" rows="10" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

                <button className="btn-primary" aria-label="submit form" onClick={handleSubmit}>Submit</button>
            </section>
        </div>
    );
};

export default Contact;