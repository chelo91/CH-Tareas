import ProductManager from '../models/productManager.js';
import express from "express";
import dotenv from 'dotenv';

export const router = express.Router();

dotenv.config();
const path = process.env.PATH_PRODUCTS || "./src/files/productos.json";

router.get('/', async (req, res) => {
    const productManager = new ProductManager(path);
    const limit = req.query.limit;
    const products = await productManager.getAndLoadProducts();
    if (limit && limit < products.length && limit > 0) {
        products.length = limit;
    }
    return res.json(products);
});

router.get('/:pid', async (req, res) => {
    const productManager = new ProductManager(path);
    const pid = parseInt(req.params.pid);
    const result = await productManager.getProductById(pid);
    return res.json(result || { Response: "Product not found" });
});