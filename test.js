import Product from './models/Product.js';
import ProductManager from './models/ProductManager.js';

const productManager = new ProductManager();

let product = new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

productManager.addProduct(product);

console.log(productManager);