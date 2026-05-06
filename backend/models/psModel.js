import db from '../config/db.js';

const PlayStation = {
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM playstation');
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM playstation WHERE id_ps = ?', [id]);
        return rows[0];
    },

    create: async (data) => {
        const [result] = await db.execute(
            'INSERT INTO playstation (nama_ps, tipe_ps, harga_per_jam, status) VALUES (?, ?, ?, ?)',
            [data.nama_ps, data.tipe_ps, data.harga_per_jam, data.status || 'Available']
        );
        return result.insertId;
    },

    update: async (id, data) => {
        const [result] = await db.execute(
            'UPDATE playstation SET nama_ps = ?, tipe_ps = ?, harga_per_jam = ?, status = ? WHERE id_ps = ?',
            [data.nama_ps, data.tipe_ps, data.harga_per_jam, data.status, id]
        );
        return result.affectedRows;
    },

    updateStatus: async (id, status) => {
        const [result] = await db.execute('UPDATE playstation SET status = ? WHERE id_ps = ?', [status, id]);
        return result.affectedRows;
    },

    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM playstation WHERE id_ps = ?', [id]);
        return result.affectedRows;
    }
};

export default PlayStation;
