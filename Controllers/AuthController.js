import userModal from "../Models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    try {
        const { username, password, firstname, lastname, email } = req.body

        // Validate user input
        if (!username || !password || !firstname || !lastname || !email) {
            return res.status(400).json({ error: "Please provide all required fields" })
        }

        // Check if user already exists
        const existingUser = await userModal.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" })
        }

        // Hash password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Create new user
        const newUser = new userModal({ username, password: hashedPassword, firstname, lastname, email })
        await newUser.save()

        // Return success response with JWT token
        res.status(200).json({ data: newUser })
    } catch (error) {
        // Handle errors
        console.error(error)
        res.status(500).json({ error: "Something went wrong" })
    }
}