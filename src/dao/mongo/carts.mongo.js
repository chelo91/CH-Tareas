import mongoose from 'mongoose'
import CartManagerInterface from '../interface/carts.interface.js';
import cartModel from '../models/carts.model.js'
import productModel from '../models/products.model.js';
import { mongoUrl } from '../../helper/utilsVars.js';

export default class Carts extends CartManagerInterface {

    /* PROPERTIES */
    constructor() {
        super();
        if (!mongoose.connection.readyState) {
            Carts.conection = mongoUrl;
            mongoose.connect(Carts.conection, { dbName: 'ecommerce' })
                .then(() => {
                    console.log('DB connected 👊 !!')
                })
                .catch(e => {
                    console.error('Error connecting to DB 😓 ')
                })
        }
    }
    get getConection() {
        return Carts.conection;
    }
    /* METHODS */
    async addCart() {
        const newCart = new cartModel();
        return newCart.save();
        /*const arrayCarts = await this.getAndLoadCarts();
        const result = this.nextCartId;
        const newCart = {
            id: result,
            products: []
        };
        this.nextCartId++;
        arrayCarts.push(newCart);
        await saveFile(this.getConection, this.getCarts);
        return result;*/
    }
    async addProduct(idCart, newProduct) {
        const cart = await this.getCartById(idCart);
        const product = await productModel.findById(newProduct.id);
        if (product.length === 0) {
            throw new Error("Product not found");
        }

        const productInCart = cart.products.find(product => product.productId == newProduct.id);
        if (productInCart !== undefined) {
            productInCart.quantity += newProduct.quantity;
        } else {
            const productToCart = {
                productId: newProduct.id,
                quantity: newProduct.quantity
            };
            cart.products.push(productToCart);
        }
        return cart.save();
    }
    /* CRUD */
    async getCarts() {
        return cartModel.find({});
    }
    async getCartById(pid) {
        return cartModel.findById(pid);
    }
}