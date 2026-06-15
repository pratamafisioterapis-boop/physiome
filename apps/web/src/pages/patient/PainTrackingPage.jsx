
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea'; // Pastikan Textarea diimpor
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';

const PainTrackingPage = () => {
  const { currentUser } = useAuth();
  const [painLevel, setPainLevel] = useState(5);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!location) return toast.error("Please select a pain location.");
    setIsSubmitting(true);
    try {
      await apiServerClient.fetch('/pain-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pain_level: painLevel,
          location: location,
          notes: notes
        })
      });
      toast.success("Pain log saved successfully.");
      setNotes('');
    } catch (error) {
      toast.error("Failed to save pain log.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Color gradient logic for slider feedback
  const getPainColor = (val) => {
    if (val <= 3) return 'text-success';
    if (val <= 6) return 'text-orange-500';
    return 'text-destructive';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl mx-auto">
      <Helmet><title>Pain Tracking | Physiome</title></Helmet>
      
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Log Pain Level</h1>
        <p className="text-muted-foreground mt-1">Keep your therapist updated on your comfort levels.</p>
      </header>

      <Card className="border-0 shadow-soft">
        <CardContent className="p-6 sm:p-8 space-y-8">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-foreground">Current Pain Level</label>
              <span className={`text-3xl font-bold ${getPainColor(painLevel)}`}>{painLevel}/10</span>
            </div>
            <Slider 
              value={[painLevel]} 
              max={10} step={1}
              onValueChange={v => setPainLevel(v[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground font-medium">
              <span>0 - No Pain</span>
              <span>5 - Moderate</span>
              <span>10 - Severe</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Primary Location</label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full rounded-xl h-12 bg-muted/50 border-transparent">
                <SelectValue placeholder="Select body region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Neck">Neck</SelectItem>
                <SelectItem value="Left Shoulder">Left Shoulder</SelectItem>
                <SelectItem value="Right Shoulder">Right Shoulder</SelectItem>
                <SelectItem value="Lower Back">Lower Back</SelectItem>
                <SelectItem value="Left Knee">Left Knee</SelectItem>
                <SelectItem value="Right Knee">Right Knee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Additional Notes (Optional)</label>
            <Textarea 
              placeholder="What were you doing when the pain started? What makes it better or worse?"
              className="min-h-[120px] rounded-xl bg-muted/50 border-transparent resize-none"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <Button 
            className="w-full rounded-xl h-12 text-base font-semibold shadow-glow-primary" 
            onClick={handleSave}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Pain Log'}
          </Button>

        </CardContent>
      </Card>
    </div>
  );
};

export default PainTrackingPage;
