import jwt from 'jsonwebtoken'
import { secretJWT } from './utilsVars.js'

export const generateToken = (user) => {
    return jwt.sign({ user }, secretJWT, { expiresIn: '24h' })
}