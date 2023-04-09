import express from "express";
import bodyParser from "body-parser";
import mongoose from "./db.js"
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js"


// Routes
const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

dotenv.config();

// usage of routes
app.use('/api/auth', AuthRoute)


const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Node server started by using nodemon"))