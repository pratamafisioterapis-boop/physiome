import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();
router.use(jwtAuth);

// GET /program-assignments - Daftar penugasan untuk klinik/pasien
router.get('/', async (req, res, next) => {
    try {
        let where = {};
        if (req.userRole === 'patient') {
            where = { patient: { email: (await prisma.users.findUnique({ where: { id: req.userId } })).email } };
        } else if (req.query.patient_id) {
            // Jika terapis/admin, filter berdasarkan patient_id dari query
            where = { patient_id: req.query.patient_id, clinic_id: req.clinicId };
        } else {
            where = { clinic_id: req.clinicId };
        }

        const assignments = await prisma.program_assignments.findMany({
            where,
            include: { patient: true },
            orderBy: { created_at: 'desc' }
        });

        // Ambil detail nama program secara manual
        const formatted = await Promise.all(assignments.map(async (asg) => {
            const prog = await prisma.exercise_programs.findUnique({
                where: { id: asg.program_id },
                select: { name: true }
            });
            return { ...asg, program_name: prog?.name || 'Unnamed Program' };
        }));

        res.json(formatted);
    } catch (error) {
        next(error);
    }
});

// GET /program-assignments/my-exercises - Ambil semua latihan unik dari program yang ditugaskan kepada pasien yang sedang login
router.get('/my-exercises', async (req, res, next) => {
    try {
        const user = await prisma.users.findUnique({ where: { id: req.userId } });
        const patient = await prisma.patients.findFirst({ where: { email: user.email } });

        if (!patient) {
            return res.status(404).json({ error: 'Patient profile not found.' });
        }

        // 1. Ambil semua penugasan program aktif untuk pasien ini
        const assignments = await prisma.program_assignments.findMany({
            where: {
                patient_id: patient.id,
                status: 'Active' // Hanya program yang aktif
            },
            select: {
                program_id: true
            }
        });

        const programIds = assignments.map(a => a.program_id).filter(Boolean);

        if (programIds.length === 0) {
            return res.json([]); // Tidak ada program yang ditugaskan
        }

        // 2. Ambil semua program latihan yang terkait dengan penugasan ini
        const programs = await prisma.exercise_programs.findMany({
            where: {
                id: { in: programIds }
            },
            select: {
                exercises: true // Ambil JSON exercises dari setiap program
            }
        });

        // 3. Kumpulkan semua latihan individual dari semua program
        let allExercisesFromPrograms = [];
        programs.forEach(p => {
            let programExercises = p.exercises || [];
            if (typeof programExercises === 'string') {
                programExercises = JSON.parse(programExercises);
            }
            allExercisesFromPrograms = allExercisesFromPrograms.concat(programExercises);
        });

        // 4. Dapatkan ID unik dari semua latihan yang ditemukan
        const uniqueExerciseIds = [...new Set(allExercisesFromPrograms.map(e => e.id).filter(Boolean))];

        // 5. Ambil detail lengkap dari tabel exercises berdasarkan ID unik
        const exerciseDetails = await prisma.exercises.findMany({
            where: { id: { in: uniqueExerciseIds } }
        });

        res.json(exerciseDetails);

    } catch (error) {
        next(error);
    }
});

// GET /program-assignments/:id - Detail penugasan dan daftar latihan
router.get('/:id', async (req, res, next) => {
    try {
        const assignment = await prisma.program_assignments.findFirst({
            where: { 
                id: req.params.id,
                OR: [
                    { clinic_id: req.clinicId },
                    { patient: { email: (await prisma.users.findUnique({ where: { id: req.userId } }))?.email } }
                ]
            },
            include: { patient: true }
        });

        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

        const program = await prisma.exercise_programs.findUnique({
            where: { id: assignment.program_id }
        });

        if (!program) return res.status(404).json({ error: 'Program template not found' });

        // Parse exercises jika disimpan sebagai string (beberapa DB driver)
        let programExercises = program.exercises || [];
        if (typeof programExercises === 'string') {
            programExercises = JSON.parse(programExercises);
        }

        const exerciseIds = programExercises.map(e => e.id).filter(Boolean);

        const exerciseDetails = await prisma.exercises.findMany({
            where: { id: { in: exerciseIds } }
        });

        const combinedExercises = programExercises.map(pe => {
            const details = exerciseDetails.find(d => d.id === pe.id);
            
            // Normalisasi data agar cocok dengan FullscreenTimerMode
            return {
                ...pe,
                repetitions: pe.reps || 0,
                work_time: pe.work_time || 0,
                hold_duration: pe.holdTime || pe.hold_duration || 0,
                sets: pe.sets || 3,
                details: details || { 
                    name: pe.name, 
                    instructions: pe.notes,
                    video_url: pe.video_url 
                } 
            };
        });

        res.json({
            ...assignment,
            program_name: program.name,
            description: program.description,
            exercises: combinedExercises
        });
    } catch (error) {
        next(error);
    }
});

// POST /program-assignments - (Rute untuk Terapis menugaskan program)
// Ini adalah rute yang dipanggil dari AssignProgramModal.jsx
router.post('/', async (req, res, next) => {
    const { program_id, patient_id, start_date, end_date, therapist_notes, status } = req.body;

    if (!program_id || !patient_id || !start_date || !end_date) {
        return res.status(400).json({ message: 'Program ID, Patient ID, Start Date, and End Date are required.' });
    }

    try {
        const newAssignment = await prisma.program_assignments.create({
            data: {
                id: uuidv4(),
                program_id,
                patient_id,
                start_date: new Date(start_date),
                end_date: new Date(end_date),
                therapist_notes,
                status: status || 'Active',
                clinic_id: req.clinicId // Diambil dari JWT
            }
        });
        res.status(201).json(newAssignment);
    } catch (error) {
        next(error);
    }
});
export default router;