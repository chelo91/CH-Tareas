import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import express from "express";
import dotenv from 'dotenv';

export const router = express.Router();

dotenv.config();
const path = process.env.PATH_PRODUCTS || "./src/files/productos.json";

router.get('/', getAllProducts);
router.get('/:pid', getProductById);
router.post('/', createProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);
