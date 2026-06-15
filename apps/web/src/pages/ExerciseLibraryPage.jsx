
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Play, Plus, Dumbbell, Edit2, Trash2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import AddExerciseModal from '@/components/exercises/AddExerciseModal.jsx';
import EditExerciseModal from '@/components/exercises/EditExerciseModal.jsx';
import DeleteExerciseConfirmation from '@/components/exercises/DeleteExerciseConfirmation.jsx';
import Modal from '@/components/Modal.jsx';
import VideoPlayerComponent from '@/components/exercises/VideoPlayerComponent.jsx';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

export default function ExerciseLibraryPage() {
  const { currentUser } = useAuth();
  const { t } = useTranslation();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [deletingExercise, setDeletingExercise] = useState(null);
  const [previewExercise, setPreviewExercise] = useState(null);

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

  const filtered = exercises.filter(e => 
    e.name?.toLowerCase().includes(search.toLowerCase()) || 
    e.description?.toLowerCase().includes(search.toLowerCase())
  );

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
                <p className="text-muted-foreground mt-1">Browse and manage therapeutic exercise content.</p>
              </div>
              <Button className="rounded-full shadow-glow-primary shrink-0" onClick={() => setIsAddOpen(true)}>
                <Plus className="w-4 h-4 mr-2" /> {t('common.add') || 'Add Exercise'}
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder={t('common.search') || "Search exercises..."} 
                  className="pl-9 bg-background border-border"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" className="rounded-md">
                <Filter className="w-4 h-4 mr-2" /> {t('common.filters') || 'Filters'}
              </Button>
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
                          <button onClick={() => setEditingExercise(ex)} className="w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeletingExercise(ex)} className="w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-white transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-lg mb-1 truncate text-foreground">{ex.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                        {ex.description || 'No description provided.'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {ex.body_region && <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-0">{ex.body_region}</Badge>}
                        {ex.difficulty && <Badge variant="outline" className="border-border text-muted-foreground">{ex.difficulty}</Badge>}
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

      {previewExercise && (
        <Modal
          isOpen={!!previewExercise}
          onClose={() => setPreviewExercise(null)}
          title={previewExercise.name}
          size="xl"
        >
          <div className="space-y-6">
            <VideoPlayerComponent 
              videoUrl={previewExercise.video_url} 
              thumbnailUrl={previewExercise.thumbnail_url} 
              title={previewExercise.name} 
            />
            
            {previewExercise.instructions && (
              <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" />
                  Instructions
                </h4>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{previewExercise.instructions}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
