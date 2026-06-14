import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';

const router = express.Router();
router.use(jwtAuth);

// GET /soap-notes/patient/:patientId
router.get('/patient/:patientId', async (req, res, next) => {
    const { patientId } = req.params;
    try {
        const notes = await prisma.soap_notes.findMany({
            where: { 
                patient_id: patientId,
                patients: { clinic_id: req.clinicId }
            },
            orderBy: { created_at: 'desc' }
        });
        res.json(notes);
    } catch (error) {
        next(error);
    }
});

// POST /soap-notes
router.post('/', async (req, res, next) => {
    const { patient_id, subjective, objective, assessment, plan } = req.body;
    try {
        // Verifikasi kepemilikan pasien
        const patient = await prisma.patients.findUnique({
            where: { id: patient_id, clinic_id: req.clinicId }
        });

        if (!patient) return res.status(403).json({ error: 'Access denied' });

        const note = await prisma.soap_notes.create({
            data: {
                patient_id,
                therapist_id: req.userId,
                subjective,
                objective,
                assessment,
                plan
            }
        });
        res.status(201).json(note);
    } catch (error) {
        next(error);
    }
});

export default router;