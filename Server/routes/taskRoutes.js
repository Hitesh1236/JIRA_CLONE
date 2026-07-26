import express, { Router } from 'express'
const router = express.Router()

import {protect} from '../middleware/authMiddleware.js'
import { createTask, getAllTask, updateTask, getOneTask, deleteTask } from '../controllers/taskController.js'

router.post('/projects/:id',protect,createTask)
router.get('/projects/:id',protect,getAllTask)
router.get('/:id',protect,getOneTask)
router.put('/:id',protect,updateTask)
router.delete('/:id',protect,deleteTask)

export default router