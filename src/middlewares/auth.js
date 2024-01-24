export const authUser = async (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    if (req.user.role !== 'user' && req.user.role !== "premium") {
        return res.redirect('/login');
    }
    next();
}
export const authAdmin = async (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    if (req.user.role !== 'admin' && req.user.role !== "premium") {
        return res.redirect('/login');
    }
    next();
}
export const authApiAdmin = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}