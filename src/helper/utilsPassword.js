// Require bcrypt
import bcrypt from "bcrypt";
import { saltRounds } from "./utilsVars.js";

function hashPassword(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, saltRounds);
}
function comparePasswords(plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
}
export { hashPassword, comparePasswords };