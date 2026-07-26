// Backend is now Supabase: Postgres + Auth + a single Edge Function ("api")
// that replaces the old Express server. See supabase/functions/api/index.ts.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://kulmcujbxkjjpppyorxp.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1bG1jdWpieGtqanBwcHlvcnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2Mjk1NDYsImV4cCI6MjA4NDIwNTU0Nn0.dCAvZSjnOqeYwX7s_Z1DfMr-fuoaMa62F75bSHwMJp8';
const API_SERVER_URL = `${SUPABASE_URL}/functions/v1/api`;

// Satu-satunya sumber token. Jangan baca localStorage langsung dari komponen —
// key-nya pernah berbeda-beda ('token'/'accessToken') dan itu penyebab upload
// gagal diam-diam dengan 401.
const getAuthToken = () => {
    const raw = localStorage.getItem('auth_token');
    if (!raw || raw === 'null' || raw === 'undefined') return null;
    // Toleran terhadap token yang pernah tersimpan sebagai JSON string.
    return raw.startsWith('"') || raw.startsWith("'") ? raw.slice(1, -1) : raw;
};

const authHeaders = () => {
    const token = getAuthToken();
    return {
        ...(SUPABASE_ANON_KEY ? { apikey: SUPABASE_ANON_KEY } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

const apiServerClient = {
    getAuthToken,

    fetch: async (url, options = {}) => {
        const headers = { ...options.headers, ...authHeaders() };

        const response = await window.fetch(API_SERVER_URL + url, { ...options, headers });

        if (!response.ok) {
            // Coba parse body error, jika gagal, gunakan statusText
            const errorBody = await response.json().catch(() => ({ error: response.statusText }));
            throw new Error(errorBody.error || `Request failed with status ${response.status}`);
        }

        return response.json();
    },

    /**
     * Upload multipart dengan progress bar. `fetch()` tidak bisa melaporkan
     * progress upload, jadi bagian ini memakai XHR — tetapi otentikasi,
     * base URL, dan penanganan error-nya tetap satu jalur dengan `fetch()`.
     *
     * @returns {{ promise: Promise<any>, abort: () => void }}
     */
    upload: (url, formData, { method = 'POST', onProgress } = {}) => {
        const xhr = new XMLHttpRequest();

        const promise = new Promise((resolve, reject) => {
            if (!getAuthToken()) {
                reject(new Error('Sesi berakhir. Silakan login ulang.'));
                return;
            }

            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable && onProgress) {
                    onProgress(Math.round((event.loaded / event.total) * 100));
                }
            });

            xhr.addEventListener('load', () => {
                let payload = null;
                try {
                    payload = JSON.parse(xhr.responseText);
                } catch {
                    payload = null;
                }

                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(payload);
                } else {
                    reject(new Error(payload?.error || payload?.message || `Upload gagal (${xhr.status})`));
                }
            });

            xhr.addEventListener('error', () => reject(new Error('Koneksi terputus saat mengunggah')));
            xhr.addEventListener('timeout', () => reject(new Error('Upload melebihi batas waktu')));
            xhr.addEventListener('abort', () => reject(Object.assign(new Error('Upload dibatalkan'), { aborted: true })));

            xhr.open(method, API_SERVER_URL + url, true);
            // Jangan set Content-Type: browser harus menuliskan multipart boundary sendiri.
            Object.entries(authHeaders()).forEach(([key, value]) => xhr.setRequestHeader(key, value));
            xhr.send(formData);
        });

        return { promise, abort: () => xhr.abort() };
    },
};

export default apiServerClient;

export { apiServerClient };
