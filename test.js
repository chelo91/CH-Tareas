import ProductManager from './models/ProductManager.js';

const productManager = new ProductManager("./files/test.json");

console.log(productManager.getProducts);

const product = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
};

console.log(productManager.addProduct(product));

console.log(productManager.getProducts);

const productUpdate = {
    title: 'producto prueba modificado',
    description: 'Este es un producto prueba modificado',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
};

console.log(productManager.updateProduct(1, productUpdate));

console.log(productManager.getProducts);

console.log(productManager.deleteProduct(1));

console.log(productManager.getProducts);