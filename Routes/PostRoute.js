import express from "express"; //import express
import authMiddleware from "../middlewear/authMiddlewear.js"
import { createPost } from "../Controllers/PostControllers.js";


// 1.
const router = express.Router();

// 2.
router.post("/createPost", authMiddleware, createPost)

// 3. 
export default router; // export to use in index.js