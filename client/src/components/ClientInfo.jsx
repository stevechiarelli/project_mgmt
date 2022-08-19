import { useEffect, useState } from "react";
import API from "../Api";
import Loading from "../components/Loading";
import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

const ClientInfo = ({ clientId }) => {

    const [client, setClient] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getClient = async () => {
            try {
                const response = await API.get("/getClient/" + clientId);
                setClient(response.data);
                setLoading(false);
            }
            catch (error) {
                setError(error);
            }
        }

        getClient();
    }, [])


    if (error) {
        return <p>An error occured when loading this section.</p>
    }
    else if (loading) {
        return <Loading />
    }
    
    return (
        <>
            <p className="info">Client Information</p>
            <ul className="client-info">
                <li><span><FaIdBadge /></span> {client.name}</li>
                <li><span><FaEnvelope /></span> {client.email}</li>
                <li><span><FaPhone /></span> {client.phone}</li>
            </ul>
        </>
    );
}

export default ClientInfo;