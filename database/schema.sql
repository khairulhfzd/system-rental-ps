CREATE DATABASE IF NOT EXISTS ps_rental_system;
USE ps_rental_system;

CREATE TABLE IF NOT EXISTS users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);

CREATE TABLE IF NOT EXISTS playstation (
    id_ps INT AUTO_INCREMENT PRIMARY KEY,
    nama_ps VARCHAR(100) NOT NULL,
    tipe_ps VARCHAR(50) NOT NULL,
    harga_per_jam DECIMAL(10, 2) NOT NULL,
    status ENUM('Available', 'Playing', 'Maintenance') DEFAULT 'Available'
);

CREATE TABLE IF NOT EXISTS pelanggan (
    id_pelanggan INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    no_hp VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS transaksi (
    id_transaksi INT AUTO_INCREMENT PRIMARY KEY,
    id_ps INT NOT NULL,
    id_user INT NOT NULL, -- Changing from id_pelanggan standalone to tracking the logged in user
    nama_pemesan VARCHAR(100) NOT NULL,
    no_hp VARCHAR(20) NOT NULL,
    waktu_mulai DATETIME NOT NULL,
    waktu_selesai DATETIME,
    durasi INT, -- Duration in hours
    total_bayar DECIMAL(10, 2),
    status_pembayaran ENUM('Belum Bayar', 'Pending', 'Sudah Bayar') DEFAULT 'Belum Bayar',
    bukti_pembayaran VARCHAR(255),
    FOREIGN KEY (id_ps) REFERENCES playstation(id_ps) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS kontrak (
    id_kontrak INT AUTO_INCREMENT PRIMARY KEY,
    id_transaksi INT NOT NULL,
    file_kontrak VARCHAR(255) NOT NULL,
    tanggal_kontrak DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_transaksi) REFERENCES transaksi(id_transaksi) ON DELETE CASCADE
);

-- Insert Default Admin and User
-- Password for both is 'password123' (hashed using bcrypt)
INSERT INTO users (username, password, role) VALUES 
('admin', '$2b$10$wT2t2W1GzS/fT32GvXZ4E.Z8E8T1t8QhYhA2sUo.r6b7/kGxzpW02', 'admin'),
('user1', '$2b$10$wT2t2W1GzS/fT32GvXZ4E.Z8E8T1t8QhYhA2sUo.r6b7/kGxzpW02', 'user');

-- Dummy PlayStation data
INSERT INTO playstation (nama_ps, tipe_ps, harga_per_jam, status) VALUES
('PS5 Alpha Bay', 'PlayStation 5', 25000.00, 'Available'),
('PS5 Neon Vault', 'PlayStation 5', 30000.00, 'Playing'),
('PS4 Legacy Pod', 'PlayStation 4 Pro', 20000.00, 'Maintenance');

-- Dummy transaksi data for testing payment statuses
-- Assume: admin id_user = 1, user1 id_user = 2, playstation ids 1,2,3
INSERT INTO transaksi (id_ps, id_user, nama_pemesan, no_hp, waktu_mulai, waktu_selesai, durasi, total_bayar, status_pembayaran, bukti_pembayaran) VALUES
(1, 2, 'Raka Tester', '081234567890', NOW() - INTERVAL 2 HOUR, NULL, 2, 50000.00, 'Belum Bayar', NULL),
(2, 2, 'Raka Pending', '081234567891', NOW() - INTERVAL 3 HOUR, NULL, 3, 90000.00, 'Pending', 'uploads/payments/sample-pending.png'),
(1, 2, 'Raka Selesai', '081234567892', NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 22 HOUR, 2, 50000.00, 'Sudah Bayar', 'uploads/payments/sample-paid.png');

-- Dummy kontrak data for a completed transaction
INSERT INTO kontrak (id_transaksi, file_kontrak)
SELECT id_transaksi, 'contracts/CONTRACT-DEMO.pdf'
FROM transaksi
WHERE status_pembayaran = 'Sudah Bayar'
LIMIT 1;
