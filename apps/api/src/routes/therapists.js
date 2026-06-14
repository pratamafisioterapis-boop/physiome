import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'; // Pastikan sudah install bcrypt

const router = express.Router();
router.use(jwtAuth);

// GET /therapists - Ambil daftar terapis (Join dengan tabel users)
router.get('/', async (req, res, next) => {
    try {
        const therapists = await prisma.therapists.findMany({
            where: {
                clinic_id: req.clinicId
            },
            include: {
                user: {
                    select: {
                        fullName: true,
                        email: true,
                        phone: true,
                        role: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        // Transformasi data agar sesuai dengan kebutuhan frontend
        const formattedData = therapists.map(t => ({
            id: t.id,
            userId: t.userId,
            fullName: t.user.fullName,
            email: t.user.email,
            phone: t.user.phone,
            role: t.user.role,
            specialization: t.specialization,
            licenseNumber: t.licenseNumber,
            status: t.status,
            created_at: t.created_at
        }));

        res.json(formattedData);
    } catch (error) {
        next(error);
    }
});

// POST /therapists - Buat User & Profil Terapis sekaligus
router.post('/', async (req, res, next) => {
    const { fullName, email, password, phone, specialization, licenseNumber } = req.body || {};

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Full name, email, and password are required' });
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            // 1. Buat User Account
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await tx.users.create({
                data: {
                    id: uuidv4(),
                    email,
                    password: hashedPassword,
                    fullName,
                    phone,
                    role: 'therapist',
                    clinic_id: req.clinicId
                }
            });

            // 2. Buat Therapist Profile
            const newTherapist = await tx.therapists.create({
                data: {
                    id: uuidv4(),
                    userId: newUser.id,
                    specialization,
                    licenseNumber,
                    clinic_id: req.clinicId,
                    status: 'Active'
                }
            });

            return { newUser, newTherapist };
        });

        res.status(201).json({
            message: 'Therapist and User created successfully',
            data: result.newTherapist
        });
    } catch (error) {
        next(error);
    }
});

// PUT /therapists/:id - Update User & Profil Terapis
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { fullName, email, phone, specialization, licenseNumber, status, password } = req.body || {};

    try {
        const result = await prisma.$transaction(async (tx) => {
            // 1. Cari data terapis untuk mendapatkan userId
            const therapist = await tx.therapists.findUnique({
                where: { id },
                select: { userId: true }
            });

            if (!therapist) {
                throw new Error('Therapist not found');
            }

            // 2. Update data User (Nama, Email, HP)
            const userUpdateData = { fullName, email, phone };
            
            if (password && password.trim() !== '') {
                userUpdateData.password = await bcrypt.hash(password, 10);
            }

            await tx.users.update({
                where: { id: therapist.userId },
                data: userUpdateData
            });

            // 3. Update data Profil Terapis (Spesialisasi, STR, Status)
            const updatedTherapist = await tx.therapists.update({
                where: { id },
                data: { specialization, licenseNumber, status }
            });

            return updatedTherapist;
        });

        res.json({
            message: 'Therapist updated successfully',
            data: result
        });
    } catch (error) {
        if (error.message === 'Therapist not found') {
            return res.status(404).json({ error: 'Therapist not found' });
        }
        next(error);
    }
});

export default router;