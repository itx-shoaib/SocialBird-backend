import express from "express"; //import express
import authMiddleware from "../middlewear/authMiddlewear.js"
import { createPost, getPost, likeDislikePost, updatePost } from "../Controllers/PostControllers.js";
import { deleteUser } from "../Controllers/userController.js";


// 1.
const router = express.Router();

// 2.
router.post("/createPost", authMiddleware, createPost)
router.get("/getPost/:id", getPost)
router.put("/updatePost", authMiddleware, updatePost)
router.delete("/deleteUser", authMiddleware, deleteUser)
router.put("/likeDislikePost", authMiddleware, likeDislikePost)

// 3. 
export default router; // export to use in index.js