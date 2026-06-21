import express from 'express';
import prisma from '../utils/prismaClient.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { jwtAuth } from '../middleware/jwt-auth.js';

const router = express.Router();

function requireSuperAdmin(req, res, next) {
  if (req.userRole !== 'super_admin') {
    return res.status(403).json({ message: 'Forbidden: super_admins only' });
  }
  return next();
}

// GET /super-admin/clinics - list all clinics with admin and subscription metadata
router.get('/clinics', jwtAuth, requireSuperAdmin, async (req, res, next) => {
  try {
    const clinics = await prisma.clinics.findMany({});
    const clinicIds = clinics.map((clinic) => clinic.id);

    const subscriptions = await prisma.clinic_subscriptions.findMany({
      where: { clinic_id: { in: clinicIds } }
    });

    const admins = await prisma.users.findMany({
      where: {
        role: 'admin',
        clinic_id: { in: clinicIds }
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        clinic_id: true
      }
    });

    const clinicsWithMeta = clinics.map((clinic) => ({
      ...clinic,
      subscription: subscriptions.find((sub) => sub.clinic_id === clinic.id) || null,
      admins: admins.filter((admin) => admin.clinic_id === clinic.id)
    }));

    res.json(clinicsWithMeta);
  } catch (err) {
    next(err);
  }
});

// POST /super-admin/clinics/:id/subscribe - create or update subscription for clinic
router.post('/clinics/:id/subscribe', jwtAuth, requireSuperAdmin, async (req, res, next) => {
  const clinicId = req.params.id;
  const { plan = 'basic', payment_method = 'manual' } = req.body;

  try {
    const subscription = await prisma.clinic_subscriptions.upsert({
      where: { clinic_id: clinicId },
      create: {
        id: uuidv4(),
        clinic_id: clinicId,
        status: 'active',
        plan,
        payment_method,
        started_at: new Date(),
      },
      update: {
        status: 'active',
        plan,
        payment_method,
        started_at: new Date(),
        ended_at: null,
      }
    });

    res.json(subscription);
  } catch (err) {
    next(err);
  }
});

// POST /super-admin/clinics/:id/cancel - cancel subscription
router.post('/clinics/:id/cancel', jwtAuth, requireSuperAdmin, async (req, res, next) => {
  const clinicId = req.params.id;
  try {
    const subscription = await prisma.clinic_subscriptions.updateMany({
      where: { clinic_id: clinicId },
      data: { status: 'cancelled', ended_at: new Date() }
    });
    res.json({ success: true, updated: subscription.count });
  } catch (err) {
    next(err);
  }
});

// GET /super-admin/payment-settings - get current bank transfer settings list
router.get('/payment-settings', jwtAuth, requireSuperAdmin, async (req, res, next) => {
  try {
    const settingsList = await prisma.billing_settings.findMany({
      orderBy: { id: 'asc' }
    });

    res.json(settingsList);
  } catch (err) {
    next(err);
  }
});

// POST /super-admin/payment-settings - save or create bank transfer payment settings
router.post('/payment-settings', jwtAuth, requireSuperAdmin, async (req, res, next) => {
  const { id, bank_name, account_name, account_number, transfer_instructions } = req.body;

  try {
    let settings;

    if (id) {
      settings = await prisma.billing_settings.upsert({
        where: { id },
        create: {
          bank_name,
          account_name,
          account_number,
          transfer_instructions,
          updated_at: new Date()
        },
        update: {
          bank_name,
          account_name,
          account_number,
          transfer_instructions,
          updated_at: new Date()
        }
      });
    } else {
      settings = await prisma.billing_settings.create({
        data: {
          bank_name,
          account_name,
          account_number,
          transfer_instructions,
          updated_at: new Date()
        }
      });
    }

    res.json(settings);
  } catch (err) {
    next(err);
  }
});

// POST /super-admin/create - bootstrap a super admin (protected by secret)
router.post('/create', async (req, res, next) => {
  const { secret, fullName, email, password } = req.body;
  if (secret !== process.env.SUPER_ADMIN_SECRET) return res.status(401).json({ message: 'Invalid secret' });

  try {
    const existing = await prisma.users.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password || 'changeme', 10);
    const user = await prisma.users.create({
      data: {
        id: uuidv4(),
        email,
        password: hashed,
        fullName: fullName || 'Super Admin',
        role: 'super_admin'
      }
    });

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
});

