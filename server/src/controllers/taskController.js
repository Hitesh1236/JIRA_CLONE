import Project from "../models/ProjectSchema.js";
import Task from "../models/TaskSchema.js";
import AppError from "../services/AppError.js";

export const createTask = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    throw new AppError("Insufficient Data", 400);
  }

  const projectDoc = await Project.findById(req.params.id);

  if (!projectDoc) {
    throw new AppError("Project does not exist", 404);
  }

  if (projectDoc.owner.toString() !== req.user._id.toString()) {
    throw new AppError("Access Denied", 403);
  }

  const task = await Task.create({
    title,
    project: req.params.id,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
  });

  return res.status(201).json(task);
};

export const getAllTask = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new AppError("No such project exist", 404);
  }

  if (req.user._id.toString() !== project.owner.toString()) {
    throw new AppError("Access Denied", 403);
  }

  const data = await Task.find({ project: req.params.id });
  return res.status(200).json(data);
};

export const getOneTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new AppError("No Such Task Exist", 404);
  }

  const project = await Project.findById(task.project);

  if (!project) {
    throw new AppError("No Such Project Exist With Given Task", 404);
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    throw new AppError("Access Denied", 403);
  }

  return res.status(200).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new AppError("No Such Task Exist", 404);
  }

  const project = await Project.findById(task.project);

  if (!project) {
    throw new AppError("No such project exist", 404);
  }

  if (req.user._id.toString() !== project.owner.toString()) {
    throw new AppError("Access Denied", 403);
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;
  task.priority = req.body.priority || task.priority;

  await task.save();
  return res.status(200).json(task);
};

export const deleteAllTask = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new AppError("No Such Project Exist", 404);
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    throw new AppError("Access Denied", 403);
  }

  await Task.deleteMany({ project: project._id });
  return res.status(200).json({ message: "Successfully deleted" });
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new AppError("No Such Task Exist", 404);
  }

  const project = await Project.findById(task.project);

  if (!project) {
    throw new AppError("No Such Project Exist Given Task", 404);
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    throw new AppError("Access Denied", 403);
  }

  await task.deleteOne();
  return res.status(200).json({ message: "Successfully Deleted" });
};
