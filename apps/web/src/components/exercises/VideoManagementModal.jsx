import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import VideoUploadComponent from './VideoUploadComponent.jsx';
import VideoPlayerComponent from './VideoPlayerComponent.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import {
  formatDuration,
  thumbnailForUrl,
  validateVideoUrl,
} from '@/lib/videoUpload.js';
import { toast } from 'sonner';
import { AlertCircle, Check, FileVideo, Link2, Loader2, Trash2, Upload, Library } from 'lucide-react';

const TABS = { UPLOAD: 'upload', LINK: 'link', LIBRARY: 'library' };

/**
 * Satu pintu untuk semua cara memasang video ke sebuah latihan:
 *   1. Upload file  -> POST /exercises/:id/video (multipart, dengan progress)
 *   2. Tempel tautan -> POST /exercises/:id/video (JSON)
 *   3. Pilih dari pustaka -> POST /exercises/:id/video (JSON, URL dari /videos)
 *
 * Ketiganya berakhir di tempat yang sama: `exercise.video_url` terisi dan
 * kartu latihan langsung memakainya. Sebelumnya modal ini meneruskan prop yang
 * tidak dikenali ke pemilih berkas, sehingga tidak ada satu pun jalur yang jalan.
 */
const VideoManagementModal = ({ isOpen, onClose, exercise, onUpdate }) => {
  const [tab, setTab] = useState(TABS.UPLOAD);
  const [selection, setSelection] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saveToLibrary, setSaveToLibrary] = useState(true);

  const [linkUrl, setLinkUrl] = useState('');
  const [linkError, setLinkError] = useState(null);

  const [libraryVideos, setLibraryVideos] = useState([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
  const [selectedLibraryVideo, setSelectedLibraryVideo] = useState(null);

  const uploadRef = useRef(null);

  const existingVideoUrl = exercise?.video_url || null;

  // Setiap kali modal dibuka untuk latihan lain, mulai dari keadaan bersih.
  useEffect(() => {
    if (!isOpen) return;
    setTab(TABS.UPLOAD);
    setSelection(null);
    setProgress(0);
    setIsBusy(false);
    setSaveToLibrary(true);
    setLinkUrl('');
    setLinkError(null);
    setSelectedLibraryVideo(null);
  }, [isOpen, exercise?.id]);

  useEffect(() => {
    if (!isOpen || tab !== TABS.LIBRARY || libraryVideos.length > 0) return;

    let cancelled = false;
    setIsLoadingLibrary(true);
    apiServerClient
      .fetch('/videos')
      .then((data) => {
        if (!cancelled) setLibraryVideos(Array.isArray(data) ? data : data?.data || []);
      })
      .catch((error) => {
        console.error('Error loading video library:', error);
        if (!cancelled) toast.error('Gagal memuat pustaka video');
      })
      .finally(() => {
        if (!cancelled) setIsLoadingLibrary(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, tab, libraryVideos.length]);

  const applyUpdate = (updatedExercise, message) => {
    toast.success(message);
    onUpdate?.(updatedExercise);
    onClose();
  };

  const describeError = (error) => {
    if (error?.aborted) return;
    console.error('Video operation failed:', error);
    toast.error(error?.message || 'Gagal menyimpan video');
  };

  const handleUpload = async () => {
    if (!selection || !exercise?.id) return;

    const form = new FormData();
    form.append('video_file', selection.file);
    form.append('name', exercise.name || selection.file.name);
    form.append('duration', String(selection.duration || 0));
    form.append('add_to_library', String(saveToLibrary));
    if (selection.thumbnailBlob) {
      form.append('thumbnail_file', selection.thumbnailBlob, 'thumbnail.jpg');
    }

    setIsBusy(true);
    setProgress(0);
    const request = apiServerClient.upload(`/exercises/${exercise.id}/video`, form, {
      onProgress: setProgress,
    });
    uploadRef.current = request;

    try {
      const updated = await request.promise;
      applyUpdate(updated, 'Video berhasil diunggah dan dipasang ke latihan');
    } catch (error) {
      describeError(error);
    } finally {
      uploadRef.current = null;
      setIsBusy(false);
    }
  };

  const linkVideoUrl = async (videoUrl, thumbnailUrl, message) => {
    if (!exercise?.id) return;
    setIsBusy(true);
    try {
      const updated = await apiServerClient.fetch(`/exercises/${exercise.id}/video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video_url: videoUrl, thumbnail_url: thumbnailUrl || null }),
      });
      applyUpdate(updated, message);
    } catch (error) {
      describeError(error);
    } finally {
      setIsBusy(false);
    }
  };

  const handleLinkSubmit = () => {
    const error = validateVideoUrl(linkUrl);
    setLinkError(error);
    if (error) return;
    const clean = linkUrl.trim();
    linkVideoUrl(clean, thumbnailForUrl(clean), 'Tautan video tersimpan');
  };

  const handleLibrarySubmit = () => {
    if (!selectedLibraryVideo) return;
    linkVideoUrl(
      selectedLibraryVideo.video_url,
      selectedLibraryVideo.thumbnail_url,
      `"${selectedLibraryVideo.name}" dipasang ke latihan`,
    );
  };

  const handleRemoveVideo = async () => {
    if (!exercise?.id) return;
    if (!window.confirm('Hapus video dari latihan ini?')) return;

    setIsBusy(true);
    try {
      const updated = await apiServerClient.fetch(`/exercises/${exercise.id}/video`, { method: 'DELETE' });
      toast.success('Video dilepas dari latihan');
      onUpdate?.(updated);
    } catch (error) {
      describeError(error);
    } finally {
      setIsBusy(false);
    }
  };

  const handleClose = () => {
    if (isBusy) return;
    onClose();
  };

  const usableLibraryVideos = useMemo(
    () => libraryVideos.filter((v) => v.video_url),
    [libraryVideos],
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Video latihan</DialogTitle>
          <DialogDescription>
            Pasang video peragaan untuk <span className="font-medium text-foreground">{exercise?.name}</span>.
            Video yang tersimpan langsung tampil di kartu latihan dan di halaman pasien.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {existingVideoUrl && (
            <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-sm font-semibold text-foreground">Video saat ini</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveVideo}
                  disabled={isBusy}
                  className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" /> Lepas video
                </Button>
              </div>
              <VideoPlayerComponent
                videoUrl={existingVideoUrl}
                thumbnailUrl={exercise?.thumbnail_url}
                title={exercise?.name}
              />
              <p className="text-xs text-muted-foreground">
                Mengunggah atau memilih video baru di bawah akan menggantikan video ini.
              </p>
            </div>
          )}

          <Tabs value={tab} onValueChange={(next) => !isBusy && setTab(next)}>
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value={TABS.UPLOAD} className="gap-2 py-2">
                <Upload className="w-4 h-4" /> Upload file
              </TabsTrigger>
              <TabsTrigger value={TABS.LINK} className="gap-2 py-2">
                <Link2 className="w-4 h-4" /> Tautan
              </TabsTrigger>
              <TabsTrigger value={TABS.LIBRARY} className="gap-2 py-2">
                <Library className="w-4 h-4" /> Pustaka
              </TabsTrigger>
            </TabsList>

            <TabsContent value={TABS.UPLOAD} className="space-y-4 pt-3">
              <VideoUploadComponent
                onFileSelect={setSelection}
                isUploading={isBusy}
                uploadProgress={progress}
                onCancelUpload={() => uploadRef.current?.abort()}
              />

              {selection && (
                <>
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="save-to-library"
                      checked={saveToLibrary}
                      disabled={isBusy}
                      onCheckedChange={(checked) => setSaveToLibrary(checked === true)}
                    />
                    <Label htmlFor="save-to-library" className="text-xs font-normal leading-snug text-muted-foreground">
                      Simpan juga ke pustaka video, supaya bisa dipakai ulang di latihan lain.
                    </Label>
                  </div>

                  <Button onClick={handleUpload} disabled={isBusy} className="w-full gap-2">
                    {isBusy ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Mengunggah {progress}%
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" /> Unggah &amp; pasang ke latihan
                      </>
                    )}
                  </Button>
                </>
              )}
            </TabsContent>

            <TabsContent value={TABS.LINK} className="space-y-3 pt-3">
              <div className="space-y-2">
                <Label htmlFor="video-link">Tautan video</Label>
                <Input
                  id="video-link"
                  value={linkUrl}
                  disabled={isBusy}
                  onChange={(e) => {
                    setLinkUrl(e.target.value);
                    setLinkError(null);
                  }}
                  placeholder="https://youtube.com/watch?v=... atau https://.../video.mp4"
                />
                <p className="text-xs text-muted-foreground">
                  Mendukung YouTube dan tautan langsung MP4/WebM/MOV. Thumbnail YouTube diisi otomatis.
                </p>
                {linkError && (
                  <p className="flex items-start gap-2 text-xs text-destructive">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-px" /> {linkError}
                  </p>
                )}
              </div>

              {linkUrl.trim() && !linkError && (
                <VideoPlayerComponent videoUrl={linkUrl.trim()} title="Pratinjau" />
              )}

              <Button onClick={handleLinkSubmit} disabled={isBusy || !linkUrl.trim()} className="w-full gap-2">
                {isBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />}
                Simpan tautan
              </Button>
            </TabsContent>

            <TabsContent value={TABS.LIBRARY} className="space-y-3 pt-3">
              {isLoadingLibrary ? (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                  <Loader2 className="w-6 h-6 animate-spin mb-2" />
                  <p className="text-sm">Memuat pustaka video...</p>
                </div>
              ) : usableLibraryVideos.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-1">
                    {usableLibraryVideos.map((video) => {
                      const isSelected = selectedLibraryVideo?.id === video.id;
                      return (
                        <button
                          type="button"
                          key={video.id}
                          onClick={() => setSelectedLibraryVideo(video)}
                          className={`group relative aspect-video rounded-xl overflow-hidden border text-left transition-all ${
                            isSelected ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-primary/60'
                          } bg-secondary/10`}
                        >
                          {video.thumbnail_url ? (
                            <img src={video.thumbnail_url} alt={video.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FileVideo className="w-8 h-8 text-muted-foreground/30" />
                            </div>
                          )}

                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground p-1 rounded-full shadow">
                              <Check className="w-3 h-3" />
                            </div>
                          )}

                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                            <p className="text-[10px] text-white truncate font-medium">{video.name}</p>
                            {video.duration > 0 && (
                              <p className="text-[10px] text-white/70">{formatDuration(video.duration)}</p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    onClick={handleLibrarySubmit}
                    disabled={isBusy || !selectedLibraryVideo}
                    className="w-full gap-2"
                  >
                    {isBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    Pasang video terpilih
                  </Button>
                </>
              ) : (
                <div className="text-center py-10 bg-muted/30 rounded-xl border border-dashed">
                  <FileVideo className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Pustaka video masih kosong. Unggah lewat tab &ldquo;Upload file&rdquo; terlebih dahulu.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isBusy}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoManagementModal;
