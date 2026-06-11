import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';

const router = express.Router();

router.use(jwtAuth); // Gunakan middleware JWT untuk proteksi rute

// GET /:userId - Ambil preferensi bahasa pengguna
router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;

  // Verifikasi bahwa pengguna yang diautentikasi memiliki izin untuk mengakses preferensi ini
  // req.userId diset oleh middleware jwtAuth
  if (req.userId !== userId && req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Anda hanya dapat mengakses preferensi bahasa Anda sendiri.' });
  }

  try {
    const preference = await prisma.user_language_preferences.findFirst({
      where: { user_id: userId }
    });

    if (!preference) {
      // Jika tidak ditemukan, kembalikan preferensi default dengan status 200 OK
      return res.status(200).json({
        preferred_language: 'en',
        app_language: 'en',
        exercise_language: 'en',
        reminder_language: 'en',
      });
    }

    res.json(preference);
  } catch (error) {
    next(error); // Teruskan error ke error middleware
  }
});

// POST / - Buat preferensi bahasa baru
router.post('/', async (req, res, next) => {
  const { user_id, preferred_language, app_language, exercise_language, reminder_language } = req.body;

  // Verifikasi bahwa pengguna yang diautentikasi memiliki izin untuk membuat preferensi ini
  if (req.userId !== user_id && req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Anda hanya dapat membuat preferensi bahasa untuk diri sendiri.' });
  }

  try {
    // Generate ID unik manual (sesuai format PocketBase ID)
    const id = Math.random().toString(36).substring(2, 17);
    const now = new Date().toISOString();

    const newPref = await prisma.user_language_preferences.create({
      data: {
        id,
        user_id,
        preferred_language,
        app_language,
        exercise_language,
        reminder_language,
        created: now,
        updated: now
      }
    });
    res.status(201).json(newPref); // 201 Created
  } catch (error) {
    next(error);
  }
});

// PUT /:userId - Perbarui preferensi bahasa
router.put('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const data = req.body;

  // Verifikasi bahwa pengguna yang diautentikasi memiliki izin untuk memperbarui preferensi ini
  if (req.userId !== userId && req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Anda hanya dapat memperbarui preferensi bahasa Anda sendiri.' });
  }

  try {
    const existingPreference = await prisma.user_language_preferences.findFirst({
      where: { user_id: userId }
    });

    if (!existingPreference) {
      return res.status(404).json({ error: 'Preferensi bahasa tidak ditemukan.' });
    }

    const updated = await prisma.user_language_preferences.update({
      where: { id: existingPreference.id }, // Update berdasarkan ID unik preferensi
      data: {
        ...data,
        updated: new Date().toISOString()
      }
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

export default router;