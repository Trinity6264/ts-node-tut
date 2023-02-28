import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Todo title is required'],
    },
    content: {
        type: String,
        required: [true, 'Todo content is required'],
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, 'Please provide user'],
    },
    is_done: {
        type: Boolean,
        default: false,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

const TodoModel = mongoose.model('todos', TodoSchema);
export default TodoModel;