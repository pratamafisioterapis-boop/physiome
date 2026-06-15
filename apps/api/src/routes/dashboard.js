import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';

const router = express.Router();
router.use(jwtAuth);

/**
 * GET /dashboard/patient-stats
 * Ringkasan untuk Dashboard Pasien
 */
router.get('/patient-stats', async (req, res, next) => {
    try {
        // 1. Cari data pasien berdasarkan email user yang login
        const user = await prisma.users.findUnique({ where: { id: req.userId } });
        const patient = await prisma.patients.findFirst({ 
            where: { email: user.email } 
        });

        if (!patient) {
            return res.json({ programs: [], appointments: [], adherence: 0, streak: 0 });
        }

        // 2. Ambil Program Aktif & Janji Temu Mendatang
        const [assignments, upcomingAppointments, exerciseLogs] = await Promise.all([
            prisma.program_assignments.findMany({
                where: { 
                    patient_id: patient.id,
                    status: 'Active'
                },
                orderBy: { created_at: 'desc' },
                take: 5
            }),
            prisma.appointments.findMany({
                where: {
                    patient_id: patient.id,
                    date: { gte: new Date() }
                },
                include: {
                    therapist: {
                        include: { user: { select: { fullName: true } } }
                    }
                },
                orderBy: { date: 'asc' },
                take: 3
            }),
            prisma.exercise_logs.findMany({
                where: { patient_id: patient.id },
                orderBy: { session_date: 'desc' }
            })
        ]);

        // 3. Ambil Nama Program secara manual (karena relasi di schema belum lengkap)
        const programsWithNames = await Promise.all(assignments.map(async (asg) => {
            const prog = await prisma.exercise_programs.findUnique({
                where: { id: asg.program_id },
                select: { name: true, expected_duration: true }
            });
            return {
                ...asg,
                program_name: prog?.name || 'Recovery Program',
                expected_duration: prog?.expected_duration
            };
        }));

        // Hitung Adherence (contoh sederhana: rata-rata completion_percentage dari semua log)
        const totalCompletion = exerciseLogs.reduce((sum, log) => sum + (log.completion_percentage || 0), 0);
        const adherence = exerciseLogs.length > 0 ? Math.round(totalCompletion / exerciseLogs.length) : 0;

        // Hitung Streak (jumlah hari berturut-turut dengan setidaknya satu log)
        let streak = 0;
        if (exerciseLogs.length > 0) {
            const uniqueLogDates = [...new Set(exerciseLogs.map(log => new Date(log.session_date).toISOString().split('T')[0]))].sort().reverse();
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            for (const logDate of uniqueLogDates) {
                const date = new Date(logDate);
                date.setHours(0, 0, 0, 0);
                const diffDays = Math.round(Math.abs((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)));
                if (diffDays === streak) { // Jika hari ini atau kemarin, dll.
                    streak++;
                    currentDate.setDate(currentDate.getDate() - 1); // Mundur satu hari
                } else if (diffDays > streak) { // Ada gap
                    break;
                }
            }
        }

        res.json({
            programs: programsWithNames,
            appointments: upcomingAppointments,
            adherence,
            streak,
            lastPainReduction: 2
        });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /dashboard/admin-stats
 * Ringkasan untuk Dashboard Admin/Terapis
 */
router.get('/admin-stats', async (req, res, next) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        const [patientsCount, therapistsCount, programsCount, appointmentsToday] = await Promise.all([
            prisma.patients.count({ where: { clinic_id: req.clinicId } }),
            prisma.therapists.count({ where: { clinic_id: req.clinicId } }),
            prisma.exercise_programs.count({ where: { clinic_id: req.clinicId, status: 'Active' } }),
            prisma.appointments.count({ 
                where: { 
                    clinic_id: req.clinicId,
                    date: today
                } 
            })
        ]);

        res.json({
            patients: patientsCount,
            therapists: therapistsCount,
            programs: programsCount,
            appointments: appointmentsToday,
            adherence: 72
        });
    } catch (error) {
        next(error);
    }
});

export default router;