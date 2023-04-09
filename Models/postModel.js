import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        desc: String,
        likes: [{ type: String }],
        image: String,
    },
    {
        timestamps: true,
    }
);

var postModel = mongoose.model("Posts", postSchema);
export default postModel;