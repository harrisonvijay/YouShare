import PostModel from "../models/post.js";
import { nanoid } from "nanoid";

export const createPost = async (req, res) => {
    const userData = req.userData;
    if (!userData) {
        return res.status(400).json({ message: "Invalid Credentials" });
    }
    const data = req.body;
    if (!data || !data.type || (data.type == "text" && !data.content) || (data.text == "image" && !data.image)) {
        return res.status(400).json({ message: "Malformed Post" });
    }
    var newPost;
    if (data.type == "text") {
        newPost = await PostModel.create({
            userId: userData.id,
            userName: userData.name,
            postId: nanoid(9),
            type: data.type,
            content: data.content,
            createdAt: new Date().toISOString()
        });
    } else {
        newPost = await PostModel.create({
            userId: userData.id,
            userName: userData.name,
            postId: nanoid(9),
            type: data.type,
            image: data.image,
            caption: data.caption ? data.caption : "",
            createdAt: new Date().toISOString()
        });
    }
    if (newPost) {
        return res.status(200).json(newPost);
    }
    return res.status(500).json({ message: "Some error occurred" });
}

export const getPosts = async (req, res) => {
    const posts = await PostModel.find();
    return res.status(200).json(posts);
}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const foundPost = await PostModel.findOne({ postId: postId });
    if (!foundPost) {
        return res.status(404).json({ message: "Invalid Post ID" });
    }
    const data = req.body;
    if (!data || !data.type || (data.type === "text" && !data.content) || (data.text === "image" && !data.image)) {
        return res.status(400).json({ message: "Insufficient Data" });
    }
    await PostModel.updateOne({ postId: postId }, data);
    const updatedPost = await PostModel.findOne({ postId: postId });
    return res.status(200).json(updatedPost);
}

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const foundPost = await PostModel.findOne({ postId: postId });
    if (!foundPost) {
        return res.status(404).json({ message: "Invalid Post ID" });
    }
    await PostModel.deleteOne({ postId: postId });
    return res.status(200).json({ postId });
}


export const likePost = async (req, res) => {
    const userData = req.userData; // contains id, name, email
    if (!userData) {
        return res.status(400).json({ message: "Invalid Credentials" });
    }
    const userId = userData.id;
    const postId = req.params.id;
    const foundPost = await PostModel.findOne({ postId: postId });
    if (!foundPost) {
        return res.status(404).json({ message: "Invalid Post ID" });
    }
    if (foundPost.likes.find((id) => id === userId)) {
        foundPost.likes = foundPost.likes.filter((id) => id != userId);
    } else {
        foundPost.likes.push(userId);
    }
    await PostModel.updateOne({ postId: postId }, foundPost);
    const updatedPost = await PostModel.findOne({ postId: postId });
    return res.status(200).json(updatedPost);
}