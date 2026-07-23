import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Video, Calendar, Clock, User, CheckCircle2, Loader2, PhoneOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import JitsiRoom from '@/components/telehealth/JitsiRoom.jsx';

const CHECKLIST = [
  'Find a quiet, well-lit space',
  'Ensure camera captures your full body',
  'Wear comfortable exercise clothing',
  'Have your exercise equipment ready',
  'Check your internet connection',
];

const TelehealthPage = () => {
  const { currentUser } = useAuth();
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inCall, setInCall] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stats = await apiServerClient.fetch('/dashboard/patient-stats');
        setAppointment(stats.appointments?.[0] ?? null);
      } catch (e) {
        console.error('Failed to load telehealth session:', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Room shared with the clinician: the appointment id when there is one,
  // otherwise a stable per-patient room so an ad-hoc call still connects.
  const roomName = appointment ? `appt-${appointment.id}` : `patient-${currentUser?.id}`;
  const therapistName = appointment?.therapist?.users?.fullName || appointment?.therapist?.user?.fullName || 'Your therapist';

  if (inCall) {
    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <Helmet><title>Live Session | Physiome</title></Helmet>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Live Session</h1>
            <p className="text-muted-foreground text-sm">with {therapistName}</p>
          </div>
          <Button variant="destructive" className="rounded-full gap-2" onClick={() => setInCall(false)}>
            <PhoneOff className="w-4 h-4" /> Leave
          </Button>
        </div>
        <div className="h-[70vh]">
          <JitsiRoom roomName={roomName} displayName={currentUser?.fullName} onLeave={() => setInCall(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <Helmet><title>Telehealth | Physiome</title></Helmet>

      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Telehealth Portal</h1>
        <p className="text-muted-foreground mt-1">Join your virtual therapy sessions securely.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-0 shadow-soft-lg bg-gradient-to-br from-secondary to-primary-dark text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center relative z-10">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
              <Video className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {appointment ? 'Next Virtual Session' : 'Start a Session'}
            </h2>
            <p className="text-white/80 mb-8 max-w-md">
              {appointment
                ? 'Your therapist will review your progress and guide you through new exercises.'
                : 'No session is scheduled. You can still start a room and your therapist can join.'}
            </p>

            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin text-white/80 mb-8" />
            ) : appointment ? (
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <Calendar className="w-4 h-4 text-primary-light" />
                  <span className="font-medium">{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <Clock className="w-4 h-4 text-primary-light" /> <span className="font-medium">{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <User className="w-4 h-4 text-primary-light" /> <span className="font-medium">{therapistName}</span>
                </div>
              </div>
            ) : null}

            <Button
              size="lg"
              onClick={() => setInCall(true)}
              className="rounded-full px-12 h-14 text-lg font-bold bg-white text-secondary hover:bg-white/90 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
            >
              <Video className="w-5 h-5 mr-2" /> Join Video Call
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Pre-Session Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {CHECKLIST.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                <span className="text-sm text-foreground/80">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TelehealthPage;
