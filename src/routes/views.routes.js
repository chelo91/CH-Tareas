import express from "express";
import passport from "passport";
import { authUser } from "../middlewares/auth.js";
import { home, realTime, chat, products, productById, editProductById, cartById, login, register, logout, profile } from '../controllers/viewController.js';
export const router = express.Router();

router.get('/', passport.authenticate('jwt', { failureRedirect: '/login' }), home);
router.get('/products', passport.authenticate('jwt', { failureRedirect: '/login' }), products);
router.get('/products/:pid/edit', passport.authenticate('jwt', { failureRedirect: '/login' }), editProductById);
router.get('/products/:pid', passport.authenticate('jwt', { failureRedirect: '/login' }), productById);
router.get('/carts/:cid', passport.authenticate('jwt', { failureRedirect: '/login' }), authUser, cartById);
router.get('/now', passport.authenticate('jwt', { failureRedirect: '/login' }), realTime);
router.get('/chat', passport.authenticate('jwt', { failureRedirect: '/login' }), authUser, chat);
router.get('/login', login);
router.get('/register', register);
router.get('/logout', passport.authenticate('jwt', { failureRedirect: '/login' }), logout);
router.get('/profile', passport.authenticate('jwt', { failureRedirect: '/login' }), profile);
router.get('/current', passport.authenticate('jwt', { failureRedirect: '/login' }), profile);
router.get('/error', (req, res) => {
    res.render('error', { error: 'Something is wrong' })
})