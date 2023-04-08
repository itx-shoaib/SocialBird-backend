import express from "express";
import bodyParser from "body-parser";
import mongoose from "./db.js"

// Routes
const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Node server started by using nodemon"))