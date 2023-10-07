import { io } from './helper/utilsServerVars.js';
import ProductManager from './models/productManager.js';
import { pathProd } from './helper/utilsVars.js';
export const startSocketServer = async () => {
    const productManager = new ProductManager(pathProd);
    const products = await productManager.getAndLoadProducts();
    io.on('connection', (socket) => {
        console.log(`Cliente conectado: ${socket.id}`);
        socket.emit('products', products);

        socket.on('create-product', (product) => {
            products.push({ socketId: socket.id, product });
            io.emit('product-message', { socketId: socket.id, operation: "create", payload: product });
        });
        socket.on('delete-product', (id) => {
            products.slide(products.findIndex(product => product.id === id), 1);
            io.emit('product-message', { socketId: socket.id, operation: "delete", payload: id });
        });

        socket.on('disconnect', () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });
}
