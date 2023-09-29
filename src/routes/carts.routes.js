import { getCartById, createCart, addProductToCart, getCarts } from "../controllers/cartController.js";
import express from "express";

export const router = express.Router();

router.get('/', getCarts);
router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/product/:pid', addProductToCart);