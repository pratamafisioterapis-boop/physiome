import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
router.use(jwtAuth);

// GET /exercise-programs - Daftar program latihan klinik
router.get('/', async (req, res, next) => {
    try {
        const programs = await prisma.exercise_programs.findMany({
            where: { clinic_id: req.clinicId },
            orderBy: { updated_at: 'desc' }
        });
        res.json(programs);
    } catch (error) {
        next(error);
    }
});

// POST /exercise-programs - Simpan program baru (dari Builder)
router.post('/', async (req, res, next) => {
    const { name, description, clinical_goal, body_region, exercises } = req.body;
    try {
        const program = await prisma.exercise_programs.create({
            data: {
                id: uuidv4(),
                name,
                description,
                clinical_goal,
                body_region,
                exercises, // JSON field
                clinic_id: req.clinicId,
                created_by: req.userId,
                status: 'Active'
            }
        });
        res.status(201).json(program);
    } catch (error) {
        next(error);
    }
});

// DELETE /exercise-programs/:id
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        // Cek apakah program sedang digunakan di program_assignments
        const isUsed = await prisma.program_assignments.findFirst({
            where: { program_id: id }
        });

        if (isUsed) {
            return res.status(400).json({ error: 'Cannot delete program: It is currently assigned to patients.' });
        }

        await prisma.exercise_programs.delete({
            where: { id: id, clinic_id: req.clinicId }
        });
        res.json({ message: 'Program deleted' });
    } catch (error) {
        next(error);
    }
});

export default router;