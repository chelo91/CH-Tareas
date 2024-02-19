import mongoose from 'mongoose'
//import { StringDecoder } from 'string_decoder';

const userCollection = 'users'
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String },
    first_name: { type: String, required: true },
    last_name: { type: String },
    birth_date: { type: Number },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: { type: String, enum: ['user', 'premium', 'admin'], default: 'user' },
    documents: { type: Array, default: [] },
    last_connection: { type: Date, default: Date.now },
    actived: { type: Boolean, default: false }
});

const userModel = mongoose.model(userCollection, userSchema)
export default userModel