import PlayStation from '../models/psModel.js';

export const getPS = async (req, res) => {
    try {
        const psList = await PlayStation.getAll();
        res.json(psList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPS = async (req, res) => {
    try {
        const psId = await PlayStation.create(req.body);
        res.status(201).json({ id_ps: psId, ...req.body, status: req.body.status || 'Available' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePS = async (req, res) => {
    const { id } = req.params;
    try {
        const affected = await PlayStation.update(id, req.body);
        if (affected > 0) res.json({ message: 'PlayStation updated successfully' });
        else res.status(404).json({ message: 'PlayStation not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePS = async (req, res) => {
    const { id } = req.params;
    try {
        const affected = await PlayStation.delete(id);
        if (affected > 0) res.json({ message: 'PlayStation deleted successfully' });
        else res.status(404).json({ message: 'PlayStation not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
