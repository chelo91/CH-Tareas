import express from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { upload } from '../middlewares/uploadImageMulter.js';
import { parserCreateProduct } from '../middlewares/parserCreateProduct.js';
import { parserQueryString } from "../middlewares/parserQueryString.js";

export const router = express.Router();

router.get('/', parserQueryString, getProducts);
router.get('/:pid', getProductById);
router.post('/', upload.array('thumbnail'), parserCreateProduct, createProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);