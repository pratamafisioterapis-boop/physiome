import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import apiServerClient from '@/lib/apiServerClient.js';
import { demoPhotosOf } from '@/lib/exerciseMedia.js';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Camera, ImagePlus, Loader2, Save, Trash2 } from 'lucide-react';

const MAX_PHOTOS = 12;
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Kelola foto peragaan sebuah latihan.
 *
 * Foto diunggah satu per satu supaya progress bar-nya jujur (satu request =
 * satu berkas), lalu urutan/keterangan/penghapusan dikirim sebagai satu daftar
 * utuh lewat PUT. Memisahkan keduanya membuat "urutkan ulang lalu simpan" tidak
 * pernah mengunggah ulang berkas yang sudah ada di storage.
 *
 * Urutan foto = urutan langkah pada instruksi latihan.
 */
const DemoPhotoManagerModal = ({ isOpen, onClose, exercise, onUpdate }) => {
  const [photos, setPhotos] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [upload, setUpload] = useState(null); // { index, total, percent }
  const fileRef = useRef(null);
  const uploadRef = useRef(null);

  const stored = useMemo(() => demoPhotosOf(exercise), [exercise]);

  useEffect(() => {
    if (!isOpen) return;
    setPhotos(stored.map((photo) => ({ ...photo })));
    setUpload(null);
    setIsSaving(false);
  }, [isOpen, exercise?.id, stored]);

  const isBusy = isSaving || upload !== null;

  // Instruksi latihan sudah bernomor; tawarkan barisnya sebagai keterangan
  // supaya foto dan langkah tertulis tidak jadi dua cerita berbeda.
  const instructionSteps = useMemo(() => {
    const raw = String(exercise?.instructions || '');
    return raw
      .split('\n')
      .map((line) => line.replace(/^\s*\d+[.)]\s*/, '').trim())
      .filter(Boolean);
  }, [exercise?.instructions]);

  const describeError = (error) => {
    if (error?.aborted) return;
    console.error('Demo photo operation failed:', error);
    toast.error(error?.message || 'Gagal menyimpan foto peragaan');
  };

  const applyUpdate = (updated) => {
    if (!updated) return;
    onUpdate?.(updated);
    setPhotos(demoPhotosOf(updated).map((photo) => ({ ...photo })));
  };

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length || !exercise?.id) return;

    const rejected = files.filter((f) => !ACCEPTED.includes(f.type) || f.size > MAX_BYTES);
    const accepted = files.filter((f) => ACCEPTED.includes(f.type) && f.size <= MAX_BYTES);

    if (rejected.length) {
      toast.error(`${rejected.length} berkas dilewati — hanya JPG/PNG/WebP maksimal 10 MB.`);
    }
    if (!accepted.length) return;

    if (photos.length + accepted.length > MAX_PHOTOS) {
      toast.error(`Maksimal ${MAX_PHOTOS} foto per latihan.`);
      return;
    }

    let latest = null;
    for (const [i, file] of accepted.entries()) {
      const form = new FormData();
      form.append('photo', file);
      // Keterangan default mengikuti langkah instruksi pada posisi yang sama.
      form.append('caption', instructionSteps[photos.length + i] || '');

      setUpload({ index: i + 1, total: accepted.length, percent: 0 });
      const request = apiServerClient.upload(`/exercises/${exercise.id}/demo-photos`, form, {
        onProgress: (percent) => setUpload((prev) => (prev ? { ...prev, percent } : prev)),
      });
      uploadRef.current = request;

      try {
        latest = await request.promise;
      } catch (error) {
        describeError(error);
        break;
      } finally {
        uploadRef.current = null;
      }
    }

    setUpload(null);
    if (latest) {
      applyUpdate(latest);
      toast.success('Foto peragaan terunggah');
    }
  };

  const setCaption = (index, value) => {
    setPhotos((prev) => prev.map((photo, i) => (i === index ? { ...photo, caption: value } : photo)));
  };

  const movePhoto = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= photos.length) return;
    setPhotos((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const save = async () => {
    if (!exercise?.id) return;
    setIsSaving(true);
    try {
      const updated = await apiServerClient.fetch(`/exercises/${exercise.id}/demo-photos`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos }),
      });
      applyUpdate(updated);
      toast.success('Foto peragaan tersimpan');
      onClose();
    } catch (error) {
      describeError(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (isBusy) return;
    onClose();
  };

  const isDirty =
    photos.length !== stored.length ||
    photos.some((photo, i) => photo.url !== stored[i]?.url || (photo.caption || '') !== (stored[i]?.caption || ''));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" /> Foto peragaan
          </DialogTitle>
          <DialogDescription>
            Foto langkah demi langkah untuk <span className="font-medium text-foreground">{exercise?.name}</span>.
            Urutan foto mengikuti urutan langkah pada instruksi, dan foto pertama dipakai sebagai gambar kartu
            selama latihan ini belum punya video.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <input
            ref={fileRef}
            type="file"
            accept={ACCEPTED.join(',')}
            multiple
            hidden
            onChange={(e) => {
              handleFiles(e.target.files);
              e.target.value = '';
            }}
          />

          {upload ? (
            <div className="space-y-2 rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Mengunggah foto {upload.index} dari {upload.total} — {upload.percent}%
              </p>
              <Progress value={upload.percent} />
              <Button variant="ghost" size="sm" onClick={() => uploadRef.current?.abort()}>
                Batalkan
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={isBusy || photos.length >= MAX_PHOTOS}
              className="w-full rounded-xl border-2 border-dashed border-border bg-muted/20 p-6 text-center transition-colors hover:border-primary/60 hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ImagePlus className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
              <p className="text-sm font-medium text-foreground">
                {photos.length >= MAX_PHOTOS ? `Sudah mencapai batas ${MAX_PHOTOS} foto` : 'Pilih foto peragaan'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG atau WebP — maksimal 10 MB per foto. Bisa pilih beberapa sekaligus.
              </p>
            </button>
          )}

          {photos.length > 0 ? (
            <ol className="space-y-3">
              {photos.map((photo, index) => (
                <li
                  key={`${photo.url}-${index}`}
                  className="flex gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <div className="relative w-28 shrink-0">
                    <img
                      src={photo.url}
                      alt={`Langkah ${index + 1}`}
                      className="w-28 h-24 rounded-lg object-cover border border-border"
                    />
                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <Textarea
                      value={photo.caption || ''}
                      onChange={(e) => setCaption(index, e.target.value)}
                      disabled={isBusy}
                      rows={2}
                      placeholder={instructionSteps[index] || `Keterangan langkah ${index + 1}`}
                      className="text-sm resize-none"
                    />
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        disabled={isBusy || index === 0}
                        onClick={() => movePhoto(index, -1)}
                        title="Geser ke langkah sebelumnya"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        disabled={isBusy || index === photos.length - 1}
                        onClick={() => movePhoto(index, 1)}
                        title="Geser ke langkah berikutnya"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={isBusy}
                        onClick={() => removePhoto(index)}
                        className="ml-auto gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" /> Hapus
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Belum ada foto peragaan. Latihan ini masih menampilkan ikon kosong di kartu.
            </p>
          )}

          {isDirty && photos.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Perubahan urutan, keterangan, dan penghapusan baru tersimpan setelah menekan
              &ldquo;Simpan perubahan&rdquo;.
            </p>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isBusy}>
            Tutup
          </Button>
          <Button onClick={save} disabled={isBusy || !isDirty} className="gap-2">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DemoPhotoManagerModal;
