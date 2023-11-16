import express from "express";
import passport from "passport";
export const router = express.Router();

router.post('/register',
    passport.authenticate('register', { failureRedirect: '/register' }),
    async (req, res) => {
        if (!req.user) {
            return res.redirect('/register');
        }
        const user = req.user;
        req.session.user = {
            id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            birth_date: user.birth_date,
            role: user.role
        };
        return res.redirect('/');
    })

router.post('/login',
    passport.authenticate('login', { failureRedirect: '/login' }),
    async (req, res) => {
        if (!req.user) {
            return res.redirect('/login');
        }
        const user = req.user;
        req.session.user = {
            id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            birth_date: user.birth_date,
            role: user.role
        };
        return res.redirect('/');
    })

router.post(
    '/github',
    passport.authenticate('github', { scope: ['user:email'] }),
    async (req, res) => {
        console.log('Github: ', req.user)
    }
)

router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/' }),
    async (req, res) => {
        console.log('Callback: ', req.user)
        const user = req.user;
        req.session.user = {
            id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            birth_date: user.birth_date,
            role: user.role
        };
        res.redirect('/')
    }
)
