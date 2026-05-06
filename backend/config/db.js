import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ps_rental',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert pool to use promises
const promisePool = pool.promise();

// Handle connection errors
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        } else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        } else if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused. Is MySQL running?');
        } else {
            console.error('Database connection error:', err);
        }
    } else {
        console.log('Successfully connected to MySQL Database.');
        if (connection) connection.release();
    }
});

export default promisePool;
