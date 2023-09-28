import ProductManager from '../models/productManager.js';
import dotenv from 'dotenv';
dotenv.config();
const path = process.env.PATH_PRODUCTS || "./db/carts.json";

const createCart = async (req, res) => {
    /*const productManager = new ProductManager(path);
    const limit = req.query.limit;
    const products = await productManager.getAndLoadProducts();
    if (limit && limit < products.length && limit > 0) {
        products.length = limit;
    }
    return res.json(products);*/
};

const get = async (req, res) => {
    /*const productManager = new ProductManager(path);
    const pid = parseInt(req.params.pid);
    const result = await productManager.getProductById(pid);
    return res.json(result || { Response: "Product not found" });*/
};

export { getAllProducts, getProductById };