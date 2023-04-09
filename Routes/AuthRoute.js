import express from "express"; //import express
import { registerUser } from "../Controllers/AuthController.js";

// 1.
const router = express.Router();

// 2.
router.post('/register', registerUser);
// router.post('/loginUser', UserController.loginUser);

// 3. 
export default router; // export to use in index.js