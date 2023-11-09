import express from "express";
import { authView } from "../midleware/auth.js";
import { home, realTime, chat, products, productById, cartById, login, register, logout, profile } from '../controllers/viewController.js';
export const router = express.Router();

router.get('/', authView, home);
router.get('/products', authView, products);
router.get('/products/:pid', authView, productById);
router.get('/carts/:cid', authView, cartById);
router.get('/now', authView, realTime);
router.get('/chat', authView, chat);
router.get('/login', login);
router.get('/register', register);
router.get('/logout', authView, logout);
router.get('/profile/:id', authView, profile);