export const authUser = async (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    if (req.user.role !== 'user') {
        return res.redirect('/login');
    }
    next();
}
export const authAdmin = async (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    if (req.user.role !== 'admin') {
        return res.redirect('/login');
    }
    next();
}