import jwt from 'jsonwebtoken';
import db from '../config/db.js';

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user in db
            const [rows] = await db.execute('SELECT id_user, username, role FROM users WHERE id_user = ?', [decoded.id]);

            if (rows.length === 0) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            req.user = rows[0];
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
