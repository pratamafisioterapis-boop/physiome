import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const router = express.Router();

// Gunakan middleware autentikasi untuk semua rute di bawah ini
router.use(jwtAuth);

/**
 * GET /patients
 * Mengambil semua daftar pasien untuk klinik yang sedang login
 */
router.get('/', async (req, res, next) => {
    try {
        const patients = await prisma.patients.findMany({
            where: {
                clinic_id: req.clinicId
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        res.json(patients);
    } catch (error) {
        next(error);
    }
});

/**
 * GET /patients/:id
 * Mengambil detail satu pasien berdasarkan ID
 */
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const patient = await prisma.patients.findUnique({
            where: {
                id: id,
                clinic_id: req.clinicId
            }
        });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json(patient);
    } catch (error) {
        next(error);
    }
});

/**
 * POST /patients
 * Menambahkan pasien baru dan otomatis membuat akun user dengan role 'patient'
 */
router.post('/', async (req, res, next) => {
    const { name, email, phone, gender, birth_date, ...rest } = req.body;
    
    try {
        // 1. Normalisasi Gender karena Enum Prisma (MySQL) bersifat case-sensitive (male/female/other)
        const normalizedGender = (gender && typeof gender === 'string') ? gender.toLowerCase() : undefined;

        const result = await prisma.$transaction(async (tx) => {
            // 2. Buat record Pasien
            const patient = await tx.patients.create({
                data: {
                    id: uuidv4(),
                    name,
                    email,
                    phone,
                    gender: normalizedGender,
                    birth_date: birth_date ? new Date(birth_date) : null,
                    clinic_id: req.clinicId,
                    ...rest
                }
            });

            // 3. Buat akun User untuk Pasien (jika ada email)
            if (email) {
                // Cek apakah email sudah terdaftar di tabel users untuk menghindari duplikasi
                const existingUser = await tx.users.findUnique({ where: { email } });
                
                if (!existingUser) {
                    // Gunakan nomor telepon sebagai password awal atau default password
                    const hashedPassword = await bcrypt.hash(phone || 'Patient123!', 10);
                    await tx.users.create({
                        data: {
                            id: uuidv4(),
                            email,
                            password: hashedPassword,
                            fullName: name,
                            phone,
                            role: 'patient',
                            clinic_id: req.clinicId
                        }
                    });
                }
            }

            return patient;
        });

        res.status(201).json(result);
    } catch (error) {
        // Menangani error Prisma secara spesifik atau lanjut ke middleware error handler
        next(error);
    }
});

/**
 * PUT /patients/:id
 * Memperbarui data pasien
 */
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { gender, birth_date, ...data } = req.body;
    try {
        const normalizedGender = (gender && typeof gender === 'string') ? gender.toLowerCase() : undefined;
        
        const updatedPatient = await prisma.patients.update({
            where: { id, clinic_id: req.clinicId },
            data: {
                ...data,
                gender: normalizedGender,
                birth_date: birth_date ? new Date(birth_date) : undefined
            }
        });
        res.json(updatedPatient);
    } catch (error) {
        next(error);
    }
});

/**
 * DELETE /patients/:id
 * Menghapus data pasien
 */
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await prisma.$transaction(async (tx) => {
            // 1. Dapatkan data pasien untuk mengambil email-nya
            const patient = await tx.patients.findUnique({
                where: { id, clinic_id: req.clinicId },
                select: { email: true }
            });

            if (!patient) {
                throw new Error('Patient not found');
            }

            // 2. Hapus user account jika pasien memiliki email dan role-nya 'patient'
            // Kita gunakan deleteMany agar tidak error jika user tidak ditemukan
            if (patient.email) {
                await tx.users.deleteMany({
                    where: { 
                        email: patient.email, 
                        clinic_id: req.clinicId,
                        role: 'patient'
                    }
                });
            }

            // 3. Hapus data pasien
            await tx.patients.delete({
                where: { id }
            });
        });

        res.json({ message: 'Patient and associated user account deleted successfully' });
    } catch (error) {
        if (error.message === 'Patient not found') {
            return res.status(404).json({ error: 'Patient not found' });
        }
        next(error);
    }
});

export default router;