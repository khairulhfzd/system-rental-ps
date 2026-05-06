import db from '../config/db.js';

const Kontrak = {
    create: async (id_transaksi, file_kontrak) => {
        const [result] = await db.execute(
            'INSERT INTO kontrak (id_transaksi, file_kontrak) VALUES (?, ?)',
            [id_transaksi, file_kontrak]
        );
        return result.insertId;
    },

    getByTransaksiId: async (id_transaksi) => {
        const [rows] = await db.execute('SELECT * FROM kontrak WHERE id_transaksi = ?', [id_transaksi]);
        return rows[0];
    },

    getAll: async () => {
        const [rows] = await db.execute(`
      SELECT k.*, t.waktu_mulai, t.total_bayar, p.nama_ps, pel.nama AS nama_pelanggan
      FROM kontrak k
      JOIN transaksi t ON k.id_transaksi = t.id_transaksi
      JOIN playstation p ON t.id_ps = p.id_ps
      JOIN pelanggan pel ON t.id_pelanggan = pel.id_pelanggan
      ORDER BY k.tanggal_kontrak DESC
    `);
        return rows;
    }
};

export default Kontrak;
