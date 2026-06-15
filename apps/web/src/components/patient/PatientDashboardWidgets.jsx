import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Calendar, Flame, Activity, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';

const PatientDashboardWidgets = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!currentUser?.id) return;
      try {
        const data = await apiServerClient.fetch('/dashboard/patient-stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching patient dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-48 animate-pulse bg-muted/50 border-none shadow-sm" />
        ))}
      </div>
    );
  }

  const nextProgram = stats?.programs?.[0];
  const nextAppointment = stats?.appointments?.[0];
  const adherence = stats?.adherence || 0;
  const streak = stats?.streak || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      
      {/* Today's Guided Session */}
      <Card className="border-0 shadow-soft-lg bg-card overflow-hidden group">
        <div className="h-2 w-full bg-[hsl(var(--timer-primary))]" />
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-[hsl(var(--timer-primary))] uppercase tracking-wider mb-1">Up Next</p>
              <h3 className="text-2xl font-bold text-foreground">Guided Session</h3>
              <p className="text-muted-foreground mt-1">
                {nextProgram?.program_name || 'No active program'} • {nextProgram?.expected_duration || '--'}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 ml-1" />
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 flex justify-between items-center">
            <span className="text-sm font-medium">Includes Advanced Timer</span>
            <Button
              onClick={() => nextProgram && navigate(`/patient/programs/${nextProgram.id}`)} 
              disabled={!nextProgram}
              className="rounded-full shadow-glow-primary"
            >
              Start Session
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Next Clinic Session */}
      <Card className="border-0 shadow-soft">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center shrink-0">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Next Clinic Visit</h3>
              <p className="text-sm text-muted-foreground">
                {nextAppointment ? `${new Date(nextAppointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} • ${nextAppointment.time}` : 'No upcoming visits'}
              </p>
              <p className="text-sm font-medium mt-2">{nextAppointment?.therapist?.user?.fullName || 'Unassigned'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Completion */}
      <Card className="border-0 shadow-soft">
        <CardContent className="p-6 flex items-center gap-6">
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted" />
              <circle 
                cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" 
                strokeDasharray="226" strokeDashoffset={226 - (226 * adherence / 100)} 
                className="text-success transition-all duration-1000 ease-in-out" strokeLinecap="round" 
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">{adherence}%</div>
          </div>
          <div>
            <h3 className="font-bold text-lg">Weekly Goal</h3>
            <p className="text-sm text-muted-foreground">
              {adherence >= 100 ? 'Target achieved! Keep it up.' : `${adherence}% of your target sessions completed. Keep going!`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recovery Streak */}
      <Card className="border-0 shadow-soft bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-transparent">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center">
              <div className="p-4 bg-orange-500/20 rounded-2xl text-orange-600"><Flame className="w-8 h-8" /></div>
              <div>
                <p className="text-sm font-semibold text-orange-600/80 dark:text-orange-400 uppercase tracking-wider">Recovery Streak</p>
                <h3 className="text-3xl font-bold text-orange-700 dark:text-orange-300">{streak} Days</h3>
              </div>
            </div>
          </div>
          {stats?.lastPainReduction && (
            <div className="mt-4 pt-4 border-t border-orange-200/50 dark:border-orange-800/50">
              <p className="text-sm font-medium text-orange-800/80 dark:text-orange-200/80 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Last Session: Pain reduced by {stats.lastPainReduction} points
              </p>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
};

export default PatientDashboardWidgets;
