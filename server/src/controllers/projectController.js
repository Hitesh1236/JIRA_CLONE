import Project from "../models/ProjectSchema.js";
import Task from "../models/TaskSchema.js";
import AppError from "../services/AppError.js";

export const createProject = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    throw new AppError("Name is required.", 400);
  }

  await Project.create({
    name,
    description,
    owner: req.user._id,
  });

  return res.status(201).json({ message: "Project successfully created" });
};

export const getProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.user._id });
  return res.status(200).json(projects);
};

export const getOneProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    throw new AppError("Access Denied", 403);
  }

  return res.status(200).json(project);
};

export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new AppError("No such project exist", 404);
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    throw new AppError("Access Denied", 403);
  }

  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  await project.save();

  return res.status(200).json({ message: "Successfully updated" });
};

export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new AppError("No such project exist", 404);
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    throw new AppError("Access Denied", 403);
  }

  await Task.deleteMany({ project: project._id });
  await project.deleteOne();

  return res.status(200).json({ message: "Successfully deleted" });
};
