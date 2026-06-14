import express, { Router } from 'express';
import path from 'path';
import healthCheck from './health-check.js';
import integratedAiRouter from './integrated-ai.js';
import billingRouter from './billing.js';
import authRouter from './auth.js';
import clinicsRouter from './clinics.js';
import languageRouter from './language.js';
import dashboardRouter from './dashboard.js';
import patientsRouter from './patients.js';
import appointmentsRouter from './appointments.js';
import therapistsRouter from './therapists.js';
import exerciseProgramsRouter from './exercise-programs.js';
import exercisesRouter from './exercises.js';
import videosRouter from './videos.js';
import programAssignmentsRouter from './program-assignments.js';
import soapNotesRouter from './soap-notes.js';

const router = Router();

export default () => {
    router.get('/health', healthCheck);
    router.use('/integrated-ai', integratedAiRouter);
    router.use('/billing', billingRouter);
    router.use('/auth', authRouter);
    router.use('/clinics', clinicsRouter);
    router.use('/dashboard', dashboardRouter);
    router.use('/patients', patientsRouter);

    // Rute untuk melayani file statis (Video & Thumbnail)
    // Ini akan memetakan http://localhost:3003/uploads/... ke folder fisik ./uploads
    router.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

    router.use('/appointments', appointmentsRouter);
    router.use('/therapists', therapistsRouter);
    router.use('/exercise-programs', exerciseProgramsRouter);
    router.use('/exercises', exercisesRouter);
    router.use('/videos', videosRouter);
    router.use('/program-assignments', programAssignmentsRouter);
    router.use('/soap-notes', soapNotesRouter);
    router.use('/user-preferences/language', languageRouter);

    return router;
};