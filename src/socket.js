import { io } from './helper/utilsServerVars.js';
import ProductManager from './models/productManager.js';
import { pathProd } from './helper/utilsVars.js';

const productManager = new ProductManager(pathProd);
const products = await productManager.getAndLoadProducts();

export const startSocketServer = async () => {

    io.on('connection', (socket) => {

        console.log(`Cliente conectado: ${socket.id}`);

        socket.emit('products', products);

        socket.on('disconnect', () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });
}
