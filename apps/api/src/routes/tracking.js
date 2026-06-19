import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
router.use(jwtAuth);

/**
 * POST /tracking/exercise-log
 * Mencatat penyelesaian latihan oleh pasien
 */
router.post('/exercise-log', async (req, res, next) => {
    const { program_id, exercises_completed, sets_completed, pain_before, pain_after, duration_seconds, notes } = req.body;

    try {
        // Cari profil pasien berdasarkan userId dari token
        const user = await prisma.users.findUnique({ where: { id: req.userId } });
        const patient = await prisma.patients.findFirst({ where: { email: user.email } });

        if (!patient) return res.status(404).json({ error: 'Patient profile not found' });

        const log = await prisma.exercise_logs.create({
            data: {
                id: uuidv4(),
                patient_id: patient.id,
                program_id,
                clinic_id: req.clinicId,
                exercises_completed,
                sets_completed,
                pain_before,
                pain_after,
                duration_seconds,
                notes
            }
        });

        // Update adherence_rate di program_assignments secara sederhana
        // (Misal: hitung total log vs durasi program)
        
        res.status(201).json(log);
    } catch (error) {
        next(error);
    }
});

/**
 * GET /tracking/stats/:patientId
 * Mengambil data tren nyeri untuk dashboard terapis
 */
router.get('/stats/:patientId', async (req, res, next) => {
    const { patientId } = req.params;
    try {
        const logs = await prisma.exercise_logs.findMany({
            where: { 
                patient_id: patientId,
                clinic_id: req.clinicId 
            },
            orderBy: { session_date: 'asc' },
            select: {
                session_date: true,
                pain_before: true,
                pain_after: true
            }
        });
        
        // Format data untuk grafik frontend
        const chartData = logs.map(l => ({
            date: l.session_date.toISOString().split('T')[0],
            avgPain: (l.pain_before + l.pain_after) / 2
        }));

        res.json(chartData);
    } catch (error) {
        next(error);
    }
});

export default router;