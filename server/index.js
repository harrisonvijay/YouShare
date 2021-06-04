import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter)

app.get("/", (req, res) => {
    res.send("<h1>Welcome to YouShare API!</h1>");
})

const MONGO_URL = String(process.env.MONGO_URL);
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });