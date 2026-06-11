const API_SERVER_URL = '/hcgi/api';

const apiServerClient = {
    fetch: async (url, options = {}) => {
        const response = await window.fetch(API_SERVER_URL + url, options);

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
