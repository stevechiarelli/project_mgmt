import mongoose from "mongoose";
import ProjectModel from "../models/project.model.js";

// Get all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find();  
        res.status(200).json(projects);
    }
    catch {
        res.status(404).json({ message: error.message });
    }
}

// Get specified project
export const getProject = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const project = await ProjectModel.findById(_id);  
        res.status(200).json(project);
    }
    catch {
        res.status(404).json({ message: error.message });
    }
}

// Add a new project
export const addProject = async (req, res) => {
    const project = req.body;
    const newProject = ProjectModel(project);

    try {
        await newProject.save();
        res.status(201).json(newProject);
    }
    catch {
        res.status(409).json({ message: error.message });
    }
}

// Update specified project
export const updateProject = async (req, res) => {
    const { id: _id } = req.params;
    const project = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No project with that id");
    }

    const updateProject = await ProjectModel.findByIdAndUpdate(_id, project, { new: true });
    res.json(updateProject);
}

// Delete specified project
export const deleteProject = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No project with that id");
    }

    await ProjectModel.findByIdAndRemove(_id);
    res.json({ message: "Project deleted successfully"});
}