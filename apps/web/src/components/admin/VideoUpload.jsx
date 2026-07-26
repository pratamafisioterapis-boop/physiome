import React from 'react';
import Input from '@/components/Input.jsx';
import VideoPlayerComponent from '@/components/exercises/VideoPlayerComponent.jsx';
import { Info } from 'lucide-react';
import { validateVideoUrl } from '@/lib/videoUpload.js';

/**
 * Input tautan video untuk form "buat latihan baru".
 *
 * Upload berkas tidak tersedia di sini karena latihannya belum punya id —
 * berkas diunggah lewat tombol video di kartu latihan setelah tersimpan.
 * Pratinjau memakai player yang sama dengan halaman lain supaya perilakunya
 * konsisten (YouTube, MP4, WebM, MOV).
 */
const VideoUpload = ({ value, onChange }) => {
  const error = value?.trim() ? validateVideoUrl(value) : null;

  return (
    <div className="space-y-2">
      <Input
        label="Tautan video (YouTube / MP4)"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://youtube.com/watch?v=..."
      />

      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : (
        value?.trim() && <VideoPlayerComponent videoUrl={value.trim()} title="Pratinjau video" />
      )}

      <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
        <Info className="w-3.5 h-3.5 shrink-0 mt-px" />
        Ingin mengunggah file video? Simpan latihan ini dulu, lalu gunakan tombol video pada kartunya.
      </p>
    </div>
  );
};

export default VideoUpload;
