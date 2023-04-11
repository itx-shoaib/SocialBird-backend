import postModel from "../Models/postModel.js";
import mongoose from "mongoose";
import userModal from "../Models/userModel.js";

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


export const getPost = async (req, res) => {
    try {
        // Params from API URL
        const id = req.params.id;

        // Validate user input
        if (!id) {
            return res.status(400).json({ error: "Please provide valid id" })
        }

        // Getting the post
        const post = await postModel.findById(id);

        // Sending the post
        res.status(200).json({ data: post });
    } catch (error) {
        // Handle errors
        console.error(error)
        res.status(500).json({ error: error.message })
    }
};

export const updatePost = async (req, res) => {
    try {
        // Getting userId from authMiddlewear
        const userId = req.userId
        const { postId, desc, image } = req.body

        // Validate the user input
        if (!postId || !desc || !image) {
            return res.status(400).json({ error: "Please provide valid inputs" })
        }

        // Getting the post
        const post = await postModel.findById(postId)
        if (!post) {
            return res.status(400).json({ error: "Post is not available" })
        }

        // Updating the post
        if (post.userId === userId) {
            await post.updateOne({ $set: { desc: desc, image: image } });
            res.status(200).json("Post Updated");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        // Handle errors
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        // Getting userId from authMiddlewear
        const userId = req.userId
        const { postId } = req.body

        // Validate the user input
        if (!postId) {
            return res.status(400).json({ error: "Please provide valid inputs" })
        }

        // Getting the post
        const post = await postModel.findById(postId)
        if (!post) {
            return res.status(400).json({ error: "Post is not available" })
        }

        // Updating the post
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json({ messgae: "Post Deleted" });
        } else {
            res.status(403).json({ message: "Action forbidden" });
        }
    } catch (error) {
        // Handle errors
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

// For Both Like and dislike posts
export const likeDislikePost = async (req, res) => {
    const { postId } = req.body;
    const userId = req.userId;

    try {
        // Validate the user inputs 
        if (!postId) {
            return res.status(400).json({ error: "Please provide valid inputs" })
        }

        const post = await postModel.findById(postId);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json({ message: "Post liked" });
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json({ message: "Post Unliked" });
        }
    } catch (error) {
        // Handle errors
        console.error(error)
        res.status(500).json({ error: error.message })
    }
};

export const getTimelinePosts = async (req, res) => {
    try {
        const userId = req.userId;
        const currentUserPosts = await postModel.find({ userId: userId });
        const followingPosts = await userModal.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts",
                },
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0,
                },
            },
        ]);

        res
            .status(200)
            .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
                .sort((a, b) => {
                    return b.createdAt - a.createdAt;
                })
            );
    } catch (error) {
        // Handle errors
        console.error(error)
        res.status(500).json({ error: error.message })
    }
};
