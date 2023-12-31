import express from "express";
import passport from "passport";
import { authUser } from "../middlewares/auth.js";
import { home, realTime, chat, products, productById, editProductById, cartById, login, register, logout, profile } from '../controllers/viewController.js';
export const router = express.Router();

router.get('/', passport.authenticate('jwt', { failureRedirect: '/error', session: false }), home);
router.get('/products', passport.authenticate('jwt', { failureRedirect: '/error' }), products);
router.get('/products/:pid/edit', passport.authenticate('jwt', { failureRedirect: '/error' }), editProductById);
router.get('/products/:pid', passport.authenticate('jwt', { failureRedirect: '/error' }), productById);
router.get('/carts/:cid', passport.authenticate('jwt', { failureRedirect: '/error' }), authUser, cartById);
router.get('/now', passport.authenticate('jwt', { failureRedirect: '/error' }), realTime);
router.get('/chat', passport.authenticate('jwt', { failureRedirect: '/error' }), authUser, chat);
router.get('/login', login);
router.get('/register', register);
router.get('/logout', passport.authenticate('jwt', { failureRedirect: '/error' }), logout);
router.get('/profile', passport.authenticate('jwt', { failureRedirect: '/error' }), profile);
router.get('/current', passport.authenticate('jwt', { failureRedirect: '/error' }), profile);
router.get('/error', (req, res) => {
    res.render('error', { error: 'Something is wrong' })
})