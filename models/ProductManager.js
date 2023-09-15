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
        this.checkFile()
            .then((existFile) => {
                if (existFile) {
                    console.log("Existe el archivo");
                    this.loadFile();
                } else {
                    console.log("No existe el archivo, se creara uno nuevo");
                    this.saveFile();
                }
            }).catch((err) => {
                console.error(err);
            });
    }

    /* GETTER AND SETTER */
    /**
     * @description Get the arrayProduct
     */
    get getProducts() {
        this.loadFile();
        return this.arrayProduct;
    }
    /**
     * @description Set the arrayProduct
     */
    set setProducts(newArrayProduct) {
        this.arrayProduct = newArrayProduct;
        this.refreshLastId();
    }
    /**
     * @description Get the path
     */
    get getPath() {
        return this.path;
    }

    /* METHODS */
    /**
     * @description Refresh the nextProductId
     */
    refreshLastId() {
        let maxId = 0;
        this.arrayProduct.forEach(product => {
            if (product.id > maxId) {
                maxId = product.id;
            }
        });
        this.nextProductId = maxId + 1;
    }
    /**
    * @description Add product to arrayProduct
    */
    addProduct(newProduct) {
        if (!this.checkProductProp(newProduct)) {
            console.error("Falta propiedades");
            return null;
        }
        if (!(this.getProductByCode(newProduct.code) == null)) {
            console.error("Codigo repetido");
            return null;
        }
        console.log(this.getProducts);
        newProduct.id = this.nextProductId;
        this.getProducts.push(newProduct);
        this.saveFile();
        this.nextProductId++;
        return newProduct.id;
    }
    /**
     * @description Check if the product has all the properties
     */
    checkProductProp(product) {
        return ProductManager.propProduct.every((prop) => product.hasOwnProperty(prop));
    }

    /* CRUD */
    /**
     * @description Get the product by id
     */
    getProductById(id) {
        return this.getProducts.find(product => product.id === id) || (console.log('Not found'), null);
    }
    /**
     * @description Get the product by code
     */
    getProductByCode(code) {
        return this.getProducts.find(product => product.code === code) || (console.log('Not found'), null);
    }
    /**
     * @description Update the product
     */
    updateProduct(id, newProduct) {
        const arrayProduct = this.getProducts;
        const index = arrayProduct.findIndex(product => product.id === id);
        if (index !== -1) {
            const propiedades = Object.keys(newProduct);
            propiedades.forEach(prop => {
                arrayProduct[index].prop = newProduct.prop;
            });
        }
        this.saveFile();
        return index !== -1;
    }
    /**
     * @description Delete the product
     */
    deleteProduct(id) {
        const arrayProduct = this.getProducts;
        const index = arrayProduct.findIndex(product => product.id === id);
        if (index !== -1) {
            this.setProducts = arrayProduct.splice(index, 1);
        }
        this.saveFile();
        return index !== -1;
    }

    /* FILE MANAGER */
    /**
     * @description Check if the file exist
     */
    async checkFile() {
        try {
            if (!fs.existsSync(this.path)) {
                console.log("No existe el archivo");
                return false;
            } else {
                console.log("Existe el archivo");
                return true;
            }
        } catch (error) {
            console.error("Error a buscar el archivo");
            return null
        }
    }
    /**
     * @description Load the file
     */
    async loadFile() {
        try {
            fs.readFile(this.path, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error al leer el archivo:', err);
                    return false;
                } else {
                    this.setProducts = JSON.parse(data);
                    return true;
                }
            });
        } catch (error) {
            console.error('Error al escribir el archivo:', error);
            return false;
        }
    }
    /**
     * @description Save the file
     */
    async saveFile() {
        try {
            fs.writeFile(this.path, JSON.stringify(this.arrayProduct), (err) => {
                if (err) {
                    console.error('Error al escribir el archivo:', err);
                    return false;
                } else {
                    return true;
                }
            });
        } catch (error) {
            console.error('Error al escribir el archivo:', error);
            return false;
        }
    }
}