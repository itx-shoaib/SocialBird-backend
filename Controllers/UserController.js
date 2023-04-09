import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await UserModel.findById(userId);

        if (user) {
            // from user extracting password and otherDetails
            const { password, ...otherDetails } = user._doc;
            // Sending otherDetails instead of password
            res.status(200).json(otherDetails);
        } else {
            res.status(404).json("No such user exists");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}