import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
router.use(jwtAuth);

// GET /exercise-logs - Ambil log latihan (bisa difilter berdasarkan patient_id)
router.get('/', async (req, res, next) => {
    try {
        let where = { clinic_id: req.clinicId };

        if (req.userRole === 'patient') {
            const patient = await prisma.patients.findFirst({ where: { userId: req.userId } });
        } else if (req.query.patient_id) {
            where.patient_id = req.query.patient_id;
        }

        const logs = await prisma.exercise_logs.findMany({ where, orderBy: { session_date: 'desc' } });
        res.json(logs);
    } catch (error) {
        next(error);
    }
});


// POST /exercise-logs - Simpan hasil latihan sesi pasien
router.post('/', async (req, res, next) => {
    const { 
        program_id, patient_id, exercises_completed, sets_completed, 
        pain_before, pain_after, duration, adherence_rate, 
        completion_percentage, notes 
    } = req.body;

    try {
        const log = await prisma.exercise_logs.create({
            data: {
                id: uuidv4(),
                patient_id,
                program_id,
                clinic_id: req.clinicId,
                exercises_completed: parseInt(exercises_completed) || 0,
                sets_completed: parseInt(sets_completed) || 0,
                pain_before: parseInt(pain_before) || 0,
                pain_after: parseInt(pain_after) || 0,
                duration_seconds: parseInt(duration) || 0,
                adherence_rate: parseInt(adherence_rate) || 0,
                completion_percentage: parseInt(completion_percentage) || 0,
                notes
            }
        });
        res.status(201).json(log);
    } catch (error) {
        next(error);
    }
});

export default router;