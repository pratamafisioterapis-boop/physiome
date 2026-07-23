import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Flame, Lock, Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import apiServerClient from '@/lib/apiServerClient.js';
import { evaluateBadges, nextStreakMilestone, TONE_CLASSES } from '@/lib/achievements.js';

const AchievementsPage = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await apiServerClient.fetch('/dashboard/patient-stats');
        setStats({
          streak: data.streak ?? 0,
          adherence: data.adherence ?? 0,
          activePrograms: data.programs?.length ?? 0,
          totalSessions: data.totalSessions, // may be undefined; badges fall back gracefully
        });
      } catch (e) {
        console.error('Failed to load achievements:', e);
        setStats({ streak: 0, adherence: 0, activePrograms: 0 });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  const { earned, locked } = evaluateBadges(stats);
  const streak = stats.streak ?? 0;
  const nextMilestone = nextStreakMilestone(streak);
  const milestoneProgress = nextMilestone ? Math.min(100, Math.round((streak / nextMilestone) * 100)) : 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <Helmet><title>Achievements | Physiome</title></Helmet>

      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Achievements</h1>
        <p className="text-muted-foreground mt-1">Every session counts. Keep your streak alive.</p>
      </header>

      {/* Streak hero */}
      <Card className="border-0 shadow-soft-lg overflow-hidden bg-gradient-to-br from-orange-500 to-amber-500 text-white">
        <CardContent className="p-8">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
              <Flame className="w-11 h-11" />
            </div>
            <div className="flex-1">
              <p className="text-white/80 text-sm font-semibold uppercase tracking-wider">Current Streak</p>
              <p className="text-4xl font-bold tabular-nums">{streak} {streak === 1 ? 'day' : 'days'}</p>
              {nextMilestone ? (
                <p className="text-white/85 text-sm mt-1">{nextMilestone - streak} more to reach a {nextMilestone}-day streak</p>
              ) : (
                <p className="text-white/85 text-sm mt-1">Legendary consistency 🎉</p>
              )}
            </div>
          </div>
          {nextMilestone && (
            <div className="mt-6">
              <div className="h-2.5 rounded-full bg-white/25 overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${milestoneProgress}%` }} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Earned */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Earned <span className="text-muted-foreground font-normal">({earned.length})</span></h2>
        </div>
        {earned.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center text-muted-foreground text-sm">
              No badges yet — complete a guided session to earn your first one.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {earned.map((b) => {
              const Icon = b.icon;
              return (
                <Card key={b.id} className="border-0 shadow-soft">
                  <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${TONE_CLASSES[b.tone]}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{b.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Locked */}
      {locked.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-bold text-muted-foreground">Locked <span className="font-normal">({locked.length})</span></h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {locked.map((b) => {
              const Icon = b.icon;
              const pct = Math.round((b.progress?.(stats) ?? 0) * 100);
              return (
                <Card key={b.id} className="border border-dashed border-border bg-muted/20">
                  <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-muted text-muted-foreground/60 relative">
                      <Icon className="w-7 h-7" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center">
                        <Lock className="w-3 h-3 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="font-bold text-sm text-muted-foreground">{b.title}</p>
                      <p className="text-xs text-muted-foreground/80 mt-0.5">{b.description}</p>
                      {pct > 0 && (
                        <div className="h-1.5 rounded-full bg-muted mt-2.5 overflow-hidden">
                          <div className="h-full bg-primary/50 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default AchievementsPage;
