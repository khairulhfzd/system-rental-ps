import fs from 'fs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

async function migrateDatabase() {
    try {
        console.log('Connecting to MySQL Server...');
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            multipleStatements: true
        });

        console.log('Dropping existing database...');
        await connection.query('DROP DATABASE IF EXISTS ps_rental_system;');

        console.log('Reading and Executing new schema.sql...');
        const schemaPath = path.resolve('../database/schema.sql');
        const sql = fs.readFileSync(schemaPath, 'utf8');

        await connection.query(sql);

        console.log('Database migration & seed successful!');
        process.exit(0);
    } catch (error) {
        console.error('Error migrating database:', error);
        process.exit(1);
    }
}

migrateDatabase();
