import { Console } from 'console';
import fs from 'fs';

class ProductManager {

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
                    return this.loadFile();
                } else {
                    return this.saveFile();
                }
            }).catch((err) => {
                console.error(err);
            });
    }

    /* GETTER AND SETTER */
    get getProducts() {
        this.loadFile();
        return this.arrayProduct;
    }
    set setProducts(newArrayProduct) {
        this.arrayProduct = newArrayProduct;
    }
    get getPath() {
        return this.path;
    }

    /* METHODS */
    addProduct(newProduct) {
        if (!this.checkProductProp(newProduct)) {
            console.error("Falta propiedades");
            return null;

        }
        if (!(this.getProductByCode(newProduct.code) == null)) {
            console.error("Codigo repetido");
            return null;
        }
        newProduct.id = this.nextProductId;
        this.arrayProduct.push(newProduct);
        this.saveFile();
        this.nextProductId++;
        return newProduct.id;
    }
    checkProductProp(product) {
        return ProductManager.propProduct.every((prop) => product.hasOwnProperty(prop));
    }
    getProductById(id) {
        this.loadFile();
        return this.arrayProduct.find(product => product.id === id) || (console.log('Not found'), null);
    }
    getProductByCode(code) {
        this.loadFile();
        return this.arrayProduct.find(product => product.code === code) || (console.log('Not found'), null);
    }
    updateProduct(id, product) {
        return this.arrayProduct.find(product => product.id === id) || (console.log('Not found'), null);
    }
    deleteProduct(id) {
        const index = this.arrayProduct.findIndex(product => product.id === id);
        if (index !== -1) {
            this.arrayProduct.splice(index, 1);
        }
        return index !== -1;
    }

    /* FILE MANAGER */
    async checkFile() {
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(this.path)) {
                    console.log("No existe el archivo");
                    resolve(false);
                } else {
                    console.log("Existe el archivo");
                    resolve(true);
                }
            } catch (error) {
                console.error("Error a buscar el archivo");
                reject("Error a buscar el archivo");
            }
        });
    }
    async loadFile() {
        return new Promise((resolve, reject) => {
            try {
                fs.readFileSync(this.path, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error al leer el archivo:', err);
                        reject('Error al leer el archivo:', err);
                    } else {
                        console.log('Contenido del archivo:', data);
                        this.setProducts = JSON.parse(data);
                        resolve(true);
                    }
                });
            } catch (error) {
                reject("Error al cargar el archivo");
            }
        });
    }
    async saveFile() {
        return new Promise((resolve, reject) => {
            try {
                fs.writeFileSync(this.path, JSON.stringify(this.arrayProduct), (err) => {
                    if (err) {
                        console.error('Error al escribir el archivo:', err);
                        reject('Error al escribir el archivo:', err);
                    } else {
                        resolve(true);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

}

export default ProductManager;