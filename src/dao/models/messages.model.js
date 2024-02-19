import mongoose from 'mongoose'

const messageCollection = 'messages'
const messageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    datetime: { type: Number, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
});

const messageModel = mongoose.model(messageCollection, messageSchema)
export default messageModel;