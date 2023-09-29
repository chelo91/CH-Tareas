import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import express from "express";

export const router = express.Router();

router.get('/', getProducts);
router.get('/:pid', getProductById);
router.post('/', createProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);
