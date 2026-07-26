import Project from '../models/ProjectSchema.js'
import Task from '../models/TaskSchema.js'

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Name is required.' })
    }

    await Project.create({
      name,
      description,
      owner: req.user._id,
    })

    return res.status(201).json({ message: 'Project successfully created' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id })
    return res.status(200).json(projects)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getOneProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access Denied' })
    }

    return res.status(200).json(project)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ message: 'No such project exist' })
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access Denied' })
    }

    project.name = req.body.name || project.name
    project.description = req.body.description || project.description
    await project.save()

    return res.status(200).json({ message: 'Successfully updated' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ message: 'No such project exist' })
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access Denied' })
    }

    await Task.deleteMany({ project: project._id })
    await project.deleteOne()

    return res.status(200).json({ message: 'Successfully deleted' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}