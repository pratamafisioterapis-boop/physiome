
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Play, Plus, Dumbbell, Edit2, Trash2 } from 'lucide-react';
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

export default function ExerciseLibraryPage() {
  const { currentUser } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [deletingExercise, setDeletingExercise] = useState(null);

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
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header title="Exercise Library" />
        <main className="flex-1 p-8">
          
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search exercises..." 
                className="pl-9 bg-card border-border/50 rounded-full h-11"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full">
                <Filter className="w-4 h-4 mr-2" /> Filters
              </Button>
              <Button className="rounded-full shadow-glow-primary" onClick={() => setIsAddOpen(true)}>
                <Plus className="w-4 h-4 mr-2" /> Add Exercise
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1,2,3,4,5,6].map(i => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(ex => (
                <Card key={ex.id} className="border-0 shadow-soft overflow-hidden group hover:shadow-soft-lg transition-all duration-300">
                  <div className="relative h-48 bg-muted">
                    {ex.thumbnail_url || ex.gif_url ? (
                      <img src={ex.thumbnail_url || ex.gif_url} alt={ex.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary/5 text-muted-foreground">
                        <Play className="w-12 h-12 opacity-20" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <div className="flex gap-2">
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
                      {ex.body_region && <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">{ex.body_region}</Badge>}
                      {ex.difficulty && <Badge variant="outline" className="border-border text-muted-foreground">{ex.difficulty}</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Dumbbell className="w-16 h-16 mb-4 opacity-20" />
              <h3 className="text-xl font-bold text-foreground mb-2">No exercises found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}

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
    </div>
  );
}
