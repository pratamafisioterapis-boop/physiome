
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, PlayCircle, Clock, ShieldAlert, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
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

  // Real session capture (replaces the previous mock stats).
  const [showPainPrompt, setShowPainPrompt] = useState(false);
  const [painBefore, setPainBefore] = useState(0);
  const [sessionStart, setSessionStart] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);

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
  // Called when the patient taps "Start Guided Exercise". We capture the
  // pre-session pain score once (at the start of the first exercise) and mark
  // the real session start time so duration is measured, not mocked.
  const beginSession = () => {
    if (sessionStart === null) {
      setShowPainPrompt(true);
    } else {
      setTimerActive(true);
    }
  };

  const confirmPainAndStart = () => {
    setSessionStart(Date.now());
    setShowPainPrompt(false);
    setTimerActive(true);
  };

  const handleTimerComplete = () => {
    setTimerActive(false);
    const doneNow = completedCount + 1;
    setCompletedCount(doneNow);

    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const durationSeconds = sessionStart ? Math.round((Date.now() - sessionStart) / 1000) : 0;
      const total = exercises.length || 1;
      const completionPercentage = Math.round((doneNow / total) * 100);
      const setsCompleted = exercises
        .slice(0, doneNow)
        .reduce((acc, curr) => acc + (Number(curr.sets) || 1), 0);

      setSessionStats({
        exercisesCompleted: doneNow,
        setsCompleted,
        painBefore,
        durationSeconds,
        adherenceRate: completionPercentage,
        completionPercentage,
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
          onClick={beginSession}
        >
          <PlayCircle className="w-6 h-6" /> Start Guided Exercise
        </Button>
      </div>

      {showPainPrompt && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-300">
          <Card className="w-full max-w-md border-border shadow-soft-lg overflow-hidden">
            <div className="bg-primary/10 p-6 text-center border-b border-border">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-primary-foreground">
                <Activity className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Before we start</h2>
              <p className="text-muted-foreground text-sm mt-1">How is your pain level right now?</p>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">Pain level</span>
                  <span className={`text-xl font-bold ${painBefore > 6 ? 'text-destructive' : painBefore > 3 ? 'text-orange-500' : 'text-success'}`}>{painBefore}/10</span>
                </div>
                <Slider value={[painBefore]} max={10} step={1} onValueChange={v => setPainBefore(v[0])} className="py-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 - None</span>
                  <span>5 - Moderate</span>
                  <span>10 - Severe</span>
                </div>
              </div>
              <Button className="w-full h-12 text-lg rounded-xl shadow-glow-primary" onClick={confirmPainAndStart}>
                Start Session <PlayCircle className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PatientExerciseViewPage;
