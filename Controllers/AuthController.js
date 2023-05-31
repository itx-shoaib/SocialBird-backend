import userModal from "../Models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    try {
        const { password, firstname, lastname, email } = req.body

        // Validate user input
        if (!password || !firstname || !lastname || !email) {
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
        const newUser = new userModal({  password: hashedPassword, firstname, lastname, email })
        await newUser.save()

        // Return success response with JWT token
        res.status(200).json({ data: newUser })
    } catch (error) {
        // Handle errors
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate user input
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide email and password" });
        }

        // Check if user exists
        const user = await userModal.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate JWT token
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Set the token as a cookie
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "none",
        //     maxAge: 24 * 60 * 60 * 1000, // 1 day
        // });

        // Return success response with JWT token
        res.status(200).json({ data: user });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}