export default class ProductManager {
    constructor() {
        this.arrayProduct = [];
        this.nextProductId = 1;
    }
    get getProducts() {
        return this.arryProduct
    }
    addProduct(product) {
        product.id = this.nextProductId;
        this.arrayProduct.push(product);
        this.nextProductId++;
    }
    getProductById(id) {
        return this.arrayProduct.find(product => product.id === id) || null;
    }
}