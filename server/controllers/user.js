import UserModel from "../models/user.js";

export const getUser = async (req, res) => {
    const userData = req.userData;
    const foundUser = await UserModel.findById(userData.id);
    return res.status(200).json({ name: foundUser.name, id: foundUser._id, image: foundUser.image, email: foundUser.email });
}