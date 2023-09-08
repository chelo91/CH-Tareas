//import ProductManager from './models/ProductManager.js';

class ProductManager {
    constructor() {
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
}

console.log("\nSe creará una instancia de la clase “ProductManager");
const pm = new ProductManager();

console.log("\nSe llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []");
console.log(pm.getProducts());

const product = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
};

console.log("\nSe llamará al método “addProduct”");
let idPro = pm.addProduct(product);

console.log("\nEl objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE");
console.log("Nueva Id " + idPro);

console.log("\nSe llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado");
console.log(pm.getProducts());

console.log("\nSe llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.");
pm.addProduct(product);

console.log("\nSe evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo");
console.log(pm.getProductById(idPro));
console.log(pm.getProductById(500));