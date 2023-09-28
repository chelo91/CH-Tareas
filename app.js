import { router as productRouter } from './src/routes/products.routes.js';
import { router as cartRouter } from './src/routes/carts.routes.js';

import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();
const port = process.env.PORT || 8080;
const app = express(port);
app.use(bodyParser.json());

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.get('/', (req, res) => {
    res.json({ msg: 'Hello, I am working :D' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});