import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly as checkAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, checkAdmin, getUsers)
    .post(protect, checkAdmin, createUser);

router.route('/:id')
    .put(protect, checkAdmin, updateUser)
    .delete(protect, checkAdmin, deleteUser);

export default router;
