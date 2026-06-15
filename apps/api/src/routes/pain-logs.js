import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
router.use(jwtAuth);

// POST /pain-logs - Mencatat tingkat nyeri baru
router.post('/', async (req, res, next) => {
    const { pain_level, location, notes } = req.body;

    try {
        // Cari data pasien berdasarkan email/userId dari JWT
        const user = await prisma.users.findUnique({ where: { id: req.userId } });
        const patient = await prisma.patients.findFirst({ 
            where: { email: user.email } 
        });

        if (!patient) {
            return res.status(404).json({ error: 'Patient profile not found' });
        }

        const log = await prisma.pain_logs.create({
            data: {
                id: uuidv4(),
                patient_id: patient.id,
                clinic_id: req.clinicId,
                pain_level: parseInt(pain_level),
                location,
                notes
            }
        });

        res.status(201).json(log);
    } catch (error) {
        next(error);
    }
});

export default router;