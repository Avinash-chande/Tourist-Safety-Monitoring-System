import cookieParser from "cookie-parser";
import cors from 'cors'
import express from 'express'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hello World")
})

//import routes 
import userRouter from './routes/user.routes.js'
import touristRouter from './routes/tourist.routes.js'
import dashboardRouter from './routes/dashboard.routes.js'
import alertRouter from './routes/alert.routes.js'

//declare the routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tourists", touristRouter)
app.use("/api/v1/dashboard", dashboardRouter)
app.use("/api/v1/alerts", alertRouter)


export default app;