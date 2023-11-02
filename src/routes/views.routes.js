import express from "express";
import { home, realTime, chat, products, productById, cartById } from '../controllers/viewController.js';
export const router = express.Router();

router.get('/', home);
router.get('/products', products);
router.get('/products/:pid', productById);
router.get('/carts/:cid', cartById);
router.get('/now', realTime);
router.get('/chat', chat);