import ProductManager from '../models/productManager.js';
import { sucessMessage, errorMessage, sucessMessageCreate, sucessMessageUpdate, sucessMessageDelete } from '../helper/utilsResponse.js';

import dotenv from 'dotenv';
dotenv.config();

const path = process.env.PATH_PRODUCTS || "./db/products.json";

const getAllProducts = async (req, res) => {
    const productManager = new ProductManager(path);
    const limit = req.query.limit;
    const products = await productManager.getAndLoadProducts();
    if (limit && limit < products.length && limit > 0) {
        products.length = limit;
    }
    return res.status(200).json(sucessMessage(products));
};
const getProductById = async (req, res) => {
    const productManager = new ProductManager(path);
    const pid = parseInt(req.params.pid);
    const result = await productManager.getProductById(pid);
    if (result == null) {
        return res.status(404).json(errorMessage("Product not found"));
    }
    return res.status(200).json(sucessMessage(result));
};
const createProduct = async (req, res) => {
    const productManager = new ProductManager(path);
    const newProd = req.body;

    productManager.addProduct(newProd)
        .then((pid) => {
            return res.status(200).json(sucessMessageCreate({ id: pid }));
        }).catch((err) => {
            return res.status(400).json(errorMessage(err.message));
        });
};
const updateProduct = async (req, res) => {
    const productManager = new ProductManager(path);
    const pid = parseInt(req.params.pid);
    productManager.updateProduct(pid, req.body)
        .then((prod) => {
            return res.status(200).json(sucessMessageUpdate(prod));
        }).catch((err) => {
            return res.status(400).json(errorMessage(err.message));
        });
};
const deleteProduct = async (req, res) => {
    const productManager = new ProductManager(path);
    const pid = parseInt(req.params.pid);
    productManager.deleteProduct(pid)
        .then(() => {
            return res.status(200).json(sucessMessageDelete({ id: pid }));
        }).catch((err) => {
            return res.status(400).json(errorMessage(err.message));
        });
};
export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };