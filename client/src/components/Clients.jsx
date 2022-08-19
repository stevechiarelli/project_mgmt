import { useEffect, useState, useContext } from "react";
import { ClientsContext } from "../context/ClientsContext";
import API from "../Api";
import ClientData from "./ClientData";
import Loading from "./Loading";

const Clients = () => {
    const {clients, dispatch} = useContext(ClientsContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getClients = async () => {
            try {
                const response = await API.get("/getClients");
                dispatch({type: "SET_CLIENT", payload: response.data});
                setLoading(false);
            }
            catch (error) {
                setError(error);
            }
        }
        getClients();
    }, [dispatch]);

    if (error) {
        return <p>An error occured when loading this section.</p>
    }
    else if (loading) {
        return <Loading />
    }

    return (
        <div className="clients">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => {
                        return <ClientData key={client._id} client={client} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Clients;