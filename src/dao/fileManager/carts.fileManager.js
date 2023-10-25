import { promises as fs } from 'fs';
import CartsInterface from '../interface/carts.interface.js';
import { loadFile, saveFile } from '../../helper/utilsFs.js';
import { pathCart } from '../../helper/utilsVars.js';

export default class Carts extends CartsInterface {

    /* PROPERTIES */
    constructor() {
        super();
        this.arrayCarts = [];
        this.nextCartId = 1;
        this.conection = pathCart;
    }
    /* GETTER AND SETTER */
    get getCarts() {
        return this.arrayCarts;
    }
    set setCarts(newArrayCarts) {
        this.arrayCarts = newArrayCarts;
        this._refreshLastId();
    }
    get getConection() {
        return this.conection;
    }
    /* PRIVATE */
    async _init() {
        try {
            await fs.access(this.getConection, fs.constants.F_OK);
            console.log("Archivo existente");
            this.setCarts = await loadFile(this.getConection);
        } catch (error) {
            console.log("Archivo inexistente");
            await saveFile(this.getConection, this.getCarts);
        }
    }
    _refreshLastId() {
        let maxId = 0;
        this.getCarts.forEach(cart => {
            if (cart.id > maxId) {
                maxId = cart.id;
            }
        });
        this.nextCartId = (maxId + 1);
    }
    /* METHODS */
    async addCart() {
        const arrayCarts = await this.getCarts();
        const result = this.nextCartId;
        const newCart = {
            id: result,
            products: []
        };
        this.nextCartId++;
        arrayCarts.push(newCart);
        await saveFile(this.getConection, this.getCarts);
        return result;
    }
    async addProduct(idCart, newProduct) {
        return this.getCartById(idCart)
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
            });
    }
    /* CRUD */
    async getCarts() {
        await this._init();
        return this.getCarts;
    }
    async getCartById(pid) {
        const array = await this.getCarts();
        return array.find(cart => cart.id === pid) || (console.log('Not found'), null);
    }
}