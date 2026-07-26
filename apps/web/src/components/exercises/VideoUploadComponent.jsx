import React, { useEffect, useRef, useState } from 'react';
import { Upload, X, FileVideo, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  ACCEPTED_VIDEO_ACCEPT_ATTR,
  ACCEPTED_VIDEO_LABEL,
  MAX_VIDEO_SIZE_MB,
  formatDuration,
  formatFileSize,
  probeVideoFile,
  validateVideoFile,
} from '@/lib/videoUpload.js';

/**
 * Pemilih berkas video (presentational). Komponen ini TIDAK mengunggah apa pun:
 * ia memvalidasi berkas, mengambil durasi + thumbnail di sisi klien, lalu
 * menyerahkan hasilnya ke induk lewat `onFileSelect`.
 *
 * @param {(selection: { file: File, duration: number, thumbnailBlob: Blob|null, previewUrl: string }|null) => void} onFileSelect
 */
const VideoUploadComponent = ({ onFileSelect, isUploading = false, uploadProgress = 0, onCancelUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selection, setSelection] = useState(null);
  const [error, setError] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const inputRef = useRef(null);
  const previewUrlRef = useRef(null);

  // Object URL preview harus dilepas, kalau tidak berkas video tetap tertahan di memori.
  useEffect(() => () => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const processFile = async (file) => {
    const validationError = validateVideoFile(file);
    if (validationError) {
      setError(validationError);
      setSelection(null);
      onFileSelect?.(null);
      return;
    }

    setError(null);
    setIsReading(true);
    try {
      const { duration, thumbnailBlob, previewUrl } = await probeVideoFile(file);
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = previewUrl;

      const next = { file, duration, thumbnailBlob, previewUrl };
      setSelection(next);
      onFileSelect?.(next);
    } finally {
      setIsReading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    if (e.target.files?.[0]) processFile(e.target.files[0]);
  };

  const handleRemove = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setSelection(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
    onFileSelect?.(null);
  };

  if (!selection) {
    return (
      <div className="space-y-2">
        <div
          role="button"
          tabIndex={0}
          className={`relative border-2 border-dashed rounded-xl p-8 transition-colors flex flex-col items-center justify-center text-center cursor-pointer ${
            dragActive ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-muted/50 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
        >
          <input
            type="file"
            ref={inputRef}
            onChange={handleChange}
            accept={ACCEPTED_VIDEO_ACCEPT_ATTR}
            className="hidden"
          />

          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            {isReading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
          </div>
          <h3 className="font-semibold text-lg text-foreground mb-1">
            {isReading ? 'Membaca video...' : 'Pilih file video'}
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-4">
            Tarik file ke sini, atau klik untuk memilih dari komputer.
          </p>
          <div className="flex flex-col gap-1 text-xs text-muted-foreground opacity-80">
            <span>Format: {ACCEPTED_VIDEO_LABEL}</span>
            <span>Ukuran maksimal: {MAX_VIDEO_SIZE_MB}MB</span>
          </div>
        </div>

        {error && (
          <p className="flex items-start gap-2 text-xs text-destructive">
            <AlertCircle className="w-4 h-4 shrink-0 mt-px" /> {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl overflow-hidden border border-border bg-black aspect-video">
        <video src={selection.previewUrl} controls className="w-full h-full object-contain" />
      </div>

      <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 shadow-sm">
        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
          <FileVideo className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate" title={selection.file.name}>
            {selection.file.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(selection.file.size)}
            {selection.duration > 0 && ` · ${formatDuration(selection.duration)}`}
          </p>

          {isUploading && (
            <div className="mt-2 space-y-1">
              <Progress value={uploadProgress} className="h-1.5" />
              <p className="text-xs text-muted-foreground text-right">Mengunggah {uploadProgress}%</p>
            </div>
          )}
        </div>

        {isUploading ? (
          onCancelUpload && (
            <Button variant="ghost" size="sm" onClick={onCancelUpload} className="shrink-0 text-destructive">
              Batal
            </Button>
          )
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            title="Hapus pilihan"
            className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoUploadComponent;
