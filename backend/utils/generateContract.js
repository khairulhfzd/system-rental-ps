import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateContractPDF = (transactionData) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            const fileName = `kontrak_${transactionData.id_transaksi}_${Date.now()}.pdf`;
            const uploadDir = path.join(__dirname, '..', 'uploads', 'contracts');

            // Ensure directory exists
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, fileName);
            const writeStream = fs.createWriteStream(filePath);

            doc.pipe(writeStream);

            // Add Content to PDF
            doc.fontSize(20).text('PlayStation Rental Contract', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Transaction ID: ${transactionData.id_transaksi}`);
            doc.text(`Date: ${new Date().toLocaleString()}`);
            doc.moveDown();

            doc.text(`Customer Name: ${transactionData.nama_pelanggan}`);
            doc.text(`PlayStation Unit: ${transactionData.nama_ps}`);
            doc.text(`Price Per Hour: Rp ${transactionData.harga_per_jam}`);

            doc.moveDown();
            doc.text(`Start Time: ${new Date(transactionData.waktu_mulai).toLocaleString()}`);
            doc.text(`End Time: ${new Date(transactionData.waktu_selesai).toLocaleString()}`);
            doc.text(`Duration: ${transactionData.durasi} Hours`);

            doc.moveDown();
            doc.fontSize(14).text(`Total Payment: Rp ${transactionData.total_bayar}`, { underline: true });

            doc.moveDown(2);
            doc.fontSize(12).text('Thank you for renting with us!', { align: 'center' });

            doc.end();

            writeStream.on('finish', () => {
                resolve(fileName);
            });

            writeStream.on('error', (err) => {
                reject(err);
            });

        } catch (error) {
            reject(error);
        }
    });
};
