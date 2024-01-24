import { UsersService } from "../services/index.js";
import { url } from "../config/const.config.js";
import { generateTokenResetPassword, getUserInToken } from '../helper/jwt.js'
import UsersDto from "../dao/dto/users.dto.js";
import { mailer } from "../helper/mail.js";
import { comparePasswords, hashPassword } from "../helper/password.js";


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UsersService.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const userDto = new UsersDto(user);
        const token = generateTokenResetPassword(userDto);
        const result = await mailer.sendMail({
            from: 'me@chelo.xyz',
            to: email,
            subject: 'Reseteo de contraseña',
            html: `
                <div>
                    <h1> Reseteo de contraseña </h1>
                    <p> Para resetear tu contraseña, haz click en este link: </p>
                    <a href="${url}/api/sessions/reset-password?token=${token}"> Click aquí </a>
                </div>
            `
        })
        return res.status(200).json({ message: 'Email sent' });
        /*
        const result = await mailer.sendMail({
                 from: 'me@chelo.xyz',
                 to: 'mrclgrr91@gmail.com',
                 subject: 'Francisco Elder Rules !!',
                 html: `
                     <div>
                         <h1> Everything everywhere all at once</h1>
                     </div>
                 `
             })
        */
    } catch (error) {
        next(error);
    }
};
export const resetPassword = async (req, res) => {
    try {
        const token = req.query.token;
        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }
        const user = getUserInToken(token);
        if (!user) {
            return res.status(400).json({ message: 'Token expired' });
        }
        res.render('resetPassword', { email: user.email, token: token });

    } catch (error) {
        next(error);
    }
};

export const changePassword = async (req, res) => {
    try {
        const token = req.body.token;
        const newPassword = req.body.password;
        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token is required' });
        }
        const tokenUser = getUserInToken(token);
        if (!tokenUser) {
            return res.status(400).json({ message: 'Token expired' });
        }
        const user = await UsersService.getUserByEmail(tokenUser.email);
        if (comparePasswords(newPassword, user.password)) {
            return res.status(400).json({ message: 'Password is the same' });
        }
        const pass = hashPassword(newPassword)
        const result = await UsersService.updateUser(user.id, { password: pass });
        return res.status(200).json({ message: 'Password changed' });
    } catch (error) {
        next(error);
    }
};

export const changeRole = async (req, res) => {
    try {
        const userId = req.params.uid;
        const newRole = req.body.role;
        if (!userId || !newRole) {
            return res.status(400).json({ message: 'Role is required' });
        }
        if (newRole !== 'admin' && newRole !== 'user' && newRole !== 'premium') {
            return res.status(400).json({ message: 'Role is invalid' });
        }
        const result = await UsersService.updateUser(userId, { role: newRole });
        return res.status(200).json({ message: 'Role changed' });
    } catch (error) {
        next(error);
    }
};