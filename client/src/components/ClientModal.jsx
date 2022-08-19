import { useState, useContext } from "react";
import { ClientsContext } from "../context/ClientsContext";
import API from "../Api";
import Loading from "./Loading";

const ClientModal = ({ modal, handleClose }) => {
    const {dispatch} = useContext(ClientsContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] =  useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const addClient = async () => {
        try {
            const response = await API.post("/addClient", { name, email, phone });
            dispatch({type: "ADD_CLIENT", payload: response.data });
            setLoading(false);
            handleClose();
        }
        catch(error) {
            setError(error);
        }
    }

    const handleSave = (e) => {
        e.preventDefault();
        
        if (name === '' || email === '' || phone === '') {
            return alert("Please fill in all fields");
        }

        setLoading(true);
        addClient();
        setName('');
        setEmail('');
        setPhone('');
    }

    if (error) {
        return <p>An unexpected error has occured.</p>
    }
    else if (loading) {
        return <Loading />
    }

    return (
        <div className="modal client-modal" style={modal === true ? {display: "block"} : {display: "none"}}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>New Client</h3>
                    <span className="close" onClick={() => handleClose()}>&times;</span>
                </div>
                <div className="modal-body">
                    <label htmlFor="name">name</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="email">email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="phone">phone</label>
                    <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

                    <button className="btn-primary" aria-label="save" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default ClientModal;