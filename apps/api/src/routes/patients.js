import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';

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
                clinic_id: req.clinicId // Pastikan pasien milik klinik user yang login
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
 * Menambahkan pasien baru
 */
router.post('/', async (req, res, next) => {
    const data = req.body;
    try {
        const newPatient = await prisma.patients.create({
            data: {
                id: uuidv4(),
                ...data,
                clinic_id: req.clinicId
            }
        });
        res.status(201).json(newPatient);
    } catch (error) {
        next(error);
    }
});

/**
 * PUT /patients/:id
 * Memperbarui data pasien
 */
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedPatient = await prisma.patients.update({
            where: { id, clinic_id: req.clinicId },
            data
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
        await prisma.patients.delete({
            where: { id, clinic_id: req.clinicId }
        });
        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        next(error);
    }
});

export default router;