// ===== CLINICS CRUD =====

// POST /super-admin/clinics - create clinic
router.post('/clinics', jwtAuth, requireSuperAdmin, async (req, res, next) => {
  const { name, phone, address, city } = req.body;

  try {
    if (!name) return res.status(400).json({ message: 'Clinic name is required' });

    const clinic = await prisma.clinics.create({
      data: {
        id: uuidv4(),
        name,
        phone: phone || null,
        address: address || null,
        city: city || null,
        created_at: new Date(),
        updated_at: new Date()
      }
    });

    res.status(201).json(clinic);
  } catch (err) {
    next(err);
  }
});

// PUT /super-admin/clinics/:id - update clinic
router.put('/clinics/:id', jwtAuth, requireSuperAdmin, async (req, res, next) => {
  const { id } = req.params;
  const { name, phone, address, city } = req.body;

  try {
    const clinic = await prisma.clinics.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(phone !== undefined && { phone }),
        ...(address !== undefined && { address }),
        ...(city !== undefined && { city }),
        updated_at: new Date()
      }
    });

    res.json(clinic);
  } catch (err) {
    next(err);
  }
});

// DELETE /super-admin/clinics/:id - delete clinic
router.delete('/clinics/:id', jwtAuth, requireSuperAdmin, async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.clinics.delete({
      where: { id }
    });

    res.json({ success: true, message: 'Clinic deleted' });
  } catch (err) {
    next(err);
  }
});

// ===== USERS CRUD =====

// GET /super-admin/users - list all users
router.get('/users', jwtAuth, requireSuperAdmin, async (req, res, next) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        clinic_id: true,
        phone: true,
        created_at: true,
        updated_at: true
      }
    });

    res.json(users);
  } catch (err) {
    next(err);
  }
});

// POST /super-admin/users - create user
router.post('/users', jwtAuth, requireSuperAdmin, async (req, res, next) => {
  const { email, password, fullName, role, clinic_id, phone } = req.body;

  try {
    if (!email || !password || !fullName || !role) {
      return res.status(400).json({ message: 'Email, password, fullName, and role are required' });
    }

    const supportedRoles = ['admin', 'therapist', 'patient', 'super_admin'];
    if (!supportedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (role !== 'super_admin' && !clinic_id) {
      return res.status(400).json({ message: 'Clinic is required for admin, therapist, and patient roles' });
    }

    const existing = await prisma.users.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        id: uuidv4(),
        email,
        password: hashed,
        fullName,
        role,
        clinic_id: role === 'super_admin' ? null : clinic_id,
        phone: phone || null,
        created_at: new Date(),
        updated_at: new Date()
      }
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      clinic_id: user.clinic_id,
      phone: user.phone
    });
  } catch (err) {
    next(err);
  }
});

// PUT /super-admin/users/:id - update user
router.put('/users/:id', jwtAuth, requireSuperAdmin, async (req, res, next) => {
  const { id } = req.params;
  const { email, fullName, role, clinic_id, phone } = req.body;

  try {
    if (role) {
      const supportedRoles = ['admin', 'therapist', 'patient', 'super_admin'];
      if (!supportedRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
    }

    if (role && role !== 'super_admin' && !clinic_id) {
      return res.status(400).json({ message: 'Clinic is required for admin, therapist, and patient roles' });
    }

    const normalizedClinicId = clinic_id === '' ? null : clinic_id;

    const user = await prisma.users.update({
      where: { id },
      data: {
        ...(email && { email }),
        ...(fullName && { fullName }),
        ...(role && { role }),
        ...(clinic_id !== undefined && { clinic_id: normalizedClinicId }),
        ...(phone !== undefined && { phone }),
        updated_at: new Date()
      }
    });

    res.json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      clinic_id: user.clinic_id,
      phone: user.phone
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /super-admin/users/:id - delete user
router.delete('/users/:id', jwtAuth, requireSuperAdmin, async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.users.delete({
      where: { id }
    });

    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
