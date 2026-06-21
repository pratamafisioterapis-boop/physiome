import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
router.use(jwtAuth);

// GET /exercise-programs/templates - Ambil template global
router.get('/templates', async (req, res, next) => {
    try {
        console.log("Fetching global templates...");
        
        const templates = await prisma.exercise_programs.findMany({
            where: {
                OR: [
                    { clinic_id: null },
                    { clinic_id: '' }
                ],
                status: 'Active'
            },
            orderBy: {
                name: 'asc'
            }
        });

        console.log(`Found ${templates.length} templates in database.`);

        // Transformasi agar format exercise list konsisten jika disimpan sebagai JSON
        const formatted = templates.map(t => ({
            ...t,
            exercisesCount: Array.isArray(t.exercises) ? t.exercises.length : 0
        }));

        res.json(formatted);
    } catch (error) {
        next(error);
    }
});

// GET /exercise-programs - Ambil daftar program milik klinik saat ini
router.get('/', async (req, res, next) => {
    try {
        const programs = await prisma.exercise_programs.findMany({
            where: {
                clinic_id: req.clinicId
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        res.json(programs);
    } catch (error) {
        next(error);
    }
});

// POST /exercise-programs - Simpan program baru khusus untuk klinik saat ini
router.post('/', async (req, res, next) => {
    const { name, description, exercises, status, clinical_goal, body_region, expected_duration } = req.body;
    try {
        const newProgram = await prisma.exercise_programs.create({
            data: {
                id: uuidv4(),
                name,
                description,
                clinical_goal,
                body_region,
                expected_duration,
                exercises, // Prisma otomatis menangani tipe Json
                status: status || 'Active',
                clinic_id: req.clinicId, // Otomatis terisi dari JWT token middleware
                created_by: req.userId   // Otomatis terisi dari JWT token middleware
            }
        });
        res.status(201).json(newProgram);
    } catch (error) {
        next(error);
    }
});

// GET /exercise-programs/:id - Ambil detail program/template
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const whereClause = req.userRole === 'super_admin'
            ? { id }
            : {
                id,
                OR: [
                    { clinic_id: req.clinicId },
                    { clinic_id: null },
                    { clinic_id: '' }
                ]
            };

        const program = await prisma.exercise_programs.findFirst({
            where: whereClause
        });

        if (!program) {
            return res.status(404).json({ error: 'Program not found' });
        }

        // Parse exercises jika disimpan sebagai string di DB
        if (program.exercises && typeof program.exercises === 'string') {
            program.exercises = JSON.parse(program.exercises);
        }

        res.json(program);
    } catch (error) {
        next(error);
    }
});

// PUT /exercise-programs/:id - Update program milik klinik atau global template oleh super_admin
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, description, exercises, status, clinical_goal, body_region, expected_duration } = req.body;
    try {
        const whereClause = req.userRole === 'super_admin'
            ? { id }
            : { id, clinic_id: req.clinicId };

        const updated = await prisma.exercise_programs.update({
            where: whereClause,
            data: {
                name,
                description,
                clinical_goal,
                body_region,
                expected_duration,
                exercises,
                status
            }
        });
        res.json(updated);
    } catch (error) {
        next(error);
    }
});

// DELETE /exercise-programs/:id - Hapus program milik klinik atau global template oleh super_admin
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const whereClause = req.userRole === 'super_admin'
            ? { id }
            : { id, clinic_id: req.clinicId };

        await prisma.exercise_programs.delete({
            where: whereClause
        });
        res.json({ message: 'Program deleted successfully' });
    } catch (error) {
        next(error);
    }
});

export default router;