import express from "express";
import dotenv from "dotenv"
dotenv.config({
    path:"backend/config/.env"
})
import { connectDB } from "./database/connection.js";
import authRoute from "./routes/auth.route.js";
const PORT = process.env.PORT || 8000








const app = express()
app.use(express.json())


//routes
app.use('/api/auth',authRoute)


app.listen(PORT,()=>{
    connectDB()
    console.log(`Server started on ${PORT}`);
})