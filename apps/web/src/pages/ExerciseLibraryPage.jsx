
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Play, Plus, Dumbbell, Edit2, Trash2, Eye, BookOpen, ShieldAlert, TrendingUp, X, Video, VideoOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import AddExerciseModal from '@/components/exercises/AddExerciseModal.jsx';
import EditExerciseModal from '@/components/exercises/EditExerciseModal.jsx';
import DeleteExerciseConfirmation from '@/components/exercises/DeleteExerciseConfirmation.jsx';
import VideoManagementModal from '@/components/exercises/VideoManagementModal.jsx';
import Modal from '@/components/Modal.jsx';
import VideoPlayerComponent from '@/components/exercises/VideoPlayerComponent.jsx';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const ALL = 'all';

// Builds the option list for a filter from whatever the library actually
// contains, so clinic-added exercises show up in the filters too.
const optionsFor = (exercises, key) =>
  [...new Set(exercises.map(e => e[key]).filter(Boolean))].sort((a, b) => a.localeCompare(b));

export default function ExerciseLibraryPage() {
  const { currentUser } = useAuth();
  const { t } = useTranslation();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [bodyRegion, setBodyRegion] = useState(ALL);
  const [category, setCategory] = useState(ALL);
  const [difficulty, setDifficulty] = useState(ALL);
  const [source, setSource] = useState(ALL);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [deletingExercise, setDeletingExercise] = useState(null);
  const [previewExercise, setPreviewExercise] = useState(null);
  const [videoExercise, setVideoExercise] = useState(null);

  const fetchExercises = useCallback(async () => {
    if (!currentUser) return;
    try {
      const data = await apiServerClient.fetch('/exercises');
      // Memastikan data adalah array, atau mengambil dari properti data jika dibungkus
      setExercises(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  const regions = useMemo(() => optionsFor(exercises, 'body_region'), [exercises]);
  const categories = useMemo(() => optionsFor(exercises, 'category'), [exercises]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return exercises.filter(e => {
      const haystack = [e.name, e.name_id, e.description, e.target_muscles, ...(e.tags || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (term && !haystack.includes(term)) return false;
      if (bodyRegion !== ALL && e.body_region !== bodyRegion) return false;
      if (category !== ALL && e.category !== category) return false;
      if (difficulty !== ALL && e.difficulty !== difficulty) return false;
      if (source === 'library' && e.clinic_id) return false;
      if (source === 'clinic' && !e.clinic_id) return false;
      return true;
    });
  }, [exercises, search, bodyRegion, category, difficulty, source]);

  const hasFilters = search || bodyRegion !== ALL || category !== ALL || difficulty !== ALL || source !== ALL;
  const resetFilters = () => {
    setSearch('');
    setBodyRegion(ALL);
    setCategory(ALL);
    setDifficulty(ALL);
    setSource(ALL);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Helmet>
        <title>{t('nav.library')} - Physiome</title>
      </Helmet>

      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">{t('nav.library')}</h1>
                <p className="text-muted-foreground mt-1">
                  {loading
                    ? 'Browse and manage therapeutic exercise content.'
                    : `${filtered.length} dari ${exercises.length} latihan — instruksi, dosis, dan sumber bukti siap diresepkan.`}
                </p>
              </div>
              <Button className="rounded-full shadow-glow-primary shrink-0" onClick={() => setIsAddOpen(true)}>
                <Plus className="w-4 h-4 mr-2" /> {t('common.add') || 'Add Exercise'}
              </Button>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border shadow-sm space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t('common.search') || 'Cari nama latihan, otot target, atau kondisi...'}
                  className="pl-9 bg-background border-border"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Select value={bodyRegion} onValueChange={setBodyRegion}>
                  <SelectTrigger><SelectValue placeholder="Area tubuh" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>Semua area tubuh</SelectItem>
                    {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Kategori" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>Semua kategori</SelectItem>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger><SelectValue placeholder="Tingkat" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>Semua tingkat</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={source} onValueChange={setSource}>
                  <SelectTrigger><SelectValue placeholder="Sumber" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>Semua sumber</SelectItem>
                    <SelectItem value="library">Library Physiome</SelectItem>
                    <SelectItem value="clinic">Milik klinik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {hasFilters && (
                <Button variant="ghost" size="sm" className="rounded-md" onClick={resetFilters}>
                  <X className="w-4 h-4 mr-2" /> Hapus filter
                </Button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1,2,3,4,5,6,7,8].map(i => (
                  <Card key={i} className="border-0 shadow-soft overflow-hidden">
                    <Skeleton className="h-48 w-full rounded-none" />
                    <CardContent className="p-5 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex gap-2 pt-2"><Skeleton className="h-6 w-16 rounded-full" /><Skeleton className="h-6 w-16 rounded-full" /></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map(ex => (
                  <Card key={ex.id} className="border border-border shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col bg-card">
                    <div className="relative aspect-video bg-muted">
                      {ex.thumbnail_url || ex.gif_url ? (
                        <img src={ex.thumbnail_url || ex.gif_url} alt={ex.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary/5 text-muted-foreground">
                          <Play className="w-12 h-12 opacity-20" />
                        </div>
                      )}

                      {/* Play Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="rounded-full w-12 h-12 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300"
                          onClick={() => setPreviewExercise(ex)}
                        >
                          <Play className="w-6 h-6 ml-1 text-foreground" />
                        </Button>
                      </div>

                      <div className="absolute top-3 right-3">
                        <div className="flex gap-2">
                          <button onClick={() => setPreviewExercise(ex)} className="w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white transition-colors" title="Preview">
                            <Eye className="w-4 h-4" />
                          </button>
                          {/* Global library rows (no clinic_id) are read-only for clinics - only super_admin may edit them. */}
                          {(ex.clinic_id || currentUser?.role === 'super_admin') && (
                            <>
                              <button
                                onClick={() => setVideoExercise(ex)}
                                className={`w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center transition-colors hover:bg-white ${
                                  ex.video_url ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                                }`}
                                title={ex.video_url ? 'Kelola video latihan' : 'Upload video latihan'}
                              >
                                <Video className="w-4 h-4" />
                              </button>
                              <button onClick={() => setEditingExercise(ex)} className="w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white transition-colors" title="Edit">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => setDeletingExercise(ex)} className="w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-white transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {!ex.clinic_id && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary/90 text-primary-foreground border-0 gap-1">
                            <BookOpen className="w-3 h-3" /> Library
                          </Badge>
                        </div>
                      )}

                      {/* Status video dibuat terlihat: tanpa ini tidak ada cara
                          tahu apakah upload tadi benar-benar tersimpan. */}
                      <div className="absolute bottom-3 left-3">
                        {ex.video_url ? (
                          <Badge className="bg-black/70 text-white border-0 gap-1 backdrop-blur-sm">
                            <Video className="w-3 h-3" /> Ada video
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-white/80 text-muted-foreground border-border gap-1 backdrop-blur-sm">
                            <VideoOff className="w-3 h-3" /> Belum ada video
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-lg mb-0.5 truncate text-foreground">{ex.name}</h3>
                      {ex.name_id && <p className="text-xs text-muted-foreground truncate mb-1">{ex.name_id}</p>}
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3 h-10">
                        {ex.description || 'No description provided.'}
                      </p>

                      {(ex.default_sets || ex.default_reps || ex.default_hold_seconds) && (
                        <p className="text-xs font-medium text-foreground mb-3">
                          {[
                            ex.default_sets && `${ex.default_sets} set`,
                            ex.default_reps > 1 && `${ex.default_reps} repetisi`,
                            ex.default_hold_seconds > 0 && `tahan ${ex.default_hold_seconds}s`,
                            ex.default_frequency,
                          ].filter(Boolean).join(' · ')}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {ex.body_region && <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-0">{ex.body_region}</Badge>}
                        {ex.difficulty && <Badge variant="outline" className="border-border text-muted-foreground">{ex.difficulty}</Badge>}
                        {ex.movement_type && <Badge variant="outline" className="border-border text-muted-foreground">{ex.movement_type}</Badge>}
                        {ex.evidence_level && (
                          <Badge variant="outline" className="border-primary/30 text-primary" title={ex.evidence_source || ''}>
                            Bukti {ex.evidence_level}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-card rounded-2xl border border-dashed border-border">
                <Dumbbell className="w-16 h-16 mb-4 opacity-20" />
                <h3 className="text-xl font-bold text-foreground mb-2">{t('common.noData') || 'No exercises found'}</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            )}
          </div>

        </main>
      </div>

      {/* Modal Components */}
      <AddExerciseModal 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
        onSuccess={fetchExercises} 
      />
      
      {editingExercise && (
        <EditExerciseModal 
          isOpen={!!editingExercise} 
          onClose={() => setEditingExercise(null)} 
          onSuccess={fetchExercises} 
          exercise={editingExercise} 
        />
      )}
      
      {deletingExercise && (
        <DeleteExerciseConfirmation
          isOpen={!!deletingExercise}
          onClose={() => setDeletingExercise(null)}
          onSuccess={fetchExercises}
          exercise={deletingExercise}
        />
      )}

      {videoExercise && (
        <VideoManagementModal
          isOpen={!!videoExercise}
          onClose={() => setVideoExercise(null)}
          exercise={videoExercise}
          onUpdate={(updated) => {
            if (!updated?.id) return fetchExercises();
            // Perbarui di tempat supaya kartu langsung memantulkan hasilnya —
            // termasuk saat modal tetap terbuka setelah video dilepas.
            setExercises(prev => prev.map(e => (e.id === updated.id ? { ...e, ...updated } : e)));
            setVideoExercise(prev => (prev && prev.id === updated.id ? { ...prev, ...updated } : prev));
          }}
        />
      )}

      {previewExercise && (
        <Modal
          isOpen={!!previewExercise}
          onClose={() => setPreviewExercise(null)}
          title={previewExercise.name}
          size="xl"
        >
          <div className="space-y-6">
            {(previewExercise.video_url || previewExercise.thumbnail_url) && (
              <VideoPlayerComponent
                videoUrl={previewExercise.video_url}
                thumbnailUrl={previewExercise.thumbnail_url}
                title={previewExercise.name}
              />
            )}

            <div className="flex flex-wrap gap-2">
              {previewExercise.body_region && <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">{previewExercise.body_region}</Badge>}
              {previewExercise.difficulty && <Badge variant="outline">{previewExercise.difficulty}</Badge>}
              {previewExercise.movement_type && <Badge variant="outline">{previewExercise.movement_type}</Badge>}
              {previewExercise.starting_position && <Badge variant="outline">Posisi: {previewExercise.starting_position}</Badge>}
            </div>

            {(previewExercise.default_sets || previewExercise.default_frequency) && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  ['Set', previewExercise.default_sets],
                  ['Repetisi', previewExercise.default_reps],
                  ['Tahan', previewExercise.default_hold_seconds > 0 ? `${previewExercise.default_hold_seconds}s` : null],
                  ['Frekuensi', previewExercise.default_frequency],
                ].filter(([, value]) => value).map(([label, value]) => (
                  <div key={label} className="bg-muted/40 rounded-xl p-3 border border-border/50">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
                    <p className="text-foreground font-semibold mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {previewExercise.target_muscles && (
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Otot target: </span>{previewExercise.target_muscles}
              </p>
            )}

            {previewExercise.equipment_needed?.length > 0 && (
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Alat: </span>{previewExercise.equipment_needed.join(', ')}
              </p>
            )}

            {previewExercise.instructions && (
              <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" />
                  Cara melakukan
                </h4>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{previewExercise.instructions}</p>
              </div>
            )}

            {previewExercise.contraindications && (
              <div className="bg-destructive/5 p-5 rounded-2xl border border-destructive/20">
                <h4 className="text-xs font-bold uppercase tracking-widest text-destructive mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  Perhatian &amp; kontraindikasi
                </h4>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{previewExercise.contraindications}</p>
              </div>
            )}

            {previewExercise.progression_tips && (
              <div className="bg-primary/5 p-5 rounded-2xl border border-primary/20">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Progresi
                </h4>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{previewExercise.progression_tips}</p>
              </div>
            )}

            {previewExercise.evidence_source && (
              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Sumber bukti{previewExercise.evidence_level ? ` (tingkat ${previewExercise.evidence_level})` : ''}: </span>
                  {previewExercise.evidence_source}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
