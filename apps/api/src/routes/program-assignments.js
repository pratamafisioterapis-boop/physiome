import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
router.use(jwtAuth);

// GET /program-assignments - Daftar semua penugasan (History)
router.get('/', async (req, res, next) => {
    try {
        const assignments = await prisma.program_assignments.findMany({
            where: { clinic_id: req.clinicId },
            include: {
                patient: { select: { name: true, email: true } }
            },
            orderBy: { created_at: 'desc' }
        });

        // Ambil nama program secara manual karena relasi tidak terdefinisi di schema untuk exercise_programs
        const programIds = [...new Set(assignments.map(a => a.program_id).filter(Boolean))];
        const programs = await prisma.exercise_programs.findMany({
            where: { id: { in: programIds } },
            select: { id: true, name: true }
        });

        const enriched = assignments.map(a => ({
            ...a,
            program_name: programs.find(p => p.id === a.program_id)?.name || 'Unknown Program'
        }));

        res.json(enriched);
    } catch (error) {
        next(error);
    }
});

// POST /program-assignments - Tugaskan program ke pasien
router.post('/', async (req, res, next) => {
    const { patient_id, program_id, start_date, end_date, therapist_notes } = req.body;
    try {
        const assignment = await prisma.program_assignments.create({
            data: {
                id: uuidv4(),
                patient_id,
                program_id,
                clinic_id: req.clinicId,
                start_date: start_date ? new Date(start_date) : new Date(),
                end_date: end_date ? new Date(end_date) : null,
                therapist_notes,
                status: 'Active',
                adherence_rate: 0
            }
        });
        res.status(201).json(assignment);
    } catch (error) {
        next(error);
    }
});

// PUT /program-assignments/:id - Update status atau progres
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
        if (data.start_date) data.start_date = new Date(data.start_date);
        if (data.end_date) data.end_date = new Date(data.end_date);

        const updated = await prisma.program_assignments.update({
            where: { id, clinic_id: req.clinicId },
            data
        });
        res.json(updated);
    } catch (error) {
        next(error);
    }
});

// DELETE /program-assignments/:id
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await prisma.program_assignments.delete({
            where: { id, clinic_id: req.clinicId }
        });
        res.json({ message: 'Assignment removed' });
    } catch (error) {
        next(error);
    }
});

export default router;