import express from "express";
//import multer from "multer";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { upload } from '../midleware/uploadImageMulter.js';
import { parseCreateProduct } from '../midleware/parserCreateProduct.js';

export const router = express.Router();

router.get('/', getProducts);
router.get('/:pid', getProductById);
router.post('/', upload.array('thumbnail'), parseCreateProduct, createProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);