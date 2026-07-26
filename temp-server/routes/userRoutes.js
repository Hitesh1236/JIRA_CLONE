import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router()
import {login,register} from '../controllers/userController.js'
router.get('/me',protect,(req,res)=>{
    res.json(req.user)
})
router.post('/login',login)
router.post('/register',register)
export default router