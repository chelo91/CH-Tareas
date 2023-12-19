import mongoose from 'mongoose'

const ticketCollection = 'tickets'
const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
});

// Define el modelo Ticket utilizando el esquema definido anteriormente
const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel
