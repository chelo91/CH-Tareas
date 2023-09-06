export default class ProductManager {
    arrayProduct;

    constructor() {
        this.arrayProduct = [];
    }
    get getProducts() {
        return this.arryProduct
    }
    addProduct(product) {
        this.arrayProduct.push(product);
    }
    getProductById(id) {
        return this.arrayProduct.find(product => product.getId() === id)
    }
}