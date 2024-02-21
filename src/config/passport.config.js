import passport from "passport";
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import passportGitHub from "passport-github2";
import { Users, Carts } from "../dao/factory.js";
import { hashPassword, comparePasswords } from "../helper/password.js";
import { clientID, clientSecret, callbackURL } from "./const.config.js";
import { generateToken } from "../helper/jwt.js";
import { secretJWT } from "./const.config.js"
import UsersDto from "../dto/users.dto.js";
const LocalStratey = passportLocal.Strategy
const JWTStrategy = passportJWT.Strategy

const extractCookie = req => {
    return (req && req.cookies) ? req.cookies['cookieJWT'] : null
}

export const initializePassport = () => {

    passport.use('github', new passportGitHub(
        {
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: callbackURL
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)

            try {
                const usersManager = new Users();

                let user = await usersManager.getUserByEmail(profile._json.email);
                if (user) {
                    console.log('User already exits')
                } else {
                    const newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        email: profile._json.email,
                        password: ''
                    }
                    user = await usersManager.addUser(newUser)
                }
                const userDto = new UsersDto(user);
                usersManager.refreshLastLoginUser(user._id);
                const token = generateToken(userDto)
                userDto.token = token

                return done(null, userDto)
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
            const usersManager = new Users();

            const { first_name, last_name, birth_date } = req.body;
            if (first_name === undefined || last_name === undefined || username === undefined || birth_date === undefined || password === undefined) {
                return done(null, false, { message: 'Usuario no existe' })
            }

            const newUser = { first_name, last_name };
            newUser.birth_date = new Date(birth_date);
            newUser.password = hashPassword(password);
            newUser.email = username;
            const user = await usersManager.addUser(newUser);
            if (!user) {
                return done(null, false, { message: 'Error al crear el usuario' })
            }
            const token = generateToken(user)
            user.token = token

            return done(null, user)
        } catch (e) {
            return done(null, false)
        }
    }))

    passport.use('login', new LocalStratey({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const usersManager = new Users();
            const user = await usersManager.getUserByEmail(username);
            if (!user) {
                console.log('User doesnt exists')
                return done(null, false, { message: 'Usuario no existe' })
            }
            if (!comparePasswords(password, user.password)) {
                return done(null, false, { message: 'Contraseña incorrecta' })
            }

            const userDto = new UsersDto(user);
            usersManager.refreshLastLoginUser(user._id);
            const token = generateToken(userDto);
            userDto.token = token

            return done(null, userDto)
        } catch (err) {
            return done(null, false)
        }
    }))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([extractCookie]),
        secretOrKey: secretJWT,
    }, async (jwt_payload, done) => {
        if (jwt_payload.user != "admin") {
            const cartsManager = new Carts();
            const cart = await cartsManager.findOrAddCart(jwt_payload.user._id, 'cart');
            jwt_payload.user.cart = cart.id;
        }

        console.log({ jwt_payload })
        done(null, jwt_payload.user)
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const usersManager = new Users();
        const user = await usersManager.getUser(id);
        done(null, user)
    })

}