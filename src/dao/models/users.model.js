import mongoose from 'mongoose'
import { StringDecoder } from 'string_decoder';

const userCollection = 'users'
const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, index: { unique: true } },
    birth_date: { type: Number },
    age: { type: Number },
    password: { type: String },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: { type: String, required: true, default: 'user' },
    documents: { type: Array, default: [] },
    last_connection: { type: Date, default: Date.now }
});

const userModel = mongoose.model(userCollection, userSchema)
export default userModel