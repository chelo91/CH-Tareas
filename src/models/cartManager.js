import { promises as fs } from 'fs';
import { validateProps } from '../helper/utilsValidate.js';
export default class CartManager {

    /* PROPERTIES */
    constructor(path) {
        this.arrayProduct = [];
        this.nextProductId = 1;
        this.path = path;
    }

    /* GETTER AND SETTER */
    /**
     * @description Get the arrayProduct
     */
    get getProducts() {
        return this.arrayProduct;
    }
    /**
     * @description Set the arrayProduct
     */
    set setProducts(newArrayProduct) {
        this.arrayProduct = newArrayProduct;
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
            await fs.access(this.path, fs.constants.F_OK);
            console.log("Archivo existente");
            await this._loadFile();
        } catch (error) {
            console.log("Archivo inexistente");
            await this._saveFile();
        }

    }
    /**
     * @description Load the file
     */
    async _loadFile() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            if (!data) {
                console.error('Error al leer el archivo');
                return false;
            } else {
                console.log("Archivo cargado")
                this.setProducts = JSON.parse(data);
                return true;
            }
        } catch (error) {
            console.error('Error al cargar el archivo');
            return false;
        }
    }
    /**
     * @description Save the file
     */
    async _saveFile() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.arrayProduct), (err) => {
                if (err) {
                    console.error('Error al escribir el archivo');
                    return false;
                }
            });
            console.log('Archivo guardado');
            return true;
        } catch (error) {
            console.error('Error al escribir el archivo');
            return false;
        }
    }
    /**
     * @description Refresh the nextProductId
     */
    _refreshLastId() {
        let maxId = 0;
        this.arrayProduct.forEach(product => {
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
            await this._saveFile();
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
        await this._saveFile();
        return bdProduct;
    }
    /**
     * @description Delete the product
     */
    async deleteProduct(pid) {
        const arrayProduct = await this.getAndLoadProducts();
        const index = arrayProduct.findIndex(product => product.id === pid);
        if (index === -1) {
            throw new Error("Codigo no encontrado");
        }
        arrayProduct.splice(index, 1);
        this.setProducts = arrayProduct;
        await this._saveFile();
        return true;
    }
}