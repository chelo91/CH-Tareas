import { io } from './helper/utilsServerVars.js';
import ProductManager from './dao/mongo/products.mongo.js';
import MessageManager from './dao/mongo/messages.mongo.js';
import { mongoUrl } from './helper/utilsVars.js';

const productManager = new ProductManager();
const messageManager = new MessageManager();

const products = await productManager.getAllProducts();
const messages = await messageManager.getMessages();

export const startSocketServer = async () => {

    io.on('connection', (socket) => {

        console.log(`Cliente conectado: ${socket.id}`);

        socket.emit('products', products);

        // Manejar mensajes entrantes desde el cliente
        socket.on('login', (email) => {
            console.log(`Usuario ${email} logueado`);
            socket.emit('messages', messages);
        });

        socket.on('send-message', async (message) => {
            await messageManager.addMessage(message);
            messages.push(message);
            io.emit('new-message', message);
        });

        socket.on('disconnect', () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });
}
