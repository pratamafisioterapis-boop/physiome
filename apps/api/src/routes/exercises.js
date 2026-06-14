import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
router.use(jwtAuth);

// GET /exercises - Ambil semua latihan untuk klinik ini
router.get('/', async (req, res, next) => {
    try {
        const exercises = await prisma.exercises.findMany({
            where: { clinic_id: req.clinicId },
            orderBy: { name: 'asc' }
        });
        res.json(exercises);
    } catch (error) {
        next(error);
    }
});

// GET /exercises/:id - Ambil detail satu latihan
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const exercise = await prisma.exercises.findUnique({
            where: { id, clinic_id: req.clinicId }
        });
        if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
        res.json(exercise);
    } catch (error) {
        next(error);
    }
});

// POST /exercises - Tambah latihan baru ke pustaka
router.post('/', async (req, res, next) => {
    const data = req.body;
    try {
        const exercise = await prisma.exercises.create({
            data: {
                id: uuidv4(),
                ...data,
                clinic_id: req.clinicId,
                created_by: req.userId
            }
        });
        res.status(201).json(exercise);
    } catch (error) {
        next(error);
    }
});

// PUT /exercises/:id - Update data latihan
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updated = await prisma.exercises.update({
            where: { id, clinic_id: req.clinicId },
            data
        });
        res.json(updated);
    } catch (error) {
        next(error);
    }
});

// DELETE /exercises/:id - Hapus latihan
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        // Opsional: Cek apakah latihan sedang digunakan di program manapun
        // Untuk saat ini kita izinkan penghapusan langsung
        await prisma.exercises.delete({
            where: { id, clinic_id: req.clinicId }
        });
        res.json({ message: 'Exercise deleted successfully' });
    } catch (error) {
        next(error);
    }
});

export default router;