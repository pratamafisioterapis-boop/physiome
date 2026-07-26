// Aturan & util upload video yang dipakai bersama oleh semua layar upload,
// supaya batas ukuran/format tidak lagi berbeda-beda antar komponen.

export const MAX_VIDEO_SIZE_MB = 200;
export const MAX_VIDEO_SIZE = MAX_VIDEO_SIZE_MB * 1024 * 1024;

export const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
export const ACCEPTED_VIDEO_ACCEPT_ATTR = ACCEPTED_VIDEO_TYPES.join(',');
export const ACCEPTED_VIDEO_LABEL = 'MP4, WebM, MOV';

/** @returns {string|null} pesan error, atau null bila file valid. */
export function validateVideoFile(file) {
  if (!file) return 'Tidak ada file yang dipilih.';
  // Sebagian browser mengirim type kosong untuk .mov — jatuhkan ke cek ekstensi.
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  const typeOk = ACCEPTED_VIDEO_TYPES.includes(file.type) || ['mp4', 'webm', 'mov'].includes(ext);
  if (!typeOk) return `Format tidak didukung. Gunakan ${ACCEPTED_VIDEO_LABEL}.`;
  if (file.size > MAX_VIDEO_SIZE) {
    return `Ukuran file ${(file.size / (1024 * 1024)).toFixed(0)}MB melebihi batas ${MAX_VIDEO_SIZE_MB}MB.`;
  }
  return null;
}

export const formatFileSize = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export const formatDuration = (seconds) => {
  const total = Math.max(0, Math.round(seconds || 0));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

/**
 * Baca durasi video dan ambil satu frame sebagai thumbnail.
 * Thumbnail dibuat di sisi klien supaya kartu latihan langsung menampilkan
 * gambar begitu upload selesai (tanpa itu, kartu tetap terlihat kosong dan
 * upload seolah-olah gagal).
 *
 * Tidak pernah menolak: kalau browser gagal men-decode, kembalikan thumbnail null.
 *
 * @returns {Promise<{ duration: number, thumbnailBlob: Blob|null, previewUrl: string }>}
 */
export function probeVideoFile(file) {
  return new Promise((resolve) => {
    const previewUrl = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';

    let settled = false;
    const finish = (duration, thumbnailBlob) => {
      if (settled) return;
      settled = true;
      resolve({ duration: Number.isFinite(duration) ? Math.round(duration) : 0, thumbnailBlob, previewUrl });
    };

    // Jangan menggantung UI kalau decoding gagal / codec tidak didukung.
    const timeout = setTimeout(() => finish(0, null), 10000);

    const capture = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            clearTimeout(timeout);
            finish(video.duration, blob);
          },
          'image/jpeg',
          0.8,
        );
      } catch {
        clearTimeout(timeout);
        finish(video.duration, null);
      }
    };

    video.onloadedmetadata = () => {
      // Frame pertama sering hitam; ambil sedikit setelah awal video.
      const target = Math.min(1, (video.duration || 1) / 4);
      video.currentTime = Number.isFinite(target) ? target : 0;
    };
    video.onseeked = capture;
    video.onerror = () => {
      clearTimeout(timeout);
      finish(0, null);
    };

    video.src = previewUrl;
  });
}

const YOUTUBE_HOSTS = ['youtube.com', 'youtu.be'];

export const isYouTubeUrl = (url = '') => YOUTUBE_HOSTS.some((host) => url.includes(host));

/** ID video YouTube dari berbagai bentuk URL (watch, youtu.be, shorts, embed). */
export function youTubeVideoId(url = '') {
  const clean = url.trim();
  if (clean.includes('youtu.be/')) return clean.split('youtu.be/')[1]?.split(/[?#/]/)[0] || null;
  if (clean.includes('shorts/')) return clean.split('shorts/')[1]?.split(/[?#/]/)[0] || null;
  if (clean.includes('embed/')) return clean.split('embed/')[1]?.split(/[?#/]/)[0] || null;
  if (clean.includes('v=')) return clean.split('v=')[1]?.split('&')[0] || null;
  return null;
}

/** Thumbnail otomatis untuk tautan YouTube, supaya kartu tidak kosong. */
export function thumbnailForUrl(url = '') {
  if (!isYouTubeUrl(url)) return null;
  const id = youTubeVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

/** Validasi ringan untuk tautan video yang ditempel manual. */
export function validateVideoUrl(url = '') {
  const clean = url.trim();
  if (!clean) return 'Tautan video tidak boleh kosong.';
  let parsed;
  try {
    parsed = new URL(clean);
  } catch {
    return 'Tautan tidak valid. Sertakan https:// di awal.';
  }
  if (!/^https?:$/.test(parsed.protocol)) return 'Tautan harus diawali http:// atau https://.';
  if (isYouTubeUrl(clean) && !youTubeVideoId(clean)) return 'Tautan YouTube tidak dikenali.';
  return null;
}
