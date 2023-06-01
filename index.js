import express from "express";
import bodyParser from "body-parser";
import mongoose from "./db.js"
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js"
import UserRoute from "./Routes/userRoute.js"
import PostRoute from "./Routes/PostRoute.js"
import cors from "cors"


// Routes
const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
dotenv.config();

// usage of routes
app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/post', PostRoute)


const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Node server started by using nodemon"))