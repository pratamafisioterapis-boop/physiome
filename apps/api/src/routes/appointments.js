import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
router.use(jwtAuth);

// GET /appointments - Ambil semua janji temu di klinik
router.get('/', async (req, res, next) => {
    try {
        const appointments = await prisma.appointments.findMany({
            where: { clinic_id: req.clinicId },
            include: {
                patients: {
                    select: { name: true, phone: true }
                }
            },
            orderBy: { date: 'asc' }
        });
        res.json(appointments);
    } catch (error) {
        next(error);
    }
});

// POST /appointments - Buat janji temu baru
router.post('/', async (req, res, next) => {
    const { patient_id, therapist_id, date, time, duration, notes } = req.body;
    try {
        const appointment = await prisma.appointments.create({
            data: {
                id: uuidv4(),
                patient_id,
                therapist_id,
                clinic_id: req.clinicId,
                date: new Date(date),
                time,
                duration: parseInt(duration) || 30,
                notes,
                status: 'Scheduled'
            }
        });
        res.status(201).json(appointment);
    } catch (error) {
        next(error);
    }
});

// PUT /appointments/:id - Update status atau detail janji temu
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
        if (data.date) data.date = new Date(data.date);
        
        const updated = await prisma.appointments.update({
            where: { 
                id: id,
                clinic_id: req.clinicId
            },
            data
        });
        res.json(updated);
    } catch (error) {
        next(error);
    }
});

// DELETE /appointments/:id - Batalkan/Hapus janji temu
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await prisma.appointments.delete({
            where: { 
                id: id,
                clinic_id: req.clinicId
            }
        });
        res.json({ message: 'Appointment deleted' });
    } catch (error) {
        next(error);
    }
});

export default router;