import express from 'express';
import prisma from '../utils/prismaClient.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
router.use(jwtAuth);

// --- INVOICES ---

// GET /billing/invoices - Ambil semua invoice untuk klinik
router.get('/invoices', async (req, res, next) => {
    try {
        const invoices = await prisma.invoices.findMany({
            where: { clinic_id: req.clinicId },
            include: {
                patients: {
                    select: { name: true }
                }
            },
            orderBy: { invoiceDate: 'desc' }
        });
        res.json(invoices);
    } catch (error) {
        next(error);
    }
});

// GET /billing/invoices/:id - Ambil detail invoice
router.get('/invoices/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const invoice = await prisma.invoices.findUnique({
            where: { id, clinic_id: req.clinicId },
            include: {
                patients: {
                    select: { name: true }
                },
                payments: true
            }
        });
        if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
        res.json(invoice);
    } catch (error) {
        next(error);
    }
});

// POST /billing/invoices - Buat invoice baru
router.post('/invoices', async (req, res, next) => {
    const { patientId, therapistId, invoiceDate, dueDate, totalAmount, packageType } = req.body;
    try {
        // Generate invoice number (simple UUID for now, can be sequential later)
        const invoiceNumber = `INV-${uuidv4().substring(0, 8).toUpperCase()}`;

        const newInvoice = await prisma.invoices.create({
            data: {
                id: uuidv4(),
                invoiceNumber,
                patientId,
                therapistId,
                invoiceDate: new Date(invoiceDate),
                dueDate: new Date(dueDate),
                totalAmount: parseInt(totalAmount),
                packageType,
                clinic_id: req.clinicId // Assuming clinic_id is added to invoices model
            }
        });
        res.status(201).json(newInvoice);
    } catch (error) {
        next(error);
    }
});

// PUT /billing/invoices/:id - Update invoice
router.put('/invoices/:id', async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
        if (data.invoiceDate) data.invoiceDate = new Date(data.invoiceDate);
        if (data.dueDate) data.dueDate = new Date(data.dueDate);
        if (data.totalAmount) data.totalAmount = parseInt(data.totalAmount);
        if (data.amountPaid) data.amountPaid = parseInt(data.amountPaid);

        const updatedInvoice = await prisma.invoices.update({
            where: { id, clinic_id: req.clinicId },
            data
        });
        res.json(updatedInvoice);
    } catch (error) {
        next(error);
    }
});

// DELETE /billing/invoices/:id - Hapus invoice
router.delete('/invoices/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await prisma.invoices.delete({
            where: { id, clinic_id: req.clinicId }
        });
        res.json({ message: 'Invoice deleted' });
    } catch (error) {
        next(error);
    }
});

// --- PAYMENTS ---

// GET /billing/payments - Ambil semua pembayaran untuk klinik
router.get('/payments', async (req, res, next) => {
    try {
        const payments = await prisma.payments.findMany({
            where: {
                invoices: { clinic_id: req.clinicId } // Filter by clinic via invoice relation
            },
            include: {
                invoices: { select: { invoiceNumber: true } },
                patients: { select: { name: true } }
            },
            orderBy: { paymentDate: 'desc' }
        });
        res.json(payments);
    } catch (error) {
        next(error);
    }
});

// POST /billing/payments - Catat pembayaran baru
router.post('/payments', async (req, res, next) => {
    const { invoiceId, patientId, paymentAmount, paymentDate, paymentMethod, referenceNumber, notes } = req.body;
    try {
        // Verify invoice belongs to clinic
        const invoice = await prisma.invoices.findUnique({
            where: { id: invoiceId, clinic_id: req.clinicId }
        });
        if (!invoice) return res.status(403).json({ error: 'Access denied to invoice' });

        const newPayment = await prisma.payments.create({
            data: {
                id: uuidv4(),
                invoiceId,
                patientId,
                paymentAmount: parseInt(paymentAmount),
                paymentDate: new Date(paymentDate),
                paymentMethod,
                referenceNumber,
                notes
            }
        });
        res.status(201).json(newPayment);
    } catch (error) {
        next(error);
    }
});

// --- PATIENT PACKAGES ---

// GET /billing/patient-packages - Ambil semua paket pasien untuk klinik
router.get('/patient-packages', async (req, res, next) => {
    try {
        const packages = await prisma.patient_packages.findMany({
            where: {
                patients: { clinic_id: req.clinicId } // Filter by clinic via patient relation
            },
            include: {
                patients: { select: { name: true } }
            },
            orderBy: { created_at: 'desc' }
        });
        res.json(packages);
    } catch (error) {
        next(error);
    }
});

// POST /billing/patient-packages - Assign paket baru ke pasien
router.post('/patient-packages', async (req, res, next) => {
    const { patientId, packageId, totalSessions, expiryDate } = req.body;
    try {
        // Verify patient belongs to clinic
        const patient = await prisma.patients.findUnique({
            where: { id: patientId, clinic_id: req.clinicId }
        });
        if (!patient) return res.status(403).json({ error: 'Access denied to patient' });

        const newPackage = await prisma.patient_packages.create({
            data: {
                id: uuidv4(),
                patientId,
                packageId,
                totalSessions: parseInt(totalSessions),
                expiryDate: expiryDate ? new Date(expiryDate) : null,
                status: 'Active'
            }
        });
        res.status(201).json(newPackage);
    } catch (error) {
        next(error);
    }
});

export default router;