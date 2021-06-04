import express from "express";
import { signin, googleSignin, signup } from "../controllers/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signin/google", googleSignin);
router.post("/signup", signup);

export default router;