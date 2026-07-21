// Backend is now Supabase: Postgres + Auth + a single Edge Function ("api")
// that replaces the old Express server. See supabase/functions/api/index.ts.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://kulmcujbxkjjpppyorxp.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const API_SERVER_URL = `${SUPABASE_URL}/functions/v1/api`;

const apiServerClient = {
    fetch: async (url, options = {}) => {
        // Ambil token sesi Supabase dari localStorage
        const token = localStorage.getItem('auth_token');

        // Gabungkan headers yang ada dengan Authorization header jika token tersedia
        const headers = {
            ...options.headers,
            ...(SUPABASE_ANON_KEY ? { 'apikey': SUPABASE_ANON_KEY } : {}),
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        };

        const response = await window.fetch(API_SERVER_URL + url, { ...options, headers });

        if (!response.ok) {
            // Coba parse body error, jika gagal, gunakan statusText
            const errorBody = await response.json().catch(() => ({ error: response.statusText }));
            throw new Error(errorBody.error || `Request failed with status ${response.status}`);
        }

        return response.json();
    }
};

export default apiServerClient;

export { apiServerClient };
