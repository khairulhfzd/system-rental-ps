import Kontrak from '../models/kontrakModel.js';

export const getKontrakList = async (req, res) => {
    try {
        const kontrakList = await Kontrak.getAll();
        res.json(kontrakList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
