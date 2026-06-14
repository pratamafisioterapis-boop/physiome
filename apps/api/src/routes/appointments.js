import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
router.use(jwtAuth);

// GET /appointments - Ambil daftar janji temu
router.get('/', async (req, res, next) => {
    try {
        const records = await prisma.appointments.findMany({
            where: {
                clinic_id: req.clinicId
            },
            include: {
                patients: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                therapists: {
                    include: {
                        user: {
                            select: {
                                fullName: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                date: 'desc'
            }
        });
        res.json(records);
    } catch (error) {
        next(error);
    }
});

// GET /appointments/:id - Ambil detail janji temu
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const record = await prisma.appointments.findFirst({
            where: { 
                id, 
                clinic_id: req.clinicId 
            },
            include: {
                patients: true,
                therapists: {
                    include: {
                        user: {
                            select: {
                                fullName: true,
                                email: true,
                                phone: true
                            }
                        }
                    }
                }
            }
        });

        if (!record) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.json(record);
    } catch (error) {
        next(error);
    }
});

// POST /appointments - Buat janji temu baru
router.post('/', async (req, res, next) => {
    const { patient_id, therapist_id, date, time, duration, notes, status } = req.body || {};
    try {
        const newAppointment = await prisma.appointments.create({
            data: {
                id: uuidv4(),
                patient_id,
                therapist_id,
                clinic_id: req.clinicId,
                date: new Date(date),
                time,
                duration: parseInt(duration) || 30,
                notes,
                status: status || 'Scheduled'
            }
        });
        res.status(201).json(newAppointment);
    } catch (error) {
        next(error);
    }
});

// PUT /appointments/:id - Update janji temu
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { patient_id, therapist_id, date, time, duration, notes, status } = req.body || {};
    try {
        const updated = await prisma.appointments.update({
            where: { id },
            data: {
                patient_id,
                therapist_id,
                date: date ? new Date(date) : undefined,
                time,
                duration: duration ? parseInt(duration) : undefined,
                notes,
                status
            }
        });
        res.json(updated);
    } catch (error) {
        next(error);
    }
});

// DELETE /appointments/:id - Hapus janji temu
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await prisma.appointments.delete({
            where: { id }
        });
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        next(error);
    }
});

export default router;