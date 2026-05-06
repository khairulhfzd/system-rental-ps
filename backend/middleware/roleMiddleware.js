export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

export const kasirOnly = (req, res, next) => {
    if (req.user && req.user.role === 'kasir') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a kasir' });
    }
};
