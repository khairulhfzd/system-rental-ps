import db from '../config/db.js';

const Pelanggan = {
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM pelanggan');
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM pelanggan WHERE id_pelanggan = ?', [id]);
        return rows[0];
    },

    create: async (data) => {
        const [result] = await db.execute(
            'INSERT INTO pelanggan (nama, no_hp) VALUES (?, ?)',
            [data.nama, data.no_hp]
        );
        return result.insertId;
    },

    search: async (keyword) => {
        const [rows] = await db.execute(
            'SELECT * FROM pelanggan WHERE nama LIKE ?',
            [`%${keyword}%`]
        );
        return rows;
    }
};

export default Pelanggan;
