import React, { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import VideoFilePicker from '@/components/exercises/VideoUploadComponent.jsx';
import apiServerClient from '@/lib/apiServerClient.js';

/**
 * Upload video ke pustaka video (`/videos`) — dipakai halaman "My Videos".
 *
 * Autentikasi dan progress ditangani `apiServerClient.upload`, jadi komponen ini
 * tidak lagi menebak-nebak key token di localStorage atau menyalin URL Supabase.
 */
const VideoUploadComponent = ({ onUploadSuccess }) => {
  const [selection, setSelection] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const uploadRef = useRef(null);
  // Reset paksa pemilih berkas setelah upload sukses.
  const [pickerKey, setPickerKey] = useState(0);

  const handleFileSelect = (next) => {
    setSelection(next);
    if (next) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || next.file.name.split('.').slice(0, -1).join('.') || next.file.name,
      }));
    }
  };

  const reset = () => {
    setSelection(null);
    setProgress(0);
    setFormData({ name: '', description: '' });
    setPickerKey((k) => k + 1);
  };

  const handleUpload = async () => {
    if (!selection) return;
    if (!formData.name.trim()) {
      toast.error('Judul video wajib diisi');
      return;
    }

    const form = new FormData();
    form.append('video_file', selection.file);
    form.append('name', formData.name.trim());
    form.append('description', formData.description.trim());
    form.append('duration', String(selection.duration || 0));
    if (selection.thumbnailBlob) form.append('thumbnail_file', selection.thumbnailBlob, 'thumbnail.jpg');

    setIsUploading(true);
    setProgress(0);
    const request = apiServerClient.upload('/videos', form, { onProgress: setProgress });
    uploadRef.current = request;

    try {
      const created = await request.promise;
      toast.success('Video berhasil diunggah');
      onUploadSuccess?.(created);
      reset();
    } catch (error) {
      if (!error?.aborted) {
        console.error('Video upload failed:', error);
        toast.error(error?.message || 'Upload gagal. Coba lagi.');
      }
    } finally {
      uploadRef.current = null;
      setIsUploading(false);
    }
  };

  return (
    <Card className="border-border shadow-sm overflow-hidden">
      <CardContent className="p-6 space-y-6">
        <VideoFilePicker
          key={pickerKey}
          onFileSelect={handleFileSelect}
          isUploading={isUploading}
          uploadProgress={progress}
          onCancelUpload={() => uploadRef.current?.abort()}
        />

        {selection && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="space-y-2">
              <Label htmlFor="video-title">
                Judul video <span className="text-destructive">*</span>
              </Label>
              <Input
                id="video-title"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="mis. Latihan ekstensi lutut"
                disabled={isUploading}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="video-desc">Deskripsi (opsional)</Label>
              <Textarea
                id="video-desc"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Catatan atau instruksi tentang video ini..."
                disabled={isUploading}
                className="resize-none h-24 bg-background"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={reset} disabled={isUploading}>
                Batal
              </Button>
              <Button onClick={handleUpload} disabled={isUploading} className="shadow-glow-primary gap-2">
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Mengunggah {progress}%
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" /> Mulai upload
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoUploadComponent;
