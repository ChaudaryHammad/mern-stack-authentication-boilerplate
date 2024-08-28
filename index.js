import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "config/.env",
});
import cookieParser from "cookie-parser";
import { connectDB } from "./database/connection.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
const PORT = process.env.PORT || 8000;

//initialize express
const app = express();
//top level middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRoute);
app.use("/api", testRoute);

//listen to port
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on ${PORT}`);
});
