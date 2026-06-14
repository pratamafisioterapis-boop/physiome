import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
router.use(jwtAuth);

// GET /exercises - Ambil semua latihan yang tersedia untuk klinik ini
router.get('/', async (req, res, next) => {
    try {
        const records = await prisma.exercises.findMany({
            where: {
                OR: [
                    { clinic_id: req.clinicId },
                    { clinic_id: null },
                    { clinic_id: '' }
                ]
            },
            orderBy: {
                name: 'asc'
            }
        });
        res.json(records);
    } catch (error) {
        next(error);
    }
});

// GET /exercises/:id - Ambil detail satu latihan
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const exercise = await prisma.exercises.findFirst({
            where: {
                id,
                OR: [
                    { clinic_id: req.clinicId },
                    { clinic_id: null },
                    { clinic_id: '' }
                ]
            }
        });
        if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
        res.json(exercise);
    } catch (error) {
        next(error);
    }
});

// POST /exercises - Menambahkan latihan baru ke pustaka (Bisa dipanggil dari My Videos)
router.post('/', async (req, res, next) => {
    const { name, description, body_region, difficulty, category, thumbnail_url, video_url, instructions, contraindications, progression_tips } = req.body || {};
    try {
        const newExercise = await prisma.exercises.create({
            data: {
                id: uuidv4(),
                name,
                description,
                body_region,
                difficulty,
                category,
                thumbnail_url,
                video_url,
                instructions,
                contraindications,
                progression_tips,
                clinic_id: req.clinicId,
                created_by: req.userId
            }
        });
        res.status(201).json(newExercise);
    } catch (error) {
        next(error);
    }
});

// PUT /exercises/:id - Update data latihan
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const data = req.body || {};

    if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'No data provided for update' });
    }

    try {
        // 1. Cari latihan untuk mengecek kepemilikan
        const exercise = await prisma.exercises.findUnique({
            where: { id }
        });

        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        // 2. Jika latihan adalah Global (clinic_id null) atau milik klinik lain, tolak edit
        if (exercise.clinic_id !== req.clinicId) {
            return res.status(403).json({ 
                error: 'You do not have permission to edit this exercise. Global templates cannot be modified.' 
            });
        }

        // 3. Lakukan update jika valid
        const updated = await prisma.exercises.update({
            where: { id },
            data
        });
        res.json(updated);
    } catch (error) {
        next(error);
    }
});

// DELETE /exercises/:id - Hapus latihan dari pustaka
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await prisma.exercises.delete({
            where: { id, clinic_id: req.clinicId }
        });
        res.json({ message: 'Exercise deleted successfully' });
    } catch (error) {
        next(error);
    }
});

export default router;