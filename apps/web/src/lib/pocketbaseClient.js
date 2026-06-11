// File ini tidak lagi diperlukan karena PocketBase telah dimigrasikan ke MySQL.
// Kode yang sebelumnya mengimpor `pocketbaseClient` seharusnya sekarang menggunakan `apiServerClient`
// atau direfaktor untuk berinteraksi dengan API baru yang didukung MySQL.

const pocketbaseClient = {
	// Mock authStore agar AuthContext tidak crash
	authStore: {
		get isValid() {
			return !!localStorage.getItem('auth_token');
		},
		get token() {
			return localStorage.getItem('auth_token');
		},
		model: null,
		clear: () => localStorage.removeItem('auth_token'),
		save: (token, model) => localStorage.setItem('auth_token', token),
	},
};

export default pocketbaseClient;

export { pocketbaseClient };