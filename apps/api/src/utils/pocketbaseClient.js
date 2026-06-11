import Pocketbase from 'pocketbase';
import logger from './logger.js';

const POCKETBASE_HOST = "http://pocketbase-app.railway.internal:8090";

async function waitForHealth({ retries = 10, delayMs = 1000 } = {}) {
    for (let i = 1; i <= retries; i++) {
        try {
            const response = await fetch(`${POCKETBASE_HOST}/api/health`, { method: 'HEAD' });

            if (response.ok) {
                return;
            }
        } catch {
            // PocketBase not reachable yet; retry below
        }

        logger.warn(`PocketBase not ready, retrying (${i}/${retries})...`);

        await new Promise((r) => setTimeout(r, delayMs));
    }

    throw new Error(`PocketBase health check failed after ${retries} retries`);
}

const pocketbaseClient = {}; // Placeholder agar tidak error saat di-import file lama

export default pocketbaseClient;
export { pocketbaseClient };
