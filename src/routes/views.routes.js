import express from "express";
import passport from "passport";
//import { authView } from "../midleware/auth.js";
import { home, realTime, chat, products, productById, cartById, login, register, logout, profile } from '../controllers/viewController.js';
export const router = express.Router();

router.get('/', passport.authenticate('jwt', { failureRedirect: '/error', session: false }), home);
router.get('/products', passport.authenticate('jwt', { failureRedirect: '/error' }), products);
router.get('/products/:pid', passport.authenticate('jwt', { failureRedirect: '/error' }), productById);
router.get('/carts/:cid', passport.authenticate('jwt', { failureRedirect: '/error' }), cartById);
router.get('/now', passport.authenticate('jwt', { failureRedirect: '/error' }), realTime);
router.get('/chat', passport.authenticate('jwt', { failureRedirect: '/error' }), chat);
router.get('/login', login);
router.get('/register', register);
router.get('/logout', passport.authenticate('jwt', { failureRedirect: '/error' }), logout);
router.get('/profile', passport.authenticate('jwt', { failureRedirect: '/error' }), profile);
router.get('/error', (req, res) => {
    res.render('error', { error: 'Something is wrong' })
})