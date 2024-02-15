import express from "express";
import passport from "passport";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { upload } from '../middlewares/uploadMulter.js';
import { pathFileProducts } from '../config/const.config.js';
import { parserCreateProduct } from '../middlewares/parserCreateProduct.js';
import { parserQueryString } from "../middlewares/parserQueryString.js";

export const router = express.Router();

router.get('/', parserQueryString, getProducts);
router.get('/:pid', passport.authenticate('jwt', { failureRedirect: '/error', session: false }), getProductById);
router.post('/', passport.authenticate('jwt', { failureRedirect: '/error', session: false }), upload(pathFileProducts).array('thumbnail'), parserCreateProduct, createProduct);
router.put('/:pid', passport.authenticate('jwt', { failureRedirect: '/error', session: false }), updateProduct);
router.delete('/:pid', passport.authenticate('jwt', { failureRedirect: '/error', session: false }), deleteProduct);