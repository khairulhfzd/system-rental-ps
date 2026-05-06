import Transaksi from '../models/transaksiModel.js';
import PlayStation from '../models/psModel.js';
import Kontrak from '../models/kontrakModel.js';
import { calculatePrice } from '../utils/calculatePrice.js';
import { generateContractPDF } from '../utils/generateContract.js';

export const startRental = async (req, res) => {
    // Note: id_user will come from auth middleware (logged-in user)
    const id_user = req.user.id_user;
    const { id_ps, nama_pemesan, no_hp, durasi } = req.body;

    try {
        // Check if PS is available
        const ps = await PlayStation.findById(id_ps);
        if (!ps) return res.status(404).json({ message: 'PlayStation not found' });
        if (ps.status !== 'Available') return res.status(400).json({ message: 'PlayStation is not available right now' });

        const total_bayar = ps.harga_per_jam * durasi;

        // Create Transaction
        const transaksiId = await Transaksi.start({
            id_ps,
            id_user,
            nama_pemesan,
            no_hp,
            durasi,
            total_bayar
        });

        // Informatively update PS status. Let's make it 'Playing' so no one else can book it.
        await PlayStation.updateStatus(id_ps, 'Playing');

        res.status(201).json({
            message: 'Booking successful. Please proceed to payment.',
            id_transaksi: transaksiId,
            total_bayar
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const uploadPaymentProof = async (req, res) => {
    const { id } = req.params; // Transaction ID

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path.replace(/\\/g, '/'); // Normalize path for Windows/Unix
        await Transaksi.updatePaymentProof(id, filePath);

        res.json({ message: 'Payment proof uploaded successfully', file_path: filePath });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const approvePayment = async (req, res) => {
    const { id } = req.params; // Transaction ID
    try {
        await Transaksi.approvePayment(id);

        // When payment is approved, we could generate the digital contract immediately
        const transaksi = await Transaksi.findById(id);
        const fileName = await generateContractPDF(transaksi);
        await Kontrak.create(id, fileName);

        res.json({ message: 'Payment approved and contract generated', file_kontrak: fileName });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyTransactions = async (req, res) => {
    const id_user = req.user.id_user;
    try {
        const transactions = await Transaksi.findByUser(id_user);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const endRental = async (req, res) => {
    const { id } = req.params; // Transaction ID

    try {
        const transaksi = await Transaksi.findById(id);
        if (!transaksi) return res.status(404).json({ message: 'Transaksi not found' });

        // This acts as a manual abort or completion by Admin
        await PlayStation.updateStatus(transaksi.id_ps, 'Available');
        res.json({ message: 'Rental finished/aborted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTransaksi = async (req, res) => {
    try {
        const transactions = await Transaksi.getAll();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
