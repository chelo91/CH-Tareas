
import express from 'express';
import dotenv from 'dotenv';
import handlerbars from 'express-handlebars';
import bodyParser from 'body-parser';

import { router as productRouter } from './routes/products.routes.js';
import { router as cartRouter } from './routes/carts.routes.js';
import { __dirname } from './helper/utilsPath.js';

dotenv.config();
const port = process.env.PORT || 8080;
const app = express(port);

app.use(bodyParser.json());
app.use(express.urlencoded({ extend: true }));
app.use(express.static('public'));

app.engine('handlebars', handlerbars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/now', (req, res) => {
    res.render('realTimeProducts');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});