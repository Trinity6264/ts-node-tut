import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, 'token is required'],
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, 'Please provide user'],
    },

}, { timestamps: true })

const TokenModel = mongoose.model('token', TokenSchema);
export default TokenModel;