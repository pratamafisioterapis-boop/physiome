
import React from 'react';
import { Helmet } from 'react-helmet';
import { Video, Calendar, Clock, User, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// Pastikan semua komponen UI yang digunakan diimpor
const TelehealthPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Helmet><title>Telehealth | Physiome</title></Helmet>
      
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Telehealth Portal</h1>
        <p className="text-muted-foreground mt-1">Join your virtual therapy sessions securely.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Session Card */}
        <Card className="lg:col-span-2 border-0 shadow-soft-lg bg-gradient-to-br from-secondary to-primary-dark text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center relative z-10">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
              <Video className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Next Virtual Session</h2>
            <p className="text-white/80 mb-8 max-w-md">Your therapist will review your progress and guide you through new exercises.</p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-primary-light" /> <span className="font-medium">Today</span>
              </div>
              <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                <Clock className="w-4 h-4 text-primary-light" /> <span className="font-medium">2:00 PM</span>
              </div>
              <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                <User className="w-4 h-4 text-primary-light" /> <span className="font-medium">Dr. Jenkins</span>
              </div>
            </div>

            <Button size="lg" className="rounded-full px-12 h-14 text-lg font-bold bg-white text-secondary hover:bg-white/90 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
              Join Video Call
            </Button>
          </CardContent>
        </Card>

        {/* Pre-session Checklist */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Pre-Session Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "Find a quiet, well-lit space",
              "Ensure camera captures full body",
              "Wear comfortable exercise clothing",
              "Have exercise equipment ready",
              "Check internet connection"
            ].map((item, i) => (
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
