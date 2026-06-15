
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Save, Activity } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { toast } from 'sonner';

const SessionDataTracker = ({ sessionData, programId, onComplete }) => {
  const { currentUser } = useAuth();
  const [painAfter, setPainAfter] = useState(sessionData.painBefore || 0);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiServerClient.fetch('/exercise-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: currentUser.id,
          program_id: programId,
          exercises_completed: sessionData.exercisesCompleted,
          sets_completed: sessionData.setsCompleted,
          pain_before: sessionData.painBefore || 0,
          pain_after: painAfter,
          duration: sessionData.durationSeconds,
          adherence_rate: sessionData.adherenceRate,
          completion_percentage: sessionData.completionPercentage,
          notes: notes
        })
      });

      toast.success('Session saved successfully!');
      onComplete();
    } catch (error) {
      toast.error('Failed to save session data');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-300">
      <Card className="w-full max-w-lg border-border shadow-soft-lg overflow-hidden">
        <div className="bg-primary/10 p-6 text-center border-b border-border">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground shadow-glow-primary">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Session Complete!</h2>
          <p className="text-muted-foreground mt-1">Great job finishing your rehabilitation exercises.</p>
        </div>
        
        <CardContent className="p-6 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-xl text-center">
              <p className="text-sm text-muted-foreground mb-1">Duration</p>
              <p className="text-xl font-bold">{Math.floor(sessionData.durationSeconds / 60)}m {sessionData.durationSeconds % 60}s</p>
            </div>
            <div className="bg-muted p-4 rounded-xl text-center">
              <p className="text-sm text-muted-foreground mb-1">Completion</p>
              <p className="text-xl font-bold text-primary">{sessionData.completionPercentage}%</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4 text-destructive" /> Pain Level After Session
              </label>
              <span className={`text-xl font-bold ${painAfter > 6 ? 'text-destructive' : painAfter > 3 ? 'text-orange-500' : 'text-success'}`}>{painAfter}/10</span>
            </div>
            <Slider value={[painAfter]} max={10} step={1} onValueChange={v => setPainAfter(v[0])} className="py-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 - None</span>
              <span>5 - Moderate</span>
              <span>10 - Severe</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-sm">Session Notes (Optional)</label>
            <Textarea 
              placeholder="How did you feel? Any specific difficulties?" 
              value={notes} 
              onChange={e => setNotes(e.target.value)} 
              className="resize-none rounded-xl"
              rows={3}
            />
          </div>

          <Button className="w-full h-12 text-lg rounded-xl shadow-glow-primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save & Exit'} <Save className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionDataTracker;
