import mongoose from 'mongoose'

const messageCollection = 'messages'
const messageSchema = new mongoose.Schema({
    session: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Number, required: true }
});

const messageModel = mongoose.model(messageCollection, messageSchema)
export default messageModel;