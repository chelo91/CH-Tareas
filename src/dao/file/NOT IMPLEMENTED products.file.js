import { promises as fs } from 'fs';
import ProductsInterface from '../interface/products.fileManager.js';
import { validateProps } from '../../middlewares/validateProps.js';
import { loadFile, saveFile } from '../../helper/utilsFs.js';
import { pathProd } from '../../config/const.config.js';

export default class Products extends ProductsInterface {

    /* PROPERTIES */
    constructor() {
        super();
        ProductManager.propProduct = [
            { name: 'title', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'code', type: 'string', readOnly: true },
            { name: 'price', type: 'number' },
            { name: 'status', type: 'boolean' },
            { name: 'stock', type: 'number' },
            { name: 'category', type: 'string' },
            { name: 'thumbnail', type: 'arrayOfStrings', readOnly: true }
        ];
        this.arrayProducts = [];
        this.nextProductId = 1;
        this.conection = pathProd;
    }
    /* GETTER AND SETTER */
    get getProducts() {
        return this.arrayProducts;
    }
    set setProducts(newArrayProduct) {
        this.arrayProducts = newArrayProduct;
        this._refreshLastId();
    }
    /* PRIVATE */
    async _init() {
        try {
            await fs.access(this.getConection, fs.constants.F_OK);
            console.log("Archivo existente");
            this.setProducts = await loadFile(this.getConection);
        } catch (error) {
            console.log(error);
            await saveFile(this.getConection, this.getProducts);
        }
    }
    _refreshLastId() {
        let maxId = 0;
        this.getProducts.forEach(product => {
            if (product.id > maxId) {
                maxId = product.id;
            }
        });
        this.nextProductId = (maxId + 1);
    }
    _checkProductProp(product, update = false) {
        return validateProps(ProductManager.propProduct, product, update);
        //return ProductManager.propProduct.every((prop) => product.hasOwnProperty(prop.name));
    }
    /* METHODS */
    async addProduct(newProduct) {
        // Check if the product has all the properties
        const isValid = this._checkProductProp(newProduct);

        if (isValid) {
            // Check if the code is repeated and reload the file .json
            const isRepeat = await this.getProductByCode(newProduct.code);
            if (isRepeat != null) {
                throw new Error("Codigo repetido");
            }
            newProduct.id = this.nextProductId;
            console.log(newProduct);
            // I comment this line because I reload up in getProductByCode
            //const array = await this.getAndLoadProducts();
            this.getProducts.push(newProduct);
            await saveFile(this.getConection, this.getProducts);
            this.nextProductId++;
            return newProduct.id;
        }
    }
    /* CRUD */
    async getProducts() {
        await this._init();
        return this.getProducts;
    }
    async getProductById(pid) {
        const array = await this.getProducts();
        return array.find(product => product.id === pid) || (console.log('Not found'), null);
    }
    async getProductByCode(code) {
        const array = await this.getProducts();
        return array.find(product => product.code === code) || (console.log('Not found'), null);
    }
    async updateProduct(pid, newProduct) {
        const arrayProduct = await this.getProducts();
        const index = arrayProduct.findIndex(product => product.id === pid);
        if (index === -1) {
            throw new Error("Producto no encontrado");
        }
        if (!this._checkProductProp(newProduct, true)) {
            return;
        }
        const bdProduct = arrayProduct[index];
        ProductManager.propProduct.forEach(prop => {
            if (!prop.readOnly) {
                bdProduct[prop.name] = newProduct[prop.name];
            }
        });
        await saveFile(this.getConection, this.getProducts);
        return bdProduct;
    }
    async deleteProduct(pid) {
        const arrayProducts = await this.getProducts();
        const index = arrayProducts.findIndex(product => product.id === pid);
        if (index === -1) {
            throw new Error("Codigo no encontrado");
        }
        arrayProducts.splice(index, 1);
        this.setProducts = arrayProducts;
        await saveFile(this.getConection, this.getProducts);
        return true;
    }
}