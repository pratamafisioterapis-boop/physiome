import React, { useState, useEffect } from 'react';
import { TrendingUp, Activity, CheckCircle, Download, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import apiServerClient from '@/lib/apiServerClient.js';

const DAY_MS = 86400000;
const dayKey = (d) => new Date(d).toISOString().slice(0, 10);
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const adherenceLabel = (rate) => (rate >= 85 ? 'Excellent' : rate >= 70 ? 'Good' : rate >= 50 ? 'Fair' : 'Needs work');

export default function PatientProgressPage() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [painData, setPainData] = useState([]);
  const [adherence, setAdherence] = useState([]);
  const [summary, setSummary] = useState({ completion: 0, painReduction: 0 });

  useEffect(() => {
    (async () => {
      try {
        const [logs, pains] = await Promise.all([
          apiServerClient.fetch('/exercise-logs').catch(() => []),
          apiServerClient.fetch('/pain-logs').catch(() => []),
        ]);
        const exLogs = Array.isArray(logs) ? logs : [];
        const painLogs = Array.isArray(pains) ? pains : [];
        const now = Date.now();

        // Pain trend — last 7 calendar days, combining reported pain from
        // sessions (pain_after) and standalone pain logs.
        const painByDay = {};
        exLogs.forEach((l) => {
          if (l.pain_after != null && l.pain_after > 0) {
            (painByDay[dayKey(l.session_date)] ||= []).push(l.pain_after);
          }
        });
        painLogs.forEach((p) => {
          (painByDay[dayKey(p.created_at)] ||= []).push(p.pain_level);
        });
        const trend = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date(now - i * DAY_MS);
          const vals = painByDay[dayKey(d)];
          trend.push({
            day: WEEKDAYS[d.getDay()],
            score: vals && vals.length ? Math.round((vals.reduce((s, v) => s + v, 0) / vals.length) * 10) / 10 : null,
          });
        }
        setPainData(trend);

        // Adherence — last 4 weeks of average session completion.
        const weekBuckets = [[], [], [], []]; // index 0 = oldest (W1)
        exLogs.forEach((l) => {
          const age = now - new Date(l.session_date).getTime();
          const wk = Math.floor(age / (7 * DAY_MS));
          if (wk >= 0 && wk < 4) weekBuckets[3 - wk].push(l.completion_percentage || 0);
        });
        setAdherence(
          weekBuckets.map((b, i) => ({
            week: `W${i + 1}`,
            rate: b.length ? Math.round(b.reduce((s, v) => s + v, 0) / b.length) : 0,
          })),
        );

        // Summary tiles.
        const completion = exLogs.length
          ? Math.round(exLogs.reduce((s, l) => s + (l.completion_percentage || 0), 0) / exLogs.length)
          : 0;
        const withPain = exLogs.filter((l) => (l.pain_before || 0) > 0 && l.pain_after != null);
        const painReduction = withPain.length
          ? Math.round((withPain.reduce((s, l) => s + (l.pain_before - l.pain_after), 0) / withPain.length) * 10) / 10
          : 0;
        setSummary({ completion, painReduction });
      } catch (err) {
        console.error('Failed to load progress data:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Helmet>
        <title>{t('nav.patientProgress')} - Physiome</title>
      </Helmet>

      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">{t('nav.patientProgress')}</h1>
              <p className="text-muted-foreground mt-1">Track clinical outcomes and adherence rates across the clinic.</p>
            </div>
            <Button variant="outline" className="rounded-full shrink-0">
              <Download className="w-4 h-4 mr-2" /> Export Report
            </Button>
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin" /></div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary"><CheckCircle className="w-6 h-6" /></div>
                    <div><p className="text-sm text-muted-foreground">Avg Completion Rate</p><h3 className="text-2xl font-bold text-foreground">{summary.completion}%</h3></div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-secondary/10 rounded-xl text-secondary"><Activity className="w-6 h-6" /></div>
                    <div><p className="text-sm text-muted-foreground">Avg Pain Reduction</p><h3 className="text-2xl font-bold text-foreground">{summary.painReduction > 0 ? `-${summary.painReduction}` : summary.painReduction} pts</h3></div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-accent-blue/10 rounded-xl text-accent-blue"><TrendingUp className="w-6 h-6" /></div>
                    <div><p className="text-sm text-muted-foreground">Program Adherence</p><h3 className="text-2xl font-bold text-foreground">{adherenceLabel(summary.completion)}</h3></div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-0 shadow-soft">
                  <CardHeader><CardTitle>Pain Score Trend (last 7 days)</CardTitle></CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={painData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                        <YAxis domain={[0, 10]} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                        <Line type="monotone" dataKey="score" stroke="hsl(var(--destructive))" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} connectNulls />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardHeader><CardTitle>Adherence Rate (%)</CardTitle></CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={adherence}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="week" axisLine={false} tickLine={false} />
                        <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                        <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} maxBarSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
}
