import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import { Card, CardContent } from '@/components/ui/card';
import {
  Activity, Users, AlertTriangle, Flame, TrendingDown, TrendingUp,
  Minus, Loader2, ArrowRight, CalendarClock,
} from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';

const STATUS = {
  inactive: { label: 'Inactive', cls: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' },
  at_risk: { label: 'At risk', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' },
  new: { label: 'Not started', cls: 'bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300' },
  on_track: { label: 'On track', cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' },
};

const AdherenceRing = ({ value }) => {
  const color = value >= 70 ? 'text-emerald-500' : value >= 40 ? 'text-amber-500' : 'text-red-500';
  return (
    <div className="relative w-12 h-12 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" strokeWidth="5" fill="transparent" className="stroke-muted" />
        <circle
          cx="24" cy="24" r="20" strokeWidth="5" fill="transparent" strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 20}
          strokeDashoffset={(2 * Math.PI * 20) * (1 - value / 100)}
          className={`${color} transition-all duration-700`} stroke="currentColor"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums">{value}%</span>
    </div>
  );
};

const PainTrend = ({ trend, latest }) => {
  if (latest == null) return <span className="text-xs text-muted-foreground">No data</span>;
  const down = trend != null && trend < 0;
  const up = trend != null && trend > 0;
  const Icon = down ? TrendingDown : up ? TrendingUp : Minus;
  const cls = down ? 'text-emerald-600' : up ? 'text-red-600' : 'text-muted-foreground';
  return (
    <span className={`inline-flex items-center gap-1 text-sm font-medium ${cls}`}>
      <Icon className="w-4 h-4" />
      {latest}/10
      {trend != null && trend !== 0 && <span className="text-xs">({trend > 0 ? '+' : ''}{trend})</span>}
    </span>
  );
};

const lastActiveLabel = (days) => {
  if (days == null) return 'Never';
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
};

const StatTile = ({ icon: Icon, label, value, tone = 'primary' }) => {
  const tones = {
    primary: 'bg-primary/10 text-primary',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-950/40',
    emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40',
  };
  return (
    <Card className="border-0 shadow-soft">
      <CardContent className="p-5 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${tones[tone]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-2xl font-bold tabular-nums">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const PatientMonitoringPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiServerClient.fetch('/dashboard/rtm');
        setData(res);
      } catch (e) {
        console.error('Failed to load monitoring data:', e);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const summary = data?.summary;
  const patients = data?.patients ?? [];

  return (
    <>
      <Helmet><title>Patient Monitoring - Physiome</title></Helmet>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Patient Monitoring</h1>
                <p className="text-muted-foreground mt-1">
                  Real-time adherence and pain across your active patients — last 30 days.
                </p>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : error ? (
                <Card className="border-dashed">
                  <CardContent className="p-10 text-center text-muted-foreground">
                    Monitoring data isn’t available yet. Make sure the latest backend is deployed, then refresh.
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatTile icon={Users} label="Active patients" value={summary.active_patients} />
                    <StatTile icon={AlertTriangle} label="Need attention" value={summary.at_risk} tone="amber" />
                    <StatTile icon={Activity} label="Avg adherence" value={`${summary.avg_adherence}%`} tone="emerald" />
                    <StatTile icon={CalendarClock} label="Sessions (7d)" value={summary.sessions_7d} />
                  </div>

                  <Card className="border-border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[760px] text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                            <th className="px-4 py-3 font-semibold">Patient</th>
                            <th className="px-4 py-3 font-semibold">Status</th>
                            <th className="px-4 py-3 font-semibold">Adherence</th>
                            <th className="px-4 py-3 font-semibold">Streak</th>
                            <th className="px-4 py-3 font-semibold">Sessions 7d</th>
                            <th className="px-4 py-3 font-semibold">Pain</th>
                            <th className="px-4 py-3 font-semibold">Last active</th>
                            <th className="px-4 py-3" />
                          </tr>
                        </thead>
                        <tbody>
                          {patients.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                                No patients with active programs yet. Assign a program to start monitoring.
                              </td>
                            </tr>
                          ) : (
                            patients.map((p) => {
                              const st = STATUS[p.status] || STATUS.new;
                              return (
                                <tr
                                  key={p.patient_id}
                                  onClick={() => navigate(`/patients/${p.patient_id}`)}
                                  className="border-b border-border/60 hover:bg-muted/30 cursor-pointer transition-colors"
                                >
                                  <td className="px-4 py-3">
                                    <p className="font-semibold text-foreground">{p.name}</p>
                                    {p.email && <p className="text-xs text-muted-foreground">{p.email}</p>}
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${st.cls}`}>{st.label}</span>
                                  </td>
                                  <td className="px-4 py-3"><AdherenceRing value={p.adherence} /></td>
                                  <td className="px-4 py-3">
                                    <span className="inline-flex items-center gap-1 font-medium">
                                      <Flame className={`w-4 h-4 ${p.streak > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
                                      {p.streak}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 tabular-nums">{p.sessions_7d}</td>
                                  <td className="px-4 py-3"><PainTrend trend={p.pain_trend} latest={p.pain_latest} /></td>
                                  <td className="px-4 py-3 text-muted-foreground">{lastActiveLabel(p.days_since_last)}</td>
                                  <td className="px-4 py-3 text-right">
                                    <ArrowRight className="w-4 h-4 text-muted-foreground inline" />
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PatientMonitoringPage;
