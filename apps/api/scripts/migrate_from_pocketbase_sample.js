#!/usr/bin/env node
/**
 * Sample migration script: PocketBase JSON export -> Prisma
 * Usage (example):
 *   DATABASE_URL="mysql://..." node migrate_from_pocketbase_sample.js users
 *   or per-collection: node migrate_from_pocketbase_sample.js clinics
 *
 * Notes:
 * - Place PocketBase JSON exports under `apps/pocketbase/pb_data/<collection>.json`.
 * - This script is a template: adapt field mappings to your exact PB schema.
 * - Do NOT run on production without testing on staging and DB backups.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function loadJSON(collection) {
  const f = path.resolve(__dirname, '..', '..', 'apps', 'pocketbase', 'pb_data', `${collection}.json`);
  if (!fs.existsSync(f)) {
    console.error('Export file not found:', f);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(f, 'utf8'));
}

async function migrateUsers() {
  const records = await loadJSON('users');
  console.log('Users to import:', records.length);
  for (const r of records) {
    const email = r.email || r.record?.email;
    const id = r.id || r.record?.id;
    const hashed = r.passwordHash || r.record?.password || null; // if existing hashed

    // transform: example mapping — adapt as needed
    const data = {
      id: id,
      email: email,
      passwordHash: hashed || undefined,
      fullName: r.full_name || r.record?.full_name || null,
      role: (r.role || r.record?.role || 'USER').toUpperCase(),
    };

    try {
      await prisma.user.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
    } catch (e) {
      console.error('Failed user:', id, e.message);
    }
  }
}

async function migrateClinics() {
  const records = await loadJSON('clinics');
  console.log('Clinics to import:', records.length);
  for (const r of records) {
    const data = {
      id: r.id,
      name: r.name,
      slug: r.slug || r.name?.toLowerCase().replace(/[^a-z0-9]+/g,'-')
    };
    try {
      await prisma.clinic.upsert({ where: { id: data.id }, update: data, create: data });
    } catch (e) { console.error('Clinic failed', e.message); }
  }
}

async function migratePatients() {
  const records = await loadJSON('patients');
  console.log('Patients to import:', records.length);
  for (const r of records) {
    const data = {
      id: r.id,
      clinicId: r.clinic_id || r.record?.clinic_id,
      fullName: r.name || r.record?.name || r.full_name,
      dob: r.dob ? new Date(r.dob) : null,
      metadata: r.metadata || null,
    };
    try {
      await prisma.patient.upsert({ where: { id: data.id }, update: data, create: data });
    } catch (e) { console.error('Patient failed', e.message); }
  }
}

async function migrateExercises() {
  const records = await loadJSON('exercises');
  console.log('Exercises to import:', records.length);
  for (const r of records) {
    const data = {
      id: r.id,
      title: r.name || r.title || r.record?.name,
      slug: r.slug,
      description: r.description || null,
      gifUrl: r.gif_url || r.gifUrl || null,
      videoUrl: r.video_url || r.videoUrl || null,
      equipment: r.equipment_needed || null,
      timesAssigned: r.times_assigned || 0
    };
    try {
      await prisma.exercise.upsert({ where: { id: data.id }, update: data, create: data });
    } catch (e) { console.error('Exercise failed', e.message); }
  }
}

async function migratePrograms() {
  const records = await loadJSON('programs');
  console.log('Programs to import:', records.length);
  for (const r of records) {
    const data = {
      id: r.id,
      title: r.name || r.title,
      isPublic: !!r.is_public
    };
    try {
      await prisma.program.upsert({ where: { id: data.id }, update: data, create: data });
      // program exercises mapping may require separate import from `program_exercises` or `program_templates`
    } catch (e) { console.error('Program failed', e.message); }
  }
}

async function migrateAppointments() {
  const records = await loadJSON('appointments');
  console.log('Appointments to import:', records.length);
  for (const r of records) {
    const data = {
      id: r.id,
      clinicId: r.clinic_id,
      patientId: r.patient_id,
      therapistId: r.therapist_id || null,
      startAt: r.start_at ? new Date(r.start_at) : new Date(r.startAt),
      endAt: r.end_at ? new Date(r.end_at) : null,
      status: r.status || 'scheduled'
    };
    try {
      await prisma.appointment.upsert({ where: { id: data.id }, update: data, create: data });
    } catch (e) { console.error('Appointment failed', e.message); }
  }
}

async function migrateInvoices() {
  const records = await loadJSON('invoices');
  console.log('Invoices to import:', records.length);
  for (const r of records) {
    const data = {
      id: r.id,
      clinicId: r.clinic_id,
      patientId: r.patient_id || null,
      amount: r.amount || 0,
      status: r.status || 'draft',
      issuedAt: r.issued_at ? new Date(r.issued_at) : new Date()
    };
    try {
      await prisma.invoice.upsert({ where: { id: data.id }, update: data, create: data });
    } catch (e) { console.error('Invoice failed', e.message); }
  }
}

async function main() {
  const target = process.argv[2];
  if (!target) {
    console.error('Usage: node migrate_from_pocketbase_sample.js <collection>');
    process.exit(1);
  }
  try {
    if (target === 'users') await migrateUsers();
    else if (target === 'clinics') await migrateClinics();
    else if (target === 'patients') await migratePatients();
    else if (target === 'exercises') await migrateExercises();
    else if (target === 'programs') await migratePrograms();
    else if (target === 'appointments') await migrateAppointments();
    else if (target === 'invoices') await migrateInvoices();
    else { console.error('Unknown target:', target); }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(e => { console.error(e); process.exit(1); });
