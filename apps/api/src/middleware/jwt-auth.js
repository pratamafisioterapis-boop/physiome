import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient.js'; // Import Prisma Client

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key'; // Ganti dengan secret key yang kuat

export async function jwtAuth(req, res, next) {
	const token = req.headers.authorization?.split(' ')?.[1];

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized: No token provided' });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		
		// Cari user di database MySQL untuk memastikan user masih ada dan aktif
		const user = await prisma.users.findUnique({
			where: { id: decoded.userId }, // Sesuaikan dengan kolom ID di tabel users Anda
			select: { id: true, role: true, clinic_id: true } // Ambil data yang diperlukan
		});

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized: User not found' });
		}

		req.userId = user.id;
		req.userRole = user.role;
		req.clinicId = user.clinic_id; // Jika relevan untuk otorisasi berbasis klinik

		return next();
	} catch (error) {
		// Token tidak valid atau expired
		return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
	}
}
