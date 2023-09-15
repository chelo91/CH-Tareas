import ProductManager from './models/ProductManager.js';

const productManager = new ProductManager("./files/productos.json");
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
    title: 'Producto Modificado',
    description: 'Este es un producto prueba4',
    price: 100,
    thumbnail: 'Sin imagen',
    code: 'abc14',
    stock: 20,
};
console.log(productManager.addProduct(product));
console.log(productManager.updateProduct(1, product3));
productManager.saveFile();
