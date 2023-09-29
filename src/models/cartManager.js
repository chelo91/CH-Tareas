import { promises as fs } from 'fs';
//import { validateProps } from '../helper/utilsValidate.js';
import { loadFile, saveFile } from '../helper/utilsFs.js';

export default class CartManager {

    /* PROPERTIES */
    constructor(path) {
        /*CartManager.propProduct = [
            { name: 'id', type: 'number' },
            { name: 'quantity', type: 'number' }
        ];*/
        this.arrayCarts = [];
        this.nextCartId = 1;
        this.path = path;
    }

    /* GETTER AND SETTER */
    /**
     * @description Get the arrayCarts
     */
    get getCarts() {
        return this.arrayCarts;
    }
    /**
     * @description Set the arrayCarts
     */
    set setCarts(newArrayCarts) {
        this.arrayCarts = newArrayCarts;
        this._refreshLastId();
    }
    /**
     * @description Get the path
     */
    get getPath() {
        return this.path;
    }

    /* PRIVATE */
    /**
     * @description Init the cartManager
     */
    async _init() {
        try {
            await fs.access(this.getPath, fs.constants.F_OK);
            console.log("Archivo existente");
            this.setCarts = await loadFile(this.getPath);
        } catch (error) {
            console.log("Archivo inexistente");
            await saveFile(this.getPath, this.getCarts);
        }
    }
    /**
     * @description Refresh the nextCartId
     */
    _refreshLastId() {
        let maxId = 0;
        this.getCarts.forEach(cart => {
            if (cart.id > maxId) {
                maxId = cart.id;
            }
        });
        this.nextCartId = (maxId + 1);
    }
    /**
     * @description Check if the product has all the properties
     */
    /*_checkProductProp(product, update = false) {
        return validateProps(CartManager.propProduct, product, update);
        //return ProductManager.propProduct.every((prop) => product.hasOwnProperty(prop.name));
    }*/


    /* METHODS */
    /**
     * @description Add a new cart
     */
    async addCart() {
        const arrayCarts = await this.getAndLoadCarts();
        const result = this.nextCartId;
        const newCart = {
            id: result,
            products: []
        };
        this.nextCartId++;
        arrayCarts.push(newCart);
        await saveFile(this.getPath, this.getCarts);
        return result;
    }
    /**
    * @description Add product to arrayProduct
    */
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
                await saveFile(this.getPath, this.getCarts);
                return returnProduct;
            })
            .catch(error => {
                throw new Error("Cart not found");
            });
    }
    /* CRUD */
    /**
     * @description Get and load the carts
     */
    async getAndLoadCarts() {
        await this._init();
        return this.getCarts;
    }
    /**
     * @description Get the cart by id
     */
    async getCartById(pid) {
        const array = await this.getAndLoadCarts();
        return array.find(cart => cart.id === pid) || (console.log('Not found'), null);
    }
}