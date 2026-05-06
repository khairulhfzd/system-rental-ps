import Transaksi from '../models/transaksiModel.js';
import User from '../models/userModel.js';
import Pelanggan from '../models/pelangganModel.js';
import PlayStation from '../models/psModel.js';

export const getHarian = async (req, res) => {
    try {
        const stats = await Transaksi.getStatsToday();

        // Also get other totals for admin dash
        const pelanggilList = await Pelanggan.getAll();
        const psList = await PlayStation.getAll();
        const activePS = psList.filter(ps => ps.status === 'Playing').length;

        res.json({
            total_transaksi: stats.total_transaksi || 0,
            total_revenue: stats.total_revenue || 0,
            total_pelanggan: pelanggilList.length,
            active_ps: activePS
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getBulanan = async (req, res) => {
    try {
        const year = new Date().getFullYear();
        const start = `${year}-01-01`;
        const end = `${year}-12-31`;
        const data = await Transaksi.getByDateRange(start, end);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
