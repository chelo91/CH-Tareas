import { promises as fs } from 'fs';

export default class ProductManager {

    /* PROPERTIES */
    constructor(path) {
        ProductManager.propProduct = [
            'title',
            'description',
            'price',
            'thumbnail',
            'code',
            'stock'
        ];
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
                } else {
                    console.log('Archivo guardado');
                    return true;
                }
            });
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
    _checkProductProp(product) {
        return ProductManager.propProduct.every((prop) => product.hasOwnProperty(prop));
    }


    /* METHODS */
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
    * @description Add product to arrayProduct
    */
    async addProduct(newProduct) {
        if (!this._checkProductProp(newProduct)) {
            console.error("Falta propiedades");
            return null;
        }
        const isRepeat = await this.getProductByCode(newProduct.code);
        if (isRepeat != null) {
            console.error("Codigo repetido");
            return null;
        }
        newProduct.id = this.nextProductId;
        const array = await this.getAndLoadProducts();
        array.push(newProduct);
        await this._saveFile();
        this.nextProductId++;
        return newProduct.id;
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
    async getProductById(id) {
        const array = await this.getAndLoadProducts();
        return array.find(product => product.id === id) || (console.log('Not found'), null);
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
    async updateProduct(id, newProduct) {
        const arrayProduct = await this.getAndLoadProducts();
        const index = arrayProduct.findIndex(product => product.id === id);
        if (index === -1) {
            return false;
        }

        const propiedades = Object.keys(newProduct);
        propiedades.forEach(prop => {
            //No podemos cambiar ni id, ni code y la propiedas tiene que estar en propProduct
            if (prop !== 'id' && prop !== 'code' && ProductManager.propProduct.includes(prop)) {
                arrayProduct[index][prop] = newProduct[prop];
            }
        });
        await this._saveFile();
        return true;
    }
    /**
     * @description Delete the product
     */
    async deleteProduct(id) {
        const arrayProduct = this.getAndLoadProducts();
        const index = arrayProduct.findIndex(product => product.id === id);
        if (index === -1) {
            return false
        }
        arrayProduct.splice(index, 1);
        this.setProducts = arrayProduct;
        await this._saveFile();
        return true;
    }
}