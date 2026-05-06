import db from '../config/db.js';

const Transaksi = {
    getAll: async () => {
        const [rows] = await db.execute(`
      SELECT t.*, p.nama_ps 
      FROM transaksi t
      JOIN playstation p ON t.id_ps = p.id_ps
      ORDER BY t.waktu_mulai DESC
    `);
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.execute(`
      SELECT t.*, p.nama_ps, p.harga_per_jam 
      FROM transaksi t
      JOIN playstation p ON t.id_ps = p.id_ps
      WHERE t.id_transaksi = ?
    `, [id]);
        return rows[0];
    },

    findByUser: async (id_user) => {
        const [rows] = await db.execute(`
      SELECT t.*, p.nama_ps 
      FROM transaksi t
      JOIN playstation p ON t.id_ps = p.id_ps
      WHERE t.id_user = ?
      ORDER BY t.waktu_mulai DESC
    `, [id_user]);
        return rows;
    },

    start: async (data) => {
        const waktuMulai = new Date();
        const waktuSelesai = new Date(waktuMulai.getTime() + data.durasi * 60 * 60 * 1000);

        const [result] = await db.execute(
            'INSERT INTO transaksi (id_ps, id_user, nama_pemesan, no_hp, waktu_mulai, waktu_selesai, durasi, total_bayar, status_pembayaran) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [data.id_ps, data.id_user, data.nama_pemesan, data.no_hp, waktuMulai, waktuSelesai, data.durasi, data.total_bayar, 'Belum Bayar']
        );
        return result.insertId;
    },

    updatePaymentProof: async (id, file_path) => {
        const [result] = await db.execute(
            'UPDATE transaksi SET bukti_pembayaran = ?, status_pembayaran = ? WHERE id_transaksi = ?',
            [file_path, 'Pending', id]
        );
        return result.affectedRows;
    },

    approvePayment: async (id) => {
        const [result] = await db.execute(
            'UPDATE transaksi SET status_pembayaran = ? WHERE id_transaksi = ?',
            ['Sudah Bayar', id]
        );
        return result.affectedRows;
    },

    end: async (id, data) => {
        const waktuSelesai = new Date();
        const [result] = await db.execute(
            'UPDATE transaksi SET waktu_selesai = ?, durasi = ?, total_bayar = ? WHERE id_transaksi = ?',
            [waktuSelesai, data.durasi, data.total_bayar, id] // End is preserved in case Admin ends it manually early/late
        );
        return result.affectedRows;
    },

    getStatsToday: async () => {
        const today = new Date().toISOString().split('T')[0];
        const [rows] = await db.execute(`
        SELECT 
            COUNT(*) as total_transaksi,
            COALESCE(SUM(total_bayar), 0) as total_revenue
        FROM transaksi
        WHERE DATE(waktu_mulai) = ?
    `, [today]);
        if (!rows[0]) {
            return { total_transaksi: 0, total_revenue: 0 };
        }
        return rows[0];
    },

    getByDateRange: async (startDate, endDate) => {
        const [rows] = await db.execute(`
      SELECT DATE(waktu_mulai) as date, SUM(total_bayar) as revenue
      FROM transaksi
      WHERE DATE(waktu_mulai) BETWEEN ? AND ? AND status_pembayaran = 'Sudah Bayar'
      GROUP BY DATE(waktu_mulai)
      ORDER BY DATE(waktu_mulai) ASC
    `, [startDate, endDate]);
        return rows;
    }
};

export default Transaksi;
