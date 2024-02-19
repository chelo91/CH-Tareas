import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['available', 'unavailable', 'presale'], default: 'available' },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: [String], required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        default: null,
    }
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema)
export default productModel