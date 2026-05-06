import express from 'express';
import { getKontrakList } from '../controllers/kontrakController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getKontrakList);

export default router;
