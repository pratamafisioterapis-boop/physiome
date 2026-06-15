
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, PlayCircle, Clock, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoPlayerComponent from '@/components/exercises/VideoPlayerComponent.jsx';
import FullscreenTimerMode from '@/components/timer/FullscreenTimerMode.jsx';
import SessionDataTracker from '@/components/timer/SessionDataTracker.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { toast } from 'sonner';

const PatientExerciseViewPage = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  
  const [assignment, setAssignment] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const [timerActive, setTimerActive] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState(null);

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const data = await apiServerClient.fetch(`/program-assignments/${assignmentId}`);
        setAssignment(data);
        setExercises(data.exercises || []);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load program details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgramDetails();
  }, [assignmentId]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!assignment || exercises.length === 0) return <div className="p-8 text-center"><p>Program not found or no exercises.</p><Button onClick={()=>navigate('/patient/programs')}>Back</Button></div>;

  const currentExercise = exercises[currentIndex];
  const videoUrl = currentExercise.details.video_url;
  const config = {
    sets: Number(currentExercise.sets ?? 1),
    repetitions: Number(
      currentExercise.repetitions ??
      currentExercise.reps ??
      0
    ),

    prepare_time: Number(currentExercise.prepare_time ?? 5),
    work_time: Number(currentExercise.work_time ?? 0),
    hold_duration: Number(currentExercise.hold_duration ?? 0),

    cycles: Number(currentExercise.cycles ?? 1),
    rest_time: Number(currentExercise.rest_time ?? 0),
    rest_between_sets: Number(
      currentExercise.rest_between_sets ?? 10
    ),

    permission_mode:
      currentExercise.permission_mode ?? 'Patient Controlled'
  };
  const handleTimerComplete = () => {
    setTimerActive(false);
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setSessionStats({ // Ini adalah mock data, perlu diimplementasikan secara nyata
        exercisesCompleted: exercises.length,
        setsCompleted: exercises.reduce((acc, curr) => acc + (curr.sets || 3), 0), // Menggunakan curr.sets langsung
        painBefore: 3, // Mock, would capture at start
        durationSeconds: 1500, // Mock, would calculate real time
        adherenceRate: 100,
        completionPercentage: 100
      });
      setSessionComplete(true);
    }
  };

  if (timerActive) {
    return (
      <FullscreenTimerMode 
        config={config} 
        exerciseName={currentExercise.details.name} 
        exerciseIndex={currentIndex} 
        totalExercises={exercises.length} 
        videoUrl={videoUrl}
        onComplete={handleTimerComplete} 
        onExit={() => setTimerActive(false)} 
      />
    );
  }

  if (sessionComplete) {
    return <SessionDataTracker sessionData={sessionStats} programId={assignment.program_id} onComplete={() => navigate('/patient/dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-2xl mx-auto border-x border-border shadow-sm">
      <Helmet><title>Session | Physiome</title></Helmet>
      
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center justify-between">
        <button onClick={() => navigate('/patient/programs')} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-sm font-medium text-muted-foreground bg-muted px-4 py-1.5 rounded-full">
          Exercise {currentIndex + 1} of {exercises.length}
        </div>
        <div className="w-9" />
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        <div className="p-4 md:p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-3">{currentExercise.details.name}</h1>
            
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-bold">
                <Clock className="w-4 h-4" /> 
                {config.work_time > 0 ? `${config.work_time}s Work` : `${config.repetitions} Reps`}
              </span>
              <span className="bg-muted px-3 py-1.5 rounded-lg text-sm font-medium">{config.sets} Sets</span>
              {config.cycles > 1 && <span className="bg-muted px-3 py-1.5 rounded-lg text-sm font-medium">{config.cycles} Cycles</span>}
            </div>
            
            {config.permission_mode === 'Therapist Controlled' && (
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded-lg inline-flex">
                <ShieldAlert className="w-4 h-4 text-orange-500" />
                This protocol is strictly timed by your therapist.
              </div>
            )}
          </div>

          <VideoPlayerComponent 
            videoUrl={videoUrl} 
            thumbnailUrl={currentExercise.details.thumbnail_url} 
            title={currentExercise.details.name} 
          />

          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Therapist Instructions</h3>
            <div className="prose prose-sm dark:prose-invert text-muted-foreground whitespace-pre-wrap">
              {currentExercise.details.instructions || 'Follow the guided timer and video demonstration carefully. Focus on form over speed.'}
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-background/90 backdrop-blur-xl border-t border-border max-w-2xl mx-auto z-20">
        <Button 
          className="w-full h-14 text-lg rounded-2xl gap-3 font-bold shadow-glow-primary bg-[hsl(var(--timer-primary))] hover:bg-[hsl(var(--timer-primary))]/90 text-white transition-all hover:scale-[1.02] active:scale-[0.98]" 
          onClick={() => setTimerActive(true)}
        >
          <PlayCircle className="w-6 h-6" /> Start Guided Exercise
        </Button>
      </div>
    </div>
  );
};

export default PatientExerciseViewPage;
