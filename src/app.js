import { port } from './config/const.config.js';
import { startExpressServer } from './express.js';
import { startSocketServer } from './socket.js';
import { httpServer } from './helper/utilsServerVars.js';

startExpressServer();
startSocketServer();

httpServer.listen(port, () => {
    console.log(`API and Socket.IO is listening on port ${port}`);
});