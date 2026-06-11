import { Router } from 'express';
import healthCheck from './health-check.js';
import integratedAiRouter from './integrated-ai.js';
import billingRouter from './billing.js';
import authRouter from './auth.js';
import languageRouter from './language.js';

const router = Router();

export default () => {
    router.get('/health', healthCheck);
    router.use('/integrated-ai', integratedAiRouter);
    router.use('/billing', billingRouter);
    router.use('/auth', authRouter);
    router.use('/user-preferences/language', languageRouter); // Memasang languageRouter di path yang benar

    return router;
};