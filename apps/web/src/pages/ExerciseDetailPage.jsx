
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Button from '@/components/Button.jsx';
import DifficultyBadge from '@/components/exercises/DifficultyBadge.jsx';
import VideoPlayerComponent from '@/components/exercises/VideoPlayerComponent.jsx';
import ExerciseDemoPhotos from '@/components/exercises/ExerciseDemoPhotos.jsx';
import { exerciseCoverImage, hasDemoPhotos } from '@/lib/exerciseMedia.js';
import VideoManagementModal from '@/components/exercises/VideoManagementModal.jsx';
import { ArrowLeft, Plus, Activity, Info, AlertTriangle, ArrowUpCircle, Video } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';

const ExerciseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [exercise, setExercise] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const record = await apiServerClient.fetch(`/exercises/${id}`);
        setExercise(record);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchExercise();
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }
  if (!exercise) return null;

  const isTherapistOrAdmin = ['admin', 'therapist'].includes(currentUser?.role);
  const videoUrl = exercise.video_url || null;

  return (
    <>
      <Helmet><title>{exercise.name} | Physiome</title></Helmet>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <div className="w-full h-[30vh] min-h-[250px] relative bg-muted">
              <img
                src={exerciseCoverImage(exercise) || 'https://images.unsplash.com/photo-1623200216581-969d9479cf7d'}
                alt={exercise.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 max-w-7xl mx-auto">
                <button onClick={() => navigate('/exercises')} className="flex items-center gap-2 text-sm text-foreground hover:text-primary mb-4 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to Library
                </button>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl md:text-4xl font-bold text-foreground">{exercise.name}</h1>
                      <DifficultyBadge level={exercise.difficulty} className="text-sm px-3 py-1" />
                    </div>
                    <p className="text-lg text-muted-foreground flex items-center gap-2">
                      <Activity className="w-5 h-5" /> {exercise.body_region} • {exercise.category}
                    </p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    {isTherapistOrAdmin && (
                      <Button variant="secondary" onClick={() => setIsVideoModalOpen(true)} className="gap-2 bg-secondary/80 hover:bg-secondary text-secondary-foreground">
                        <Video className="w-4 h-4" /> Manage Video
                      </Button>
                    )}
                    {isTherapistOrAdmin && (
                      <Button className="gap-2">
                        <Plus className="w-4 h-4" /> Add to Program
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
              
              {/* Video kalau ada; kalau belum, foto peragaan yang mengambil
                  alih supaya halaman ini tidak pernah tanpa peragaan. */}
              {videoUrl ? (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Demonstration Video</h3>
                  <VideoPlayerComponent
                    videoUrl={videoUrl}
                    thumbnailUrl={exercise.thumbnail_url}
                    title={exercise.name}
                  />
                </div>
              ) : null}

              {hasDemoPhotos(exercise) && (
                <div className="mb-8 bg-card p-5 rounded-xl border border-border shadow-sm">
                  <ExerciseDemoPhotos exercise={exercise} columns={4} />
                </div>
              )}

              <div className="flex border-b border-border mb-6 overflow-x-auto hide-scrollbar">
                {['overview', 'instructions', 'contraindications', 'progression'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {activeTab === 'overview' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                      <section>
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2"><Info className="w-5 h-5 text-primary"/> Description</h3>
                        <p className="text-foreground leading-relaxed bg-card p-5 rounded-xl border border-border shadow-sm">{exercise.description || 'No description provided.'}</p>
                      </section>
                      <section>
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2"><Activity className="w-5 h-5 text-primary"/> Target Muscles</h3>
                        <p className="text-foreground bg-card p-5 rounded-xl border border-border shadow-sm">{exercise.target_muscles || 'Not specified'}</p>
                      </section>
                    </div>
                  )}

                  {activeTab === 'instructions' && (
                    <section className="animate-in fade-in slide-in-from-bottom-2">
                      <h3 className="text-xl font-semibold mb-4">Movement Instructions</h3>
                      <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none whitespace-pre-wrap">
                          {exercise.instructions || 'No detailed instructions provided.'}
                        </div>
                      </div>
                    </section>
                  )}

                  {activeTab === 'contraindications' && (
                    <section className="animate-in fade-in slide-in-from-bottom-2">
                      <h3 className="text-xl font-semibold mb-4 text-destructive flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> Contraindications & Warnings
                      </h3>
                      <div className="bg-destructive/10 text-destructive-foreground p-6 rounded-xl border border-destructive/20 shadow-sm">
                        <p className="whitespace-pre-wrap">{exercise.contraindications || 'No contraindications recorded. Apply general clinical reasoning.'}</p>
                      </div>
                    </section>
                  )}

                  {activeTab === 'progression' && (
                    <section className="animate-in fade-in slide-in-from-bottom-2">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <ArrowUpCircle className="w-5 h-5 text-primary" /> Progression Tips
                      </h3>
                      <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <p className="text-foreground whitespace-pre-wrap">{exercise.progression_tips || 'No progression tips available.'}</p>
                      </div>
                    </section>
                  )}
                </div>

                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-muted/50 rounded-xl p-6 border border-border">
                    <h3 className="font-semibold text-lg mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div><p className="text-sm text-muted-foreground">Difficulty</p><p className="font-medium text-foreground">{exercise.difficulty}</p></div>
                      <div><p className="text-sm text-muted-foreground">Region</p><p className="font-medium text-foreground">{exercise.body_region}</p></div>
                      <div><p className="text-sm text-muted-foreground">Category</p><p className="font-medium text-foreground">{exercise.category}</p></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <VideoManagementModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        exercise={exercise}
        onUpdate={(updated) => setExercise(updated)}
      />
    </>
  );
};

export default ExerciseDetailPage;
