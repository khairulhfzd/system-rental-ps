import express from 'express';
import { getPelanggan, createPelanggan } from '../controllers/pelangganController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getPelanggan)
    .post(protect, createPelanggan);

export default router;
