import ProductManager from './models/ProductManager.js';

const productManager = new ProductManager();

const product = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
};

const product2 = {
    title: 'producto prueba2',
    description: 'Este es un producto prueba2',
    price: 100,
    thumbnail: 'Sin imagen',
    code: 'abc1234',
    stock: 20,
};

const product3 = {
    title: 'producto prueba4',
    description: 'Este es un producto prueba4',
    price: 100,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 20,
};
console.log(productManager.addProduct(product));
console.log(productManager.addProduct(product2));
console.log(productManager.addProduct(product3));
console.log("Obtenemos productos ");
console.log(productManager);

console.log("Buscamos la id 1");
console.log(productManager.getProductById(1));
console.log("Buscamos la id 5");
console.log(productManager.getProductById(5));