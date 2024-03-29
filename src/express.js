import express from 'express';
import handlerbars from 'express-handlebars';
import session from 'express-session';
import cookieParser from 'cookie-parser'
//import MongoStore from 'connect-mongo'
import passport from "passport";

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'

import { app } from './helper/serverVars.js';
import { router as productsRouter } from './routes/products.routes.js';
import { router as cartsRouter } from './routes/carts.routes.js';
import { router as viewsRouter } from './routes/views.routes.js';
import { router as sessionsRouter } from './routes/sessions.routes.js';
import { router as mockingRouter } from './routes/mocking.routes.js';
import { router as loggersRouter } from './routes/loggers.routes.js';

import { __dirname, secretSession } from './config/const.config.js';
import { initializePassport } from "./config/passport.config.js";
import errorHandler from './middlewares/error.js'
import { addLogger } from './helper/logger.js'


export const startExpressServer = () => {
    const swaggerOptions = {
        definition: {
            openapi: '3.0.1',
            info: {
                title: 'Documentacion de Ecommerce',
                description: 'Este proyecto es de Ecommerce'
            }
        },
        apis: [`${__dirname}/dao/docs/**/*.yaml`]
    }
    // Session
    app.use(session({
        secret: secretSession,
        resave: true,
        saveUninitialized: true
    }))
    app.use(cookieParser())

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(express.static('public'));

    initializePassport();
    app.use(passport.initialize())
    app.use(passport.session())

    app.use(addLogger)

    app.engine('handlebars', handlerbars.engine());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'handlebars');

    const specs = swaggerJSDoc(swaggerOptions)
    app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartsRouter);

    app.use("/api/sessions", sessionsRouter);

    app.use("/", mockingRouter);

    app.use("/", viewsRouter);
    app.use("/now", viewsRouter);

    app.use("/", loggersRouter);

    app.use(errorHandler)
}
