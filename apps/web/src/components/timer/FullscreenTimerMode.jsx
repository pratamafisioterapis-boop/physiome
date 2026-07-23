
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, Maximize, Minimize, X, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import HoldMode from './HoldMode.jsx';
import RepetitionMode from './RepetitionMode.jsx';
import HeartRateMonitor from '@/components/HeartRateMonitor.jsx';


const STAGES = {
  PREPARE: 'PREPARE',
  WORK: 'WORK',
  REST: 'REST',
  CYCLE_REST: 'CYCLE_REST',
  SET_REST: 'SET_REST',
  FINISHED: 'FINISHED'
};

const FullscreenTimerMode = ({ config, exerciseName, exerciseIndex, totalExercises, onComplete, onExit, videoUrl }) => {
  const [stage, setStage] = useState(STAGES.PREPARE);
  const [timeLeft, setTimeLeft] = useState(config.prepare_time || 5);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [currentReps, setCurrentReps] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const containerRef = useRef(null);

  // Audio cues
  const playAudioCue = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (stage === STAGES.PREPARE && config.prepare_time > 0) playAudioCue('Get ready');
  }, []); // Run once on mount

  useEffect(() => {
    let interval = null;
    
    if (isRunning && stage !== STAGES.FINISHED) {
      // Repetition mode uses manual progression instead of time for the WORK phase if hold is 0
      if (stage === STAGES.WORK && config.hold_duration === 0 && config.repetitions > 0) {
        // Wait for manual rep logging
      } else {
        interval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              handleStageTransition();
              return 0; // Transition logic sets new time
            }
            if (prev === 4) playAudioCue('3');
            if (prev === 3) playAudioCue('2');
            if (prev === 2) playAudioCue('1');
            return prev - 1;
          });
        }, 1000);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, stage, currentSet, currentCycle, config]);

  const handleStageTransition = () => {
    switch (stage) {
      case STAGES.PREPARE:
        setStage(STAGES.WORK);
        setTimeLeft(config.hold_duration > 0 ? config.hold_duration : config.work_time);
        playAudioCue('Work');
        break;
      case STAGES.WORK:
        if (currentCycle < config.cycles) {
          setStage(STAGES.REST);
          setTimeLeft(config.rest_time);
          playAudioCue('Rest');
        } else if (currentSet < config.sets) {
          setStage(STAGES.SET_REST);
          setTimeLeft(config.rest_between_sets);
          playAudioCue('Rest between sets');
        } else {
          setStage(STAGES.FINISHED);
          playAudioCue('Exercise complete');
          setTimeout(() => onComplete(), 2000);
        }
        break;
      case STAGES.REST:
      case STAGES.CYCLE_REST:
        setCurrentCycle(prev => prev + 1);
        setStage(STAGES.WORK);
        setTimeLeft(config.hold_duration > 0 ? config.hold_duration : config.work_time);
        playAudioCue('Work');
        break;
      case STAGES.SET_REST:
        setCurrentSet(prev => prev + 1);
        setCurrentCycle(1);
        setCurrentReps(0);
        setStage(STAGES.PREPARE);
        setTimeLeft(config.prepare_time);
        playAudioCue('Get ready for next set');
        break;
      default:
        break;
    }
  };

  const skipStage = () => {
    handleStageTransition();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleRepIncrement = () => {
    const newReps = currentReps + 1;
    setCurrentReps(newReps);
    if (newReps >= config.repetitions) {
      handleStageTransition();
    }
  };

  // Visuals computation
  const getStageColor = () => {
    switch(stage) {
      case STAGES.PREPARE: return 'bg-[hsl(var(--timer-prepare))]';
      case STAGES.WORK: return 'bg-[hsl(var(--timer-work))]';
      case STAGES.REST:
      case STAGES.SET_REST: return 'bg-[hsl(var(--timer-rest))]';
      default: return 'bg-primary';
    }
  };

  const getTotalTimeForStage = () => {
    switch(stage) {
      case STAGES.PREPARE: return config.prepare_time;
      case STAGES.WORK: return config.hold_duration > 0 ? config.hold_duration : config.work_time;
      case STAGES.REST: return config.rest_time;
      case STAGES.SET_REST: return config.rest_between_sets;
      default: return 100;
    }
  };

  const isManualRepMode = stage === STAGES.WORK && config.hold_duration === 0 && config.repetitions > 0;
  const isHoldMode = stage === STAGES.WORK && config.hold_duration > 0;

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-[hsl(var(--timer-background))] flex flex-col font-sans overflow-hidden animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="p-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onExit} className="text-white/70 hover:text-white hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{exerciseName}</h2>
            <p className="text-white/60 font-medium tracking-wide text-sm uppercase mt-1">Exercise {exerciseIndex + 1} of {totalExercises}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <HeartRateMonitor theme="dark" readOnly />
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full">
            <Activity className="w-4 h-4 mr-2 text-orange-400" /> Log Pain
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white/70 hover:text-white hover:bg-white/10 rounded-full hidden sm:flex">
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Main Timer Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`px-8 py-3 rounded-full text-2xl font-bold tracking-widest uppercase mb-12 shadow-xl border border-white/10 ${getStageColor()} ${stage === STAGES.REST || stage === STAGES.SET_REST ? 'text-[hsl(var(--timer-background))]' : 'text-white'}`}
          >
            {stage.replace('_', ' ')}
          </motion.div>
        </AnimatePresence>

        {isManualRepMode ? (
          <RepetitionMode currentReps={currentReps} targetReps={config.repetitions} onIncrement={handleRepIncrement} />
        ) : isHoldMode || stage !== STAGES.WORK ? (
          <HoldMode remainingTime={timeLeft} totalTime={getTotalTimeForStage()} stage={stage} />
        ) : (
          <HoldMode remainingTime={timeLeft} totalTime={getTotalTimeForStage()} stage={stage} />
        )}

        {/* Status Counters */}
        <div className="flex gap-12 mt-12">
          <div className="text-center timer-glass px-8 py-4 rounded-2xl">
            <p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">Set</p>
            <p className="text-4xl text-timer-display text-white">{currentSet} <span className="text-2xl text-white/40">/ {config.sets}</span></p>
          </div>
          {config.cycles > 1 && (
            <div className="text-center timer-glass px-8 py-4 rounded-2xl">
              <p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">Cycle</p>
              <p className="text-4xl text-timer-display text-white">{currentCycle} <span className="text-2xl text-white/40">/ {config.cycles}</span></p>
            </div>
          )}
        </div>
      </div>

      {/* Mini Video Preview (Bottom Left) */}
      {videoUrl && (
        <div className="absolute bottom-32 left-8 w-64 aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 z-20 hidden lg:block">
          <video src={videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
        </div>
      )}

      {/* Controls & Progress */}
      <div className="p-8 z-10 shrink-0 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-center items-center gap-6 mb-8">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-16 h-16 rounded-full border-white/20 bg-white/5 hover:bg-white/20 text-white"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-14 h-14 rounded-full text-white/70 hover:text-white hover:bg-white/20"
            onClick={skipStage}
          >
            <SkipForward className="w-6 h-6" />
          </Button>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex justify-between text-white/60 text-xs font-bold uppercase tracking-wider px-1">
            <span>Progress</span>
            <span>{Math.round(((currentSet - 1) / config.sets) * 100)}%</span>
          </div>
          <Progress value={((currentSet - 1) / config.sets) * 100} className="h-2 bg-white/20" />
        </div>
      </div>
    </div>
  );
};

export default FullscreenTimerMode;
