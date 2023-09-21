import fs from 'fs';

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
            const data = await fs.promises.readFile(this.path, 'utf8');
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
            //No se me ocurre solucion estetica para esto // Si llamo getProducts hace el load y pierdo lo que quiero guardar
            await fs.promises.writeFile(this.path, JSON.stringify(this.arrayProduct));
            console.log('Archivo guardado');
            return true;
        } catch (error) {
            console.error('Error al escribir el archivo');
            return false;
        }
    }
    /**
     *  @description Check if the file exist
     */
    async _existFile() {
        try {
            await fs.promises.access(this.path);
            return true;
        } catch (error) {
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
            const exist = await this._existFile();
            if (exist) {
                await this._loadFile();
            } else {
                await this._saveFile();
            }
        } catch (error) {
            console.error('Error en la inicialización:', error);
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
        if ((this.getProductByCode(newProduct.code) != null)) {
            console.error("Codigo repetido");
            return null;
        }
        newProduct.id = this.nextProductId;
        await this.getAndLoadProducts().push(newProduct);
        this._saveFile();
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