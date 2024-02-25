import mongoose from 'mongoose'
import { type } from 'os';

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
    paymentType: {
        type: String,
        enum: ['mp', 'cash'],
        default: 'cash'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'approved', 'cancelled'],
        default: 'pending'
    },
    paymentId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['preparing', 'ready', 'delivered', 'cancelled', 'available', 'unavailable', 'presale'],
        default: 'preparing'
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

ticketSchema.pre('findOne', function () {
    this.populate('products.product')
})
ticketSchema.pre('find', function () {
    this.populate('products.product')
})

// Define el modelo Ticket utilizando el esquema definido anteriormente
const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel
