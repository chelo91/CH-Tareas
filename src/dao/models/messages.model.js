import mongoose from 'mongoose'

const messageCollection = 'messages'
const messageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    datetime: { type: Date, required: true, default: Date.now() },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    session: { type: String, required: true }
});

messageSchema.pre('findOne', function () {
    this.populate('user')
})
messageSchema.pre('find', function () {
    this.populate('user')
})

const messageModel = mongoose.model(messageCollection, messageSchema)
export default messageModel;