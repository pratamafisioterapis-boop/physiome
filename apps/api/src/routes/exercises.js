import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
router.use(jwtAuth);

// GET /exercises - Mengambil semua gerakan latihan di klinik
router.get('/', async (req, res, next) => {
    try {
        const exercises = await prisma.exercises.findMany({
            where: {
                clinic_id: req.clinicId
            },
            orderBy: {
                name: 'asc'
            }
        });
        res.json(exercises);
    } catch (error) {
        next(error);
    }
});

// POST /exercises - Menambahkan latihan baru
router.post('/', async (req, res, next) => {
    const { name, description, body_region, difficulty, thumbnail_url, gif_url, video_url } = req.body;
    try {
        const exercise = await prisma.exercises.create({
            data: {
                id: uuidv4(),
                name,
                description,
                body_region,
                difficulty,
                thumbnail_url,
                gif_url,
                video_url,
                clinic_id: req.clinicId
            }
        });
        res.status(201).json(exercise);
    } catch (error) {
        next(error);
    }
});

// PUT /exercises/:id - Memperbarui latihan
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const exercise = await prisma.exercises.update({
            where: {
                id: id,
                clinic_id: req.clinicId
            },
            data
        });
        res.json(exercise);
    } catch (error) {
        next(error);
    }
});

// DELETE /exercises/:id - Menghapus latihan
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await prisma.exercises.delete({
            where: {
                id: id,
                clinic_id: req.clinicId
            }
        });
        res.json({ message: 'Exercise deleted successfully' });
    } catch (error) {
        next(error);
    }
});

export default router;