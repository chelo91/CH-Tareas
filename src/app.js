import { router as productController } from './controllers/productController.js';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express(port);

app.use("/products", productController);

app.get('/', (req, res) => {
    res.json({ msg: 'Hello, I am working :D' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});