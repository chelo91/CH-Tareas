import express from "express";
import passport from "passport";
//import { authView } from "../midleware/auth.js";
import { home, realTime, chat, products, productById, cartById, login, register, logout, profile } from '../controllers/viewController.js';
export const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), home);
router.get('/products', passport.authenticate('jwt', { failureRedirect: '/login' }), products);
router.get('/products/:pid', passport.authenticate('jwt', { failureRedirect: '/login' }), productById);
router.get('/carts/:cid', passport.authenticate('jwt', { failureRedirect: '/login' }), cartById);
router.get('/now', passport.authenticate('jwt', { failureRedirect: '/login' }), realTime);
router.get('/chat', passport.authenticate('jwt', { failureRedirect: '/login' }), chat);
router.get('/login', login);
router.get('/register', register);
router.get('/logout', passport.authenticate('jwt', { failureRedirect: '/login' }), logout);
router.get('/profile/:id', passport.authenticate('jwt', { failureRedirect: '/login' }), profile);