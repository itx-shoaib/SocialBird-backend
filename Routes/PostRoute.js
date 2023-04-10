import express from "express"; //import express
import authMiddleware from "../middlewear/authMiddlewear.js"
import { createPost, getPost } from "../Controllers/PostControllers.js";


// 1.
const router = express.Router();

// 2.
router.post("/createPost", authMiddleware, createPost)
router.get("/getPost/:id", getPost)

// 3. 
export default router; // export to use in index.js