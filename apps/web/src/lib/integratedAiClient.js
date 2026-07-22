// NOTE: the AI chat feature (integrated-ai) is not yet ported to the Supabase
// Edge Function backend — it depended on server-side secrets (INTEGRATED_AI_API_URL/KEY)
// that could not be configured from this migration. These calls will 404 until
// that endpoint is added to supabase/functions/api/index.ts with its secrets set.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://kulmcujbxkjjpppyorxp.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1bG1jdWpieGtqanBwcHlvcnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2Mjk1NDYsImV4cCI6MjA4NDIwNTU0Nn0.dCAvZSjnOqeYwX7s_Z1DfMr-fuoaMa62F75bSHwMJp8';
const API_SERVER_URL = `${SUPABASE_URL}/functions/v1/api`;

function getAuthToken() {
	return localStorage.getItem('auth_token'); // Pastikan key ini sesuai dengan tempat Anda menyimpan JWT
}

const integratedAiClient = {
	fetch: async (path, options = {}) => {
		const token = getAuthToken();

		const response = await window.fetch(API_SERVER_URL + path, {
			...options,
			headers: {
				...options.headers,
				...(SUPABASE_ANON_KEY && { apikey: SUPABASE_ANON_KEY }),
				...(token && { Authorization: `Bearer ${token}` }),
			},
		});

		if (!response.ok) {
			const errorBody = await response.text();
			throw new Error(`Request failed (${response.status}): ${errorBody}`);
		}

		return response.json();
	},

	stream: async (path, { body, signal, images } = {}) => {
		const token = getAuthToken();

		const headers = {
			Accept: 'text/event-stream',
			...(SUPABASE_ANON_KEY && { apikey: SUPABASE_ANON_KEY }),
			...(token && { Authorization: `Bearer ${token}` }),
		};

		const formData = new FormData();
		formData.append('message', JSON.stringify(body.message));

		images.forEach((image) => {
			formData.append('images', image);
		});

		const response = await window.fetch(API_SERVER_URL + path, {
			method: 'POST',
			headers,
			body: formData,
			signal,
		});

		if (!response.ok) {
			const errorBody = await response.text();
			throw new Error(`Request failed (${response.status}): ${errorBody}`);
		}

		if (!response.body) {
			throw new Error('No response body');
		}

		return response;
	},
};

export default integratedAiClient;

export { integratedAiClient };
