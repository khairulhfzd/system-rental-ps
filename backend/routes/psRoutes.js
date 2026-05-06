import express from 'express';
import { getPS, createPS, updatePS, deletePS } from '../controllers/psController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getPS)
    .post(protect, adminOnly, createPS);

router.route('/:id')
    .put(protect, adminOnly, updatePS)
    .delete(protect, adminOnly, deletePS);

export default router;
