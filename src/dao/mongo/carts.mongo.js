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
        const product = await productModel.findById(newProduct._id);
        if (product.length === 0) {
            throw new Error("Product not found");
        }
        const productCart = {
            _id: product.id,
            cantidad: product.quantity
        };
        cart.products.push(productCart);
        return cart.save();
        /*return this.getCartById(idCart)
            .then(async (cart) => {
                let returnProduct = null;

                const productInCart = cart.products.find(product => product.id === newProduct.id);
                if (productInCart) {
                    productInCart.quantity += newProduct.quantity;
                    returnProduct = productInCart;
                } else {
                    cart.products.push(newProduct);
                    returnProduct = newProduct;
                }
                await saveFile(this.getConection, this.getCarts);
                return returnProduct;
            })
            .catch(error => {
                throw new Error("Cart not found");
            });*/
    }
    /* CRUD */
    async getCarts() {
        return cartModel.find({});

        /*await this._init();
        return this.getCarts;*/
    }
    async getCartById(pid) {
        return cartModel.find({ _id: pid });

        /* const array = await this.getAndLoadCarts();
         return array.find(cart => cart.id === pid) || (console.log('Not found'), null);*/
    }
}