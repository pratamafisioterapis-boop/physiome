import { PrismaClient } from '../generated/prisma/index.js';
// 1. Import adapter PlanetScale & driver database-nya
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { Client } from '@planetscale/database';
import logger from './logger.js';

// 2. Inisialisasi client PlanetScale menggunakan URL database MySQL kamu
const client = new Client({ url: process.env.DATABASE_URL });

// 3. Masukkan client ke dalam adapter Prisma
const adapter = new PrismaPlanetScale(client);

// 4. Buat instance PrismaClient dengan adapter tersebut
const prisma = new PrismaClient({ adapter });

async function connectToDatabase() {
    try {
        // Catatan: Saat menggunakan driver adapter, fungsi $connect() sebenarnya opsional,
        // tetapi tetap aman digunakan untuk memastikan koneksi berhasil di awal.
        await prisma.$connect();
        logger.info('Connected to MySQL database via Prisma (Driver Adapter)');
    } catch (error) {
        logger.error('Failed to connect to MySQL database:', error);
        process.exit(1);
    }
}

connectToDatabase();

export default prisma;