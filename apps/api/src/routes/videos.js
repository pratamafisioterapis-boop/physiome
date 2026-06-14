import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

// Tell fluent-ffmpeg where the ffmpeg binary is located
ffmpeg.setFfmpegPath(ffmpegStatic);

// Pastikan direktori uploads ada agar multer tidak error saat mencoba menulis file
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi multer dengan batasan ukuran (misal 500MB)
const upload = multer({ 
    dest: uploadDir,
    limits: { fileSize: 500 * 1024 * 1024 } 
});

const router = express.Router();
router.use(jwtAuth);

// GET /videos - Ambil semua video untuk klinik pengguna
router.get('/', async (req, res, next) => {
    try {
        const videos = await prisma.videos.findMany({
            where: {
                clinic_id: req.clinicId
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        res.json(videos);
    } catch (error) {
        next(error);
    }
});

// DELETE /videos/:id - Hapus video
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        // 1. Cari data video terlebih dahulu untuk mendapatkan path file
        const video = await prisma.videos.findUnique({
            where: {
                id: id,
                clinic_id: req.clinicId
            }
        });

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // 2. Hapus record dari database
        await prisma.videos.delete({
            where: { id: id }
        });

        // 3. Fungsi pembantu untuk menghapus file fisik jika ada di folder uploads
        const removeLocalFile = (fileUrl) => {
            if (fileUrl && fileUrl.startsWith('/uploads/')) {
                const filePath = path.join(process.cwd(), fileUrl);
                if (fs.existsSync(filePath)) {
                    fs.unlink(filePath, (err) => {
                        if (err) console.error(`Failed to delete local file ${fileUrl}:`, err);
                    });
                }
            }
        };

        removeLocalFile(video.video_url);
        removeLocalFile(video.thumbnail_url);

        res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        next(error);
    }
});

// POST /videos - Endpoint dasar untuk simpan data video (panggil dari VideoUploadComponent)
router.post('/', (req, res, next) => {
    // Log untuk memastikan header Authorization sampai ke backend
    if (process.env.NODE_ENV !== 'production') {
        console.log('Auth Header:', req.headers.authorization);
    }

    upload.single('video_file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: `Upload error: ${err.message}` });
        } else if (err) {
            return res.status(500).json({ message: `Internal server error: ${err.message}` });
        }
        next();
    });
}, async (req, res, next) => {
    try {
        const { name, description, duration } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Video name is required' });
        }

        if (!req.clinicId) {
            return res.status(403).json({ message: 'Clinic ID not found in token' });
        }

        let thumbnail_url = null;
        
        // Generate thumbnail jika ada file yang diupload
        if (req.file) {
            const thumbnailFilename = `thumb-${req.file.filename}.png`;
            try {
                await new Promise((resolve, reject) => {
                    ffmpeg(req.file.path)
                        .screenshots({
                            timestamps: [1], // Ambil di detik ke-1
                            filename: thumbnailFilename,
                            folder: uploadDir,
                            size: '640x?'
                        })
                        .on('end', resolve)
                        .on('error', reject);
                });
                thumbnail_url = `/uploads/${thumbnailFilename}`;
            } catch (thumbError) {
                console.error('Failed to generate thumbnail:', thumbError);
                // Kita lanjutkan tanpa thumbnail agar upload video tidak gagal total
            }
        }

        const video = await prisma.videos.create({
            data: {
                id: uuidv4(),
                name,
                description,
                duration: parseInt(duration) || 0,
                video_url: req.file ? `/uploads/${req.file.filename}` : req.body.video_url,
                thumbnail_url: thumbnail_url || req.body.thumbnail_url,
                clinic_id: req.clinicId
            }
        });
        res.status(201).json(video);
    } catch (error) {
        console.error('Error creating video record:', error);
        next(error);
    }
});

export default router;