import jwt from "jsonwebtoken"
import userModal from "../Models/userModel.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const user = await userModal.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // add user ID to req object
        req.userId = userId;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default authMiddleware

