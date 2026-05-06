import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Middlewares
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import psRoutes from './routes/psRoutes.js';
import pelangganRoutes from './routes/pelangganRoutes.js';
import transaksiRoutes from './routes/transaksiRoutes.js';
import laporanRoutes from './routes/laporanRoutes.js';
import kontrakRoutes from './routes/kontrakRoutes.js';

// Load env vars
dotenv.config();

// Fix directory paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for PDF contracts
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Example basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ps', psRoutes);
app.use('/api/pelanggan', pelangganRoutes);
app.use('/api/transaksi', transaksiRoutes);
app.use('/api/laporan', laporanRoutes);
app.use('/api/kontrak', kontrakRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
