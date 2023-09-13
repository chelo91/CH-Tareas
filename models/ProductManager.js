export default class ProductManager {
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
    getProducts() {
        return this.arrayProduct;
    }
    addProduct(newProduct) {
        if (!this.checkProductProp(product)) {
            console.error("Falta propiedades");
            return null;

        }
        if (!(this.getProductByCode(newProduct.code) == null)) {
            console.error("Codigo repetido");
            return null;
        }
        newProduct.id = this.nextProductId;
        this.arrayProduct.push(newProduct);
        this.nextProductId++;
        return newProduct.id;
    }
    checkProductProp(product) {
        return ProductManager.propProduct.every((prop) => product.hasOwnProperty(prop));
    }
    getProductById(id) {
        return this.arrayProduct.find(product => product.id === id) || (console.log('Not found'), null);
    }
    getProductByCode(code) {
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
}