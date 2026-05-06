import db from '../config/db.js';
import bcrypt from 'bcrypt';

const User = {
    findByUsername: async (username) => {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    },

    findById: async (id) => {
        const [rows] = await db.execute('SELECT id_user, username, role FROM users WHERE id_user = ?', [id]);
        return rows[0];
    },

    getAll: async () => {
        const [rows] = await db.execute('SELECT id_user, username, role FROM users');
        return rows;
    },

    create: async (username, password, role) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const [result] = await db.execute('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hash, role]);
        return result.insertId;
    },

    update: async (id, data) => {
        let query = 'UPDATE users SET ';
        const params = [];

        if (data.username) {
            query += 'username = ?, ';
            params.push(data.username);
        }
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.password, salt);
            query += 'password = ?, ';
            params.push(hash);
        }
        if (data.role) {
            query += 'role = ?, ';
            params.push(data.role);
        }

        query = query.slice(0, -2) + ' WHERE id_user = ?';
        params.push(id);

        const [result] = await db.execute(query, params);
        return result.affectedRows;
    },

    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM users WHERE id_user = ?', [id]);
        return result.affectedRows;
    }
};

export default User;
