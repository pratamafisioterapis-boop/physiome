import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';

const router = express.Router();
router.use(jwtAuth);

// GET /program-assignments - Mengambil semua penugasan program di klinik
router.get('/', async (req, res, next) => {
    try {
        const assignments = await prisma.program_assignments.findMany({
            where: {
                clinic_id: req.clinicId
            },
            include: {
                patients: {
                    select: { name: true }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        // Karena di schema.prisma belum ada relasi eksplisit ke exercise_programs,
        // kita ambil nama program secara manual untuk memperkaya data
        const programIds = [...new Set(assignments.map(a => a.program_id).filter(Boolean))];
        const programs = await prisma.exercise_programs.findMany({
            where: { id: { in: programIds } }
        });

        const enrichedAssignments = assignments.map(a => ({
            ...a,
            program_name: programs.find(p => p.id === a.program_id)?.name || 'Unknown Program'
        }));

        res.json(enrichedAssignments);
    } catch (error) {
        next(error);
    }
});

export default router;