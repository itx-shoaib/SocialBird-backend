import postModel from "../Models/postModel.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
    try {
        // userId is coming from token
        const userId = req.userId
        const { desc, image } = req.body

        // Validate user input
        if (!desc || !image) {
            return res.status(400).json({ error: "Please provide all required fields" })
        }

        // Creating new post
        const newPost = new postModel.create({ userId: userId, desc: desc, image: image })
        await newPost.save()

        // Sending the response
        res.status(200).json({ message: "Post Created" })

    } catch (error) {
        // Handle errors
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}