import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const cartCollection = 'carts'
const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        }
    ],
    role: { type: String, enum: ['cart', 'favorite', 'wishlist'], default: 'user' },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
});

cartSchema.pre('findOne', function () {
    this.populate('products.product')
})
cartSchema.pre('find', function () {
    this.populate('products.product')
})

cartSchema.plugin(mongoosePaginate);
const cartModel = mongoose.model(cartCollection, cartSchema)
export default cartModel