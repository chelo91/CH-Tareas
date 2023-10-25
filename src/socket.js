import { io } from './helper/utilsServerVars.js';
import ProductManager from './dao/mongo/products.mongo.js';
import { mongoUrl } from './helper/utilsVars.js';

const productManager = new ProductManager(mongoUrl);
const products = await productManager.getProducts();

export const startSocketServer = async () => {

    io.on('connection', (socket) => {

        console.log(`Cliente conectado: ${socket.id}`);

        socket.emit('products', products);

        socket.on('disconnect', () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });
}
