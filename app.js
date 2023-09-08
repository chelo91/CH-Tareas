import ProductManager from './models/ProductManager.js';

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