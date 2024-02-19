import mongoose from 'mongoose'

const ticketCollection = 'tickets'
const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        }
    ],
});

// Define el modelo Ticket utilizando el esquema definido anteriormente
const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel
