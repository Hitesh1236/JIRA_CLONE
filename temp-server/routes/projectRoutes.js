import { createProject, getProjects, getOneProject, updateProject, deleteProject } from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import express from 'express'

const router = express.Router()

router.post('/',protect,createProject)
router.get('/',protect,getProjects)
router.get('/:id',protect,getOneProject)
router.put('/:id',protect,updateProject)
router.delete('/:id',protect,deleteProject)

export default router