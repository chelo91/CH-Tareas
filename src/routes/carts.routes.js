import { getCartById, createCart, addProductToCart, getCarts, updateCart, updateCartProductQuantity, deleteCart, deleteProductCart } from "../controllers/cartController.js";
import { createTicket } from "../controllers/ticketController.js";
import express from "express";
import { parserQueryString } from "../middlewares/parserQueryString.js";

export const router = express.Router();

router.get('/', parserQueryString, getCarts);
router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/product/:pid', addProductToCart);
router.put('/:cid', () => updateCart);
router.put('/:cid/product/:pid', () => updateCartProductQuantity);
router.delete('/:cid', () => deleteCart);
router.delete('/:cid/product/:pid', () => deleteProductCart);

router.get('/:cid/purchase', createTicket);