import express from "express";
import { getUser } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.use(auth);

router.get("/", getUser);

export default router;