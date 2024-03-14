import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    email: String,
    role: String,
})

const UserModel = mongoose.models.User || mongoose.model('User', userSchema, 'user');

export default UserModel;