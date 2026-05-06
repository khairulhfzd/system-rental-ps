import express from 'express';
import { getHarian, getBulanan } from '../controllers/laporanController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/harian', protect, adminOnly, getHarian);
router.get('/bulanan', protect, adminOnly, getBulanan);

export default router;
