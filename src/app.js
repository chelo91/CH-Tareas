import { port } from './config/const.config.js';
import { startExpressServer } from './express.js';
import { startSocketServer } from './socket.js';
import { httpServer } from './helper/serverVars.js';

startExpressServer();
startSocketServer();

httpServer.listen(port, () => {
    console.log(`API y Socket.IO esta funcionando en el puerto ${port}`);
});