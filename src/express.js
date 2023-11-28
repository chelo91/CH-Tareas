import express from 'express';
import handlerbars from 'express-handlebars';
import session from 'express-session';
import cookieParser from 'cookie-parser'
//import MongoStore from 'connect-mongo'
import passport from "passport";

import { app } from './helper/utilsServerVars.js';
import { router as productsRouter } from './routes/products.routes.js';
import { router as cartsRouter } from './routes/carts.routes.js';
import { router as viewsRouter } from './routes/views.routes.js';
import { router as sessionsRouter } from './routes/sessions.routes.js';
import { __dirname, mongoUrl, secretSession } from './helper/utilsVars.js';
import { initializePassport } from "./config/passport.config.js";

export const startExpressServer = () => {
    /*app.use(session({
        store: MongoStore.create({
            mongoUrl,
            dbName: 'ecommerce',
            ttl: 100
        }),
        secret: secret,
        resave: true,
        saveUninitialized: true
    }));*/
    // Session
    app.use(session({
        secret: secretSession,
        resave: true,
        saveUninitialized: true
    }))
    app.use(cookieParser())

    app.use(express.json())
    app.use(express.urlencoded({ extend: true }));
    app.use(express.static('public'));

    initializePassport();
    app.use(passport.initialize())
    app.use(passport.session())

    app.engine('handlebars', handlerbars.engine());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'handlebars');

    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartsRouter);

    app.use("/api/sessions", sessionsRouter);

    app.use("/", viewsRouter);
    app.use("/now", viewsRouter);
}
