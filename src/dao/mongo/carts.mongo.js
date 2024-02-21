import mongoose from 'mongoose'
import CartManagerInterface from '../interface/carts.interface.js';
import cartModel from '../models/carts.model.js'
import productModel from '../models/products.model.js';
import mongoosePaginate from 'mongoose-paginate-v2'

export default class Carts extends CartManagerInterface {

    /* PROPERTIES */
    constructor() {
        super();
    }
    /* METHODS */
    async addCart(user, role = 'cart') {
        const newCart = new cartModel();
        newCart.user = user;
        newCart.role = role;
        return newCart.save();
    }
    async findOrAddCart(user, role = 'cart') {
        const findCart = await cartModel.findOne({ user: user, role: role });
        if (findCart == null) {
            const newCart = new cartModel();
            newCart.user = user;
            newCart.role = role;
            const returnCart = await newCart.save();
            return returnCart;
        }
        return findCart;

    }
    async addProduct(idCart, newProduct) {
        const cart = await this.getCartById(idCart);
        const product = await productModel.findById(newProduct.id);

        const productInCart = cart.products.find(row => row.product.id == newProduct.id);
        if (productInCart !== undefined) {
            productInCart.quantity += newProduct.quantity;
        } else {
            const productToCart = {
                product: newProduct.id,
                quantity: newProduct.quantity
            };
            cart.products.push(productToCart);
        }
        return cart.save();
    }
    /* CRUD */
    async getCarts(query) {
        const carts = await cartModel.paginate(
            query.filters,
            {
                page: query.page,
                limit: query.limit,
                lean: true,
                sort: query.order
            }
        );
        return carts;
    }
    async getCartById(cid, lean = false) {
        if (lean) {
            return cartModel.findById(cid).lean();
        }
        return cartModel.findById(cid);
    }
    async deleteCart(cid) {
        return cartModel.findByIdAndDelete(cid);
    }
    async deleteProductCart(cid, pid) {
        return cartModel.updateOne(
            { _id: cid },
            { $pull: { products: { product: pid } } }
        );
    }
    async updateCart(cid, cart) {
        return cartModel.findByIdAndUpdate(cid, cart);
    }
    async updateCartProductQuantity(cid, pid, quantity) {
        return cartModel.updateOne(
            { _id: cid, "products.product": pid },
            { $set: { "products.$.quantity": quantity } }
        );
    }
}