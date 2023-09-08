export default class ProductManager {
    constructor() {
        this.arrayProduct = [];
        this.nextProductId = 1;
    }
    getProducts() {
        return this.arrayProduct ;
    }
    addProduct(newProduct) {
        if (this.getProductByCode(newProduct.code) == null) {
            newProduct.id = this.nextProductId;
            this.arrayProduct.push(newProduct);
            this.nextProductId++;
            return newProduct.id;
        }
        console.error("Not found");
        return null;
    }
    getProductById(id) {
        return this.arrayProduct.find(product => product.id === id) || null;
    }
    getProductByCode(code) {
        return this.arrayProduct.find(product => product.code === code) || null;
    }
}