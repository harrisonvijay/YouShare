import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    image: String,
    id: String,
    type: String
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;