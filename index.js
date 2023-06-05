import express from "express";
import bodyParser from "body-parser";
import mongoose from "./db.js"
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js"
import UserRoute from "./Routes/userRoute.js"
import PostRoute from "./Routes/PostRoute.js"
import UploadRoute from "./Routes/UploadRoute.js"
import cors from "cors"


// Routes
const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
dotenv.config();

// to serve images inside public folder
// app.use(express.static('public')); 
// app.use('/images', express.static('images'));

// usage of routes
app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/post', PostRoute)
app.use('/upload', UploadRoute)


const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Node server started by using nodemon"))