import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({ message: "Authentication failed" });
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const userData = jwt.verify(token, process.env.SECRET);
        req.userData = userData;
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;