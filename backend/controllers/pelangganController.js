import Pelanggan from '../models/pelangganModel.js';

export const getPelanggan = async (req, res) => {
    try {
        const { keyword } = req.query;
        let pelangganList;
        if (keyword) {
            pelangganList = await Pelanggan.search(keyword);
        } else {
            pelangganList = await Pelanggan.getAll();
        }
        res.json(pelangganList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPelanggan = async (req, res) => {
    try {
        const pelId = await Pelanggan.create(req.body);
        res.status(201).json({ id_pelanggan: pelId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
