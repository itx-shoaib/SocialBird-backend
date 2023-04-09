import express from "express"; //import express
import authMiddleware from "../middlewear/authMiddlewear.js"
import { deleteUser, followUser, getUser, unFollowUser, updateUser } from "../Controllers/userController.js";


// 1.
const router = express.Router();

// 2.
router.get("/getUser", authMiddleware, getUser)
router.put("/updateUser", authMiddleware, updateUser)
router.delete("/deleteUser", authMiddleware, deleteUser)
router.put("/followUser/:id", authMiddleware, followUser)
router.put("/unFollowUser/:id", authMiddleware, unFollowUser)

// 3. 
export default router; // export to use in index.js