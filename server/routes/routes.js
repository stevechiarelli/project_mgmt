import express from "express";
import { getProjects, getProject, addProject, updateProject, deleteProject } from "../controllers/projects.js";
import { getClients, getClient, addClient, deleteClient } from "../controllers/clients.js";

const router = express.Router();

// Projects
router.get("/getProjects", getProjects);
router.get("/getProject/:id", getProject);
router.post("/addProject", addProject);
router.put("/updateProject/:id", updateProject);
router.delete("/deleteProject/:id", deleteProject);

// Clients
router.get("/getClients", getClients);
router.get("/getClient/:id", getClient);
router.post("/addClient", addClient);
router.delete("/deleteClient/:id", deleteClient);

export default router;