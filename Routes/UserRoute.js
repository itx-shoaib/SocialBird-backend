import express from "express"; //import express
import authMiddleware from "../middlewear/authMiddlewear.js"
import { getUser } from "../Controllers/userController.js";


// 1.
const router = express.Router();

// 2.
router.get("/getUser", authMiddleware, getUser)

// 3. 
export default router; // export to use in index.js