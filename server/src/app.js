import express from 'express'
import cors from 'cors'
const app = express()


app.use(express.json())
app.use(cors())

// routes required for app
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import projectRoutes from './routes/projectRoutes.js'

app.use("/api/auth",userRoutes)
app.use("/api/tasks",taskRoutes)
app.use("/api/projects",projectRoutes)

// services & middlewares
import noRouteHandler from './services/noRouteHandler.js'
import errorHandlerMiddleware from './middleware/errHandlerMiddleware.js'

app.use(noRouteHandler)
app.use(errorHandlerMiddleware)

export default app;