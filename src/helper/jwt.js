import jwt from 'jsonwebtoken'
import { secretJWT } from '../config/const.config.js'

export const generateToken = (user) => {
    return jwt.sign({ user }, secretJWT, { expiresIn: '24h' })
}

export const generateTokenResetPassword = (user) => {
    return jwt.sign({ user }, secretJWT, { expiresIn: '1h' })
}

export const getUserInToken = (token) => {
    try {
        const verify = jwt.verify(token, secretJWT);
        return verify.user
    } catch (error) {
        return null
    }
}