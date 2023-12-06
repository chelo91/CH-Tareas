import jwt from 'jsonwebtoken'
import { secretJWT } from '../config/const.config.js'

export const generateToken = (user) => {
    return jwt.sign({ user }, secretJWT, { expiresIn: '24h' })
}