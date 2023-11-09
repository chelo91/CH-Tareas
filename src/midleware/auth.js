import UsersManager from '../dao/mongo/users.model.js';
export const authView = async (req, res, next) => {
    const userSession = req.session.user;
    const usersManager = new UsersManager();
    if(userSession === undefined || userSession.email === undefined) {
        return res.redirect('/login');
    }
    const user = await usersManager.getUserByEmail(userSession.email);
    if (!user) {
        return res.redirect('/login');
    }
    next();
};