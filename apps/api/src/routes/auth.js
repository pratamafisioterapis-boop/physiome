import express from 'express';
import prisma from '../utils/prismaClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { jwtAuth } from '../middleware/jwt-auth.js';

const router = express.Router();

/**
 * POST /auth/register
 * Logika Pendaftaran: 
 * 1. Jika ada inviteCode: Bergabung ke klinik yang ada sebagai 'therapist'.
 * 2. Jika tidak ada: Membuat Klinik Baru + User sebagai 'admin'.
 */
router.post('/register', async (req, res, next) => {
    const { clinicName, fullName, email, password, inviteCode } = req.body;

    try {
        // Cek apakah email sudah terdaftar
        const existingUser = await prisma.users.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Menjalankan transaksi database
        const result = await prisma.$transaction(async (tx) => {
            let clinicId = null;
            let userRole = 'admin';
            let inviteId = null;

            // 1. Cek Invite Code jika ada
            if (inviteCode) {
                const codeData = await tx.invite_codes.findUnique({
                    where: { code: inviteCode, is_active: true }
                });

                if (!codeData || (codeData.expires_at && new Date() > codeData.expires_at)) {
                    throw new Error('Invalid or expired invite code');
                }

                // Ambil clinic_id dari siapa yang membuat invite code ini (atau sesuaikan skema Anda)
                // Karena skema invite_codes tidak punya clinic_id langsung, kita asumsikan 
                // invite code terkait dengan role therapist untuk bergabung ke klinik.
                // Untuk demo ini, kita cari user yang buat code tersebut.
                const inviter = await tx.users.findFirst({
                    where: { invite_code_id: codeData.id }
                });
                
                clinicId = inviter?.clinic_id;
                userRole = codeData.role || 'therapist';
                inviteId = codeData.id;
            } else {
                // Buat Klinik Baru jika tidak ada invite code
                const newClinic = await tx.clinics.create({
                    data: {
                        id: uuidv4(),
                        name: clinicName || `${fullName}'s Clinic`,
                    }
                });
                clinicId = newClinic.id;
            }

            // 2. Buat User (Role: admin)
            const user = await tx.users.create({
                data: {
                    id: uuidv4(),
                    email,
                    password: hashedPassword,
                    fullName,
                    role: userRole,
                    clinic_id: clinicId,
                    invite_code_id: inviteId
                }
            });

            // Jika bergabung lewat invite, tandai kode sudah terpakai
            if (inviteId) {
                await tx.invite_codes.update({
                    where: { id: inviteId },
                    data: { used_by: user.id, is_active: false }
                });
            }

            // Jika pendaftar baru (admin), update pencipta klinik
            if (!inviteCode) {
                await tx.clinics.update({
                    where: { id: clinicId },
                    data: { created_by: user.id }
                });
            }

            return { user, clinicId };
        });

        // Generate JWT Token
        const token = jwt.sign(
            { 
                userId: result.user.id, 
                userRole: result.user.role, 
                clinicId: result.clinicId 
            },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                id: result.user.id,
                fullName: result.user.fullName,
                role: result.user.role,
                clinic_id: result.clinicId
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /auth/login
 * Menangani autentikasi pengguna
 */
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // 1. Cari user berdasarkan email
        const user = await prisma.users.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 2. Bandingkan password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 3. Generate JWT Token (samakan dengan logika register)
        const token = jwt.sign(
            { 
                userId: user.id, 
                userRole: user.role, 
                clinicId: user.clinic_id 
            },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                role: user.role,
                clinic_id: user.clinic_id
            }
        });
    } catch (error) {
        next(error);
    }
});

// PATCH /auth/update-profile - Digunakan saat onboarding untuk melengkapi data profil & klinik
router.patch('/update-profile', jwtAuth, async (req, res, next) => {
    const { fullName, specialization, licenseNumber, phone, address, city } = req.body;

    try {
        await prisma.$transaction(async (tx) => {
            // 1. Update nama lengkap User
            if (fullName) {
                await tx.users.update({
                    where: { id: req.userId },
                    data: { fullName }
                });
            }

            // 2. Buat atau Update profil profesional Terapis
            if (specialization || licenseNumber) {
                const user = await tx.users.findUnique({
                    where: { id: req.userId },
                    select: { clinic_id: true }
                });

                await tx.therapists.upsert({
                    where: { userId: req.userId },
                    update: {
                        specialization,
                        licenseNumber
                    },
                    create: {
                        id: uuidv4(),
                        userId: req.userId,
                        clinic_id: user.clinic_id,
                        specialization,
                        licenseNumber,
                        status: 'Active'
                    }
                });
            }

            // 3. Update informasi Klinik (hanya jika user adalah admin)
            if (req.userRole === 'admin' && (phone || address || city)) {
                const user = await tx.users.findUnique({
                    where: { id: req.userId },
                    select: { clinic_id: true }
                });

                if (user?.clinic_id) {
                    await tx.clinics.update({
                        where: { id: user.clinic_id },
                        data: { phone, address, city }
                    });
                }
            }
        });

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        next(error);
    }
});

// Endpoint /auth/me untuk sinkronisasi login state
router.get('/me', jwtAuth, async (req, res, next) => {
    try {
        const user = await prisma.users.findUnique({
            where: { id: req.userId },
            select: { id: true, fullName: true, role: true, clinic_id: true, email: true }
        });
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.json(user);
    } catch (error) {
        next(error);
    }
});

export default router;