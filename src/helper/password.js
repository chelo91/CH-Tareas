// Require bcrypt
import bcrypt from "bcrypt";
import { saltRounds } from "../config/const.config.js";

function hashPassword(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, saltRounds);
}
function comparePasswords(plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
}
export { hashPassword, comparePasswords };