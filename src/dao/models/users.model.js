import mongoose from 'mongoose'
import { StringDecoder } from 'string_decoder';

const userCollection = 'users'
const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, index: { unique: true } },
    birth_date: { type: Number },
    password: { type: String },
    role: { type: String, required: true, default: 'user' }
});

const userModel = mongoose.model(userCollection, userSchema)
export default userModel