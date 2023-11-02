import express from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { upload } from '../midleware/uploadImageMulter.js';
import { parserCreateProduct } from '../midleware/parserCreateProduct.js';
import { parserQueryString } from "../midleware/parserQueryString.js";

export const router = express.Router();

router.get('/', parserQueryString, getProducts);
router.get('/:pid', getProductById);
router.post('/', upload.array('thumbnail'), parserCreateProduct, createProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);