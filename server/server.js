import dotenv from "dotenv";
dotenv.config()

import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

import express from "express";
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import { connectDB } from "./config/db.js";
const app = express();
app.use(
  cors({
    origin: process.env.VITE_URL,
  })
);
app.use(express.json())
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected")
    app.use('/api/auth',userRoutes)
    app.use('/api/projects',projectRoutes)
    app.use('/api/tasks',taskRoutes)
    app.get("/", (req, res) => {
      res.send("This is home page");
    });

    const PORT = process.env.PORT || 3200;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.log("DB Error:", err);
  }
};

startServer();