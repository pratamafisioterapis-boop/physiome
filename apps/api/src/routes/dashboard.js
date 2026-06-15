import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';

const router = express.Router();
router.use(jwtAuth);

// GET /dashboard/exercise-overview - Statistik untuk Exercise Dashboard
router.get('/exercise-overview', async (req, res, next) => {
    try {
        const [totalExercises, totalPrograms, activeAssignments] = await Promise.all([
            prisma.exercises.count({ where: { clinic_id: req.clinicId } }),
            prisma.exercise_programs.count({ where: { clinic_id: req.clinicId } }),
            prisma.program_assignments.count({ 
                where: { 
                    clinic_id: req.clinicId,
                    status: 'Active'
                } 
            })
        ]);

        const recentAssignments = await prisma.program_assignments.findMany({
            where: { clinic_id: req.clinicId },
            include: {
                patient: { select: { name: true } }
            },
            take: 5,
            orderBy: { created_at: 'desc' }
        });

        res.json({
            stats: { totalExercises, totalPrograms, activeAssignments },
            recentAssignments
        });
    } catch (error) {
        next(error);
    }
});

// GET /dashboard/admin-stats - Statistik Utama untuk Admin Dashboard
router.get('/admin-stats', async (req, res, next) => {
    try {
        const [patientsCount, therapistsCount, programsCount, appointmentsCount, adherenceResult] = await Promise.all([
            prisma.patients.count({ where: { clinic_id: req.clinicId } }),
            prisma.therapists.count({ where: { clinic_id: req.clinicId } }),
            prisma.exercise_programs.count({ where: { clinic_id: req.clinicId } }),
            prisma.appointments.count({ where: { clinic_id: req.clinicId } }),
            prisma.program_assignments.aggregate({
                where: { clinic_id: req.clinicId },
                _avg: { adherence_rate: true }
            })
        ]);

        res.json({
            patients: patientsCount,
            therapists: therapistsCount,
            programs: programsCount,
            appointments: appointmentsCount,
            // Jika tidak ada data, kembalikan 0 alih-alih null
            adherence: Math.round(adherenceResult._avg.adherence_rate || 0)
        });
    } catch (error) {
        next(error);
    }
});

export default router;