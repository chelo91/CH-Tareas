import { promises as fs } from 'fs';
import { validateProps } from '../helper/utilsValidate.js';
import { loadFile, saveFile } from '../helper/utilsFs.js';

export default class ProductManager {

    /* PROPERTIES */
    constructor(path) {
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
        this.path = path;
    }

    /* GETTER AND SETTER */
    /**
     * @description Get the arrayProduct
     */
    get getProducts() {
        return this.arrayProducts;
    }
    /**
     * @description Set the arrayProduct
     */
    set setProducts(newArrayProduct) {
        this.arrayProducts = newArrayProduct;
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
     * @description Init the productManager
     */
    async _init() {
        try {
            await fs.access(this.getPath, fs.constants.F_OK);
            console.log("Archivo existente");
            this.setProducts = await loadFile(this.getPath);
        } catch (error) {
            console.log(error);
            await saveFile(this.getPath, this.getProducts);
        }
    }
    /**
     * @description Refresh the nextProductId
     */
    _refreshLastId() {
        let maxId = 0;
        this.getProducts.forEach(product => {
            if (product.id > maxId) {
                maxId = product.id;
            }
        });
        this.nextProductId = (maxId + 1);
    }
    /**
     * @description Check if the product has all the properties
     */
    _checkProductProp(product, update = false) {
        return validateProps(ProductManager.propProduct, product, update);
        //return ProductManager.propProduct.every((prop) => product.hasOwnProperty(prop.name));
    }


    /* METHODS */
    /**
    * @description Add product to arrayProduct
    */
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
            await saveFile(this.getPath, this.getProducts);
            this.nextProductId++;
            return newProduct.id;
        }
    }
    /* CRUD */
    /**
     * @description Get and load the products
     */
    async getAndLoadProducts() {
        await this._init();
        return this.getProducts;
    }
    /**
     * @description Get the product by id
     */
    async getProductById(pid) {
        const array = await this.getAndLoadProducts();
        return array.find(product => product.id === pid) || (console.log('Not found'), null);
    }
    /**
     * @description Get the product by code
     */
    async getProductByCode(code) {
        const array = await this.getAndLoadProducts();
        return array.find(product => product.code === code) || (console.log('Not found'), null);
    }
    /**
     * @description Update the product
     */
    async updateProduct(pid, newProduct) {
        const arrayProduct = await this.getAndLoadProducts();
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
        await saveFile(this.getPath, this.getProducts);
        return bdProduct;
    }
    /**
     * @description Delete the product
     */
    async deleteProduct(pid) {
        const arrayProducts = await this.getAndLoadProducts();
        const index = arrayProducts.findIndex(product => product.id === pid);
        if (index === -1) {
            throw new Error("Codigo no encontrado");
        }
        arrayProducts.splice(index, 1);
        this.setProducts = arrayProducts;
        await saveFile(this.getPath, this.getProducts);
        return true;
    }
}