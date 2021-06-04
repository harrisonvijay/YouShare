import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    userId: String,
    userName: String,
    postId: String,
    createdAt: String,
    type: String,
    content: String, //for text type
    image: String,
    caption: String,
    likes: {
        type: [String],
        default: []
    }
});

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;