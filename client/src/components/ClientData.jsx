import { FaTrash } from "react-icons/fa";

const ClientData = ({ client }) => {
    return (
        <tr>
            <td>{ client.name }</td>
            <td>{ client.email }</td>
            <td>{ client.phone }</td>
            <td>
                <button className="btn-primary btn-small" aria-label="delete"><FaTrash /></button>
            </td>
        </tr>
    );
}

export default ClientData;