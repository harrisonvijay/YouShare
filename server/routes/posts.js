import express from "express";
import { createPost, getPosts, updatePost, deletePost, likePost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.use(auth);

router.post("/", createPost);
router.get("/", getPosts);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/like", likePost);

export default router;