import User from '../models/userModel.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const userExists = await User.findByUsername(username);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const userId = await User.create(username, password, role);
        res.status(201).json({ id_user: userId, username, role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const affected = await User.update(id, req.body);
        if (affected > 0) res.json({ message: 'User updated successfully' });
        else res.status(404).json({ message: 'User not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const affected = await User.delete(id);
        if (affected > 0) res.json({ message: 'User deleted successfully' });
        else res.status(404).json({ message: 'User not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
