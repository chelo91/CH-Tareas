import passport from "passport";
import local from 'passport-local'
import GitHubStrategy from "passport-github2";
import UserModel from "../dao/mongo/users.model.js";
import { hashPassword, comparePasswords } from "../helper/utilsPassword.js";
import { clientID, clientSecret, callbackURL } from "../helper/utilsVars.js";

const LocalStratey = local.Strategy
export const initializePassport = () => {

    passport.use('github', new GitHubStrategy(
        {
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: callbackURL
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)

            try {
                const usersManager = new UserModel();

                const user = await usersManager.getUserByEmail(profile._json.email);
                if (user) {
                    console.log('User already exits')
                    return done(null, user)
                }

                const newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    password: ''
                }
                const result = await usersManager.addUser(newUser)
                
                return done(null, result)
            } catch (error) {
                return done('Error to login with github ' + error)
            }
        }
    ))

    passport.use('register', new LocalStratey({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const usersManager = new UserModel();

            const { first_name, last_name, birth_date } = req.body;
            if (first_name === undefined || last_name === undefined || username === undefined || birth_date === undefined || password === undefined) {
                return done(null, false)
            }

            const newUser = { first_name, last_name };
            newUser.birth_date = new Date(birth_date);
            newUser.password = hashPassword(password);
            newUser.email = username;
            const user = await usersManager.addUser(newUser);
            if (!user) {
                return done(null, false)
            }

            return done(null, user)
        } catch (e) {
            return done(null, false)
        }
    }))

    passport.use('login', new LocalStratey({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const usersManager = new UserModel();

            const user = await usersManager.getUserByEmail(username);
            if (!user) {
                console.log('User doesnot exists')
                return done(null, false)
            }

            if (!comparePasswords(password, user.password)) {
                return done(null, false)
            }

            return done(null, user)
        } catch (err) {
            return done(null, false)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const usersManager = new UserModel();
        const user = await usersManager.getUser(id);
        done(null, user)
    })

}