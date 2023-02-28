import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            required: true,
            type: String,
            minlength: 3,
            index: true,
        },
        password: {
            required: true,
            type: String,
            minlength: 6,
        },
    }, { timestamps: true }
)

const UserModel = mongoose.model('user', UserSchema)
export default UserModel;