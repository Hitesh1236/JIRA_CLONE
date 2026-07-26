import Project from '../models/ProjectSchema.js'
import Task from '../models/TaskSchema.js'

export const createTask = async (req, res) => {
  try {
    const { title } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Insufficient Data' })
    }

    const projectDoc = await Project.findById(req.params.id)

    if (!projectDoc) {
      return res.status(404).json({ message: 'Project does not exist' })
    }

    if (projectDoc.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access Denied' })
    }

    const task = await Task.create({
      title,
      project: req.params.id,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
    })

    return res.status(201).json(task)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getAllTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ message: 'No such project exist' })
    }

    if (req.user._id.toString() !== project.owner.toString()) {
      return res.status(403).json({ message: 'Access Denied' })
    }

    const data = await Task.find({ project: req.params.id })
    return res.status(200).json(data)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getOneTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'No Such Task Exist' })
    }

    const project = await Project.findById(task.project)

    if (!project) {
      return res.status(404).json({ message: 'No Such Project Exist With Given Task' })
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access Denied' })
    }

    return res.status(200).json(task)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'No Such Task Exist' })
    }

    const project = await Project.findById(task.project)

    if (!project) {
      return res.status(404).json({ message: 'No such project exist' })
    }

    if (req.user._id.toString() !== project.owner.toString()) {
      return res.status(403).json({ message: 'Access Denied' })
    }

    task.title = req.body.title || task.title
    task.description = req.body.description || task.description
    task.status = req.body.status || task.status
    task.priority = req.body.priority || task.priority

    await task.save()
    return res.status(200).json(task)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const deleteAllTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ message: 'No Such Project Exist' })
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access Denied' })
    }

    await Task.deleteMany({ project: project._id })
    return res.status(200).json({ message: 'Successfully deleted' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'No Such Task Exist' })
    }

    const project = await Project.findById(task.project)

    if (!project) {
      return res.status(404).json({ message: 'No Such Project Exist Given Task' })
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access Denied' })
    }

    await task.deleteOne()
    return res.status(200).json({ message: 'Successfully Deleted' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
