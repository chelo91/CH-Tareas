import express from 'express';
import handlerbars from 'express-handlebars';
import bodyParser from 'body-parser';

import { app } from './helper/utilsServerVars.js';
import { router as productRouter } from './routes/products.routes.js';
import { router as cartRouter } from './routes/carts.routes.js';
import { router as viewsRouter } from './routes/views.routes.js';
import { __dirname } from './helper/utilsVars.js';

export const startExpressServer = () => {
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extend: true }));
    app.use(express.static('public'));

    app.engine('handlebars', handlerbars.engine());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'handlebars');

    app.use("/api/products", productRouter);
    app.use("/api/carts", cartRouter);

    app.use("/", viewsRouter);
    app.use("/now", viewsRouter);
}
