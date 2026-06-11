import express from 'express';
import prisma from '../utils/prismaClient.js'; // Mengganti PocketBase client dengan Prisma
import logger from '../utils/logger.js';
import bcrypt from 'bcrypt'; // Untuk hashing password
import jwt from 'jsonwebtoken'; // Untuk JSON Web Tokens
import { jwtAuth } from '../middleware/jwt-auth.js'; // Middleware autentikasi JWT

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key'; // Pastikan ini ada di .env Anda
const BCRYPT_SALT_ROUNDS = 10; // Jumlah salt rounds untuk bcrypt

// Endpoint Login
// POST /auth/login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { email },
      select: { id: true, email: true, password: true, role: true, full_name: true, clinic_id: true } // Ambil password untuk verifikasi
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Buat JWT Token
    const token = jwt.sign(
      { userId: user.id, userRole: user.role, clinicId: user.clinic_id },
      JWT_SECRET,
      { expiresIn: '1h' } // Token berlaku 1 jam
    );

    // Hapus password dari objek user sebelum dikirim ke frontend
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    logger.error('Login error:', error);
    next(error); // Teruskan error ke error middleware
  }
});

// Endpoint Get Current User (Protected)
// GET /auth/me
router.get('/me', jwtAuth, async (req, res, next) => {
  try {
    // req.userId diset oleh middleware jwtAuth
    const user = await prisma.users.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, role: true, full_name: true, clinic_id: true }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (error) {
    logger.error('Error fetching current user:', error);
    next(error);
  }
});

// Endpoint Validate Invite Code
// POST /auth/validate-invite-code
router.post('/validate-invite-code', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'code is required' });
  }

  // Query invite_codes collection for code (case-insensitive)
  const inviteCode = await prisma.invite_codes.findFirst({
    where: { code: code.toLowerCase() }
  });

  // Check if code exists
  if (!inviteCode) {
    return res.status(400).json({ error: 'Code is invalid' });
  }

  // Check if code is active
  if (!inviteCode.is_active) {
    throw new Error('Code is invalid');
  }

  // Check if code is expired (expires_at is null or in future)
  if (inviteCode.expires_at) {
    const expiryDate = new Date(inviteCode.expires_at); // Pastikan expires_at adalah string tanggal yang valid
    if (expiryDate < new Date()) {
      return res.status(400).json({ error: 'Code is expired' });
    }
  }

  // Check if code is unused (used_by is null)
  if (inviteCode.used_by) {
    return res.status(400).json({ error: 'Code is already used' });
  }

  // All checks passed
  res.json({
    valid: true,
    role: inviteCode.role,
    message: 'Code is valid',
  });
});

// Endpoint Register New User
// POST /auth/register
router.post('/register', async (req, res) => {
  const { email, password, fullName, inviteCode } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ error: 'email, password, and fullName are required' });
  }

  let role = 'therapist'; // Default role
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  
  // If inviteCode provided, validate it
  if (inviteCode) {
    const inviteCodeRecord = await prisma.invite_codes.findFirst({
      where: { code: inviteCode.toLowerCase() }
    });

    // Validate code
    if (!inviteCodeRecord) {
      return res.status(400).json({ error: 'Invalid or expired invite code' });
    }

    if (!inviteCodeRecord.is_active) {
      return res.status(400).json({ error: 'Invalid or expired invite code' });
    }

    if (inviteCodeRecord.expires_at) {
      const expiryDate = new Date(inviteCodeRecord.expires_at); // Pastikan expires_at adalah string tanggal yang valid
      if (expiryDate < new Date()) {
        return res.status(400).json({ error: 'Invalid or expired invite code' });
      }
    }

    if (inviteCodeRecord.used_by) {
      return res.status(400).json({ error: 'Invalid or expired invite code' });
    }

    // Extract role from validated code
    role = inviteCodeRecord.role;

    // Create user in pb.collection('users')
    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        full_name: fullName,
        role,
        invite_code: inviteCodeRecord.id,
      },
      select: { id: true, email: true, role: true }
    });

    // Update the invite_code record: set used_by = newUser.id, is_active = false
    await prisma.invite_codes.update({
      where: { id: inviteCodeRecord.id },
      data: { used_by: newUser.id, is_active: false }
    });

    logger.info(`User registered with invite code: ${newUser.id}`);

    res.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } else {
    // No invite code provided, create user with default role
    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword, // Simpan password yang sudah di-hash
        full_name: fullName, // Sesuaikan dengan nama kolom di tabel users Anda
        // passwordConfirm tidak diperlukan di Prisma
        role,
      },
      select: { id: true, email: true, role: true }
    });

    logger.info(`User registered without invite code: ${newUser.id}`);

    res.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  }
});

export default router;