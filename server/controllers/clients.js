import mongoose from "mongoose";
import ClientModel from "../models/client.model.js";

// Get all clients
export const getClients = async (req, res) => {
    try {
        const clients = await ClientModel.find();  
        res.status(200).json(clients);
    }
    catch {
        res.status(404).json({ message: error.message });
    }
}

// Get specified client
export const getClient = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const client = await ClientModel.findById(_id);  
        res.status(200).json(client);
    }
    catch {
        res.status(404).json({ message: error.message });
    }
}

// Add a new client
export const addClient = async (req, res) => {
    const client = req.body;
    const newClient = ClientModel(client);

    try {
        await newClient.save();
        res.status(201).json(newClient);
    }
    catch {
        res.status(409).json({ message: error.message });
    }
}

// Delete specified client
export const deleteClient = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No client with that id");
    }

    await ClientModel.findByIdAndRemove(_id);
    res.json({ message: "Client deleted successfully"});
}