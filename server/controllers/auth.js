import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import imageToBase64 from "image-to-base64";

dotenv.config();

export const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Insufficient details" });
    }
    const foundUser = await UserModel.findOne({ email: email });
    if (!foundUser) {
        return res.status(404).json({ message: "No account with the specified email address" });
    }
    if (foundUser.type === "google") {
        return res.status(400).json({ message: "You have previously signed in with Google" })
    }
    const passwordsMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordsMatch) {
        return res.status(400).json({ message: "Your password is wrong" });
    }

    // Valid credentials
    const token = jwt.sign({ id: foundUser._id, name: foundUser.name }, process.env.SECRET);
    return res.status(200).json(JSON.stringify(token));
}

export const signup = async (req, res) => {
    var { name, email, password, image } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Insufficient details" });
    }
    const foundUser = await UserModel.findOne({ email: email });
    if (foundUser) {
        return res.status(400).json({ message: "Account already exists with this email" });
    }
    if (image) {
        image = image;
    } else {
        const url = "https://ui-avatars.com/api/name=" + name;
        try {
            const base64Image = await imageToBase64(url);
            image = "data:image/png;base64," + base64Image;
        } catch {
            return res.status(500).json({ message: "Some error occurred" });
        }
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({ name: name, email: email, password: hashedPassword, image: image, type: "custom" });
    if (newUser) {
        const token = jwt.sign({ id: newUser._id, name: newUser.name }, process.env.SECRET);
        return res.status(200).json(JSON.stringify(token));
    }
    return res.status(500).json({ message: "Some error occurred" });
}

export const googleSignin = async (req, res) => {
    const { name, email, imageUrl } = req.body.profileObj;
    var foundUser = await UserModel.findOne({ email: email });
    if (!foundUser) {
        foundUser = await UserModel.create({ name: name, email: email, image: imageUrl, type: "google" });
    }
    const token = jwt.sign({ id: foundUser._id, name: foundUser.name }, process.env.SECRET);
    return res.status(200).json(JSON.stringify(token));
}