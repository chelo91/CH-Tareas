import mongoose from 'mongoose';
import ProductManagerInterface from '../interface/products.interface.js';
import productModel from '../models/products.model.js';
import { validateProps } from '../../helper/utilsValidate.js';
import { mongoUrl } from '../../helper/utilsVars.js';

export default class Products extends ProductManagerInterface {

    /* PROPERTIES */
    constructor() {
        super();
        if (!mongoose.connection.readyState) {
            Products.conection = mongoUrl;
            mongoose.connect(Products.conection, { dbName: 'ecommerce' })
                .then(() => {
                    console.log('DB connected 👊 !!')
                })
                .catch(e => {
                    console.error('Error connecting to DB 😓 ')
                })
        }
        Products.propProduct = [
            { name: 'title', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'code', type: 'string', readOnly: true },
            { name: 'price', type: 'number' },
            { name: 'status', type: 'boolean' },
            { name: 'stock', type: 'number' },
            { name: 'category', type: 'string' },
            { name: 'thumbnail', type: 'arrayOfStrings', readOnly: true }
        ];

    }
    get getConection() {
        return Products.conection;
    }
    /* METHODS */
    _checkProductProp(product, update = false) {
        return validateProps(Products.propProduct, product, update);
        //return ProductManager.propProduct.every((prop) => product.hasOwnProperty(prop.name));
    }
    async addProduct(newProduct) {
        // Check if the product has all the properties
        const isValid = this._checkProductProp(newProduct);

        if (isValid) {
            // Check if the code is repeated and reload the file .json
            const isRepeat = await this.getProductByCode(newProduct.code);
            if (isRepeat.length > 0) {
                throw new Error("Codigo repetido");
            }
            // Add the product
            const bdProduct = new productModel(newProduct);
            return bdProduct.save();
        }
    }
    /* CRUD */
    async getProducts() {
        return productModel.find({}).lean();
    }
    async getProductById(pid) {
        return productModel.findById(pid);
    }
    async getProductByCode(code) {
        return productModel.find({ code: code })
    }
    async updateProduct(pid, newProduct) {
        let bdProduct;
        Products.propProduct.forEach(prop => {
            if (!prop.readOnly) {
                bdProduct[prop.name] = newProduct[prop.name];
            }
        });
        return productModel.findOneAndUpdate({ _id: pid }, bdProduct);
    }
    async deleteProduct(pid) {
        return productModel.deleteOne({ _id: pid });
    }
}