import userModal from "../Models/userModel.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await userModal.findById(userId);

        if (user) {
            // from user extracting password and otherDetails
            const { password, ...otherDetails } = user._doc;
            // Sending otherDetails instead of password
            res.status(200).json(otherDetails);
        } else {
            res.status(404).json("No such user exists");
        }
    } catch (error) {
        // Handle errors
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

export const updateUser = async (req, res) => {
    const id = req.userId;
    try {
        const { currentUserId, currentUserAdminStatus, password } = req.body;
        if (id === currentUserId || currentUserAdminStatus) {
            try {
                // Password must be store in hashing
                if (password) {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(password, salt);
                }
                // Updating rest of the user
                const user = await userModal.findByIdAndUpdate(id, req.body, { new: true })
                res.status(200).json({
                    data: user
                })
            } catch (error) {
                // Handle errors
                console.error(error)
                res.status(500).json({ error: error.message })
            }

        }
        else {
            res.status(403).json("Access Denied! you can only update your own profile");
        }

    } catch (error) {
        // Handle errors
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

// Delete user
export const deleteUser = async (req, res) => {
    const id = req.userId;

    const { currentUserId, currentUserAdminStatus } = req.body;

    if (currentUserId === id || currentUserAdminStatus) {
        try {
            await userModal.findByIdAndDelete(id);
            res.status(200).json("User deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("Access Denied! you can only delete your own profile");
    }
};

export const followUser = async (req, res) => {
    try {
        const followUserId = req.params.id;
        const currentUserId = req.userId;

        // Check if the user is trying to follow themselves
        if (followUserId === currentUserId) {
            return res.status(403).json({ message: "You cannot follow yourself" });
        }

        // Find the user to be followed and the current user
        const userToFollow = await userModal.findById(followUserId);
        const currentUser = await userModal.findById(currentUserId);

        // Check if the user is already being followed
        if (userToFollow.followers.includes(currentUserId)) {
            return res.status(403).json({ message: "You are already following this user" });
        }

        // Follow the user and update their followers and following lists
        await userToFollow.updateOne({ $push: { followers: currentUserId } });
        await currentUser.updateOne({ $push: { following: followUserId } });

        res.status(200).json({ message: "User followed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const unFollowUser = async (req, res) => {
    try {
        const unFollowUserId = req.params.id;
        const currentUserId = req.userId;

        // Check if the user is trying to follow themselves
        if (unFollowUserId === currentUserId) {
            return res.status(403).json({ message: "You cannot follow yourself" });
        }

        // Find the user to be followed and the current user
        const userToUnFollow = await userModal.findById(unFollowUserId);
        const currentUser = await userModal.findById(currentUserId);

        // Check if the user is already being followed
        if (userToUnFollow.followers.includes(currentUserId)) {
            return res.status(403).json({ message: "You are already unfollowing this user" });
        }

        // Follow the user and update their followers and following lists
        await userToUnFollow.updateOne({ $pull: { followers: currentUserId } });
        await currentUser.updateOne({ $pull: { following: userToUnFollow } });

        res.status(200).json({ message: "User unfollowed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
