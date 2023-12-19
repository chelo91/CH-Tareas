import { io } from './helper/utilsServerVars.js';
import { Products, Messages } from './dao/factory.js';

const productManager = new Products();
const messageManager = new Messages();

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
