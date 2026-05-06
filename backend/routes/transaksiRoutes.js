import express from 'express';
import {
    startRental,
    endRental,
    getTransaksi,
    getMyTransactions,
    uploadPaymentProof,
    approvePayment
} from '../controllers/transaksiController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer config for payment proofs
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/payments/');
    },
    filename(req, file, cb) {
        cb(null, `PAY-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpg|jpeg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Images only!'));
        }
    }
});

// User routes
router.get('/my-transactions', protect, getMyTransactions);
router.post('/start', protect, startRental);
router.post('/upload-proof/:id', protect, upload.single('paymentProof'), uploadPaymentProof);

// Admin routes
router.get('/', protect, adminOnly, getTransaksi);
router.put('/approve/:id', protect, adminOnly, approvePayment);
router.post('/end/:id', protect, adminOnly, endRental);

export default router;
