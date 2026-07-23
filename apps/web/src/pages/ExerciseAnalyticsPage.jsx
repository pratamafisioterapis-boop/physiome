
import React, { useState, useEffect } from 'react';
import { Download, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import apiServerClient from '@/lib/apiServerClient.js';

const normalizeRate = (v) => (v == null ? null : Math.round(v <= 1 ? v * 100 : v));

export default function ExerciseAnalyticsPage() {
  const { t } = useTranslation();
  const [topExercises, setTopExercises] = useState([]);
  const [effectiveness, setEffectiveness] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const exercises = await apiServerClient.fetch('/exercises');
        const list = Array.isArray(exercises) ? exercises : [];
        setTopExercises(
          list
            .filter((e) => (e.times_assigned || 0) > 0)
            .sort((a, b) => (b.times_assigned || 0) - (a.times_assigned || 0))
            .slice(0, 6)
            .map((e) => ({ name: e.name, assigned: e.times_assigned || 0 })),
        );
        setEffectiveness(
          list
            .filter((e) => e.completion_rate != null)
            .sort((a, b) => b.completion_rate - a.completion_rate)
            .slice(0, 3)
            .map((e) => ({ name: e.name, rate: normalizeRate(e.completion_rate) })),
        );
      } catch (err) {
        console.error('Failed to load analytics:', err);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Helmet>
        <title>{t('nav.analytics')} - Physiome</title>
      </Helmet>

      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">{t('nav.analytics')}</h1>
              <p className="text-muted-foreground mt-1">Aggregated insights across all patients and programs.</p>
            </div>
            <Button variant="outline" className="rounded-full shrink-0">
              <Download className="w-4 h-4 mr-2" /> Export Report
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart2 className="w-5 h-5 text-primary" /> Most Assigned Exercises</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                {topExercises.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground text-sm text-center px-6">
                    No exercises have been assigned yet. Assign a program to see usage here.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topExercises} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                      <XAxis type="number" axisLine={false} tickLine={false} allowDecimals={false} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                      <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                      <Bar dataKey="assigned" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft bg-secondary text-secondary-foreground">
              <CardHeader>
                <CardTitle>Exercise Completion</CardTitle>
              </CardHeader>
              <CardContent>
                {effectiveness.length === 0 ? (
                  <div className="py-10 text-center text-secondary-foreground/70 text-sm">
                    Completion data will appear as patients finish their exercises.
                  </div>
                ) : (
                  <div className="space-y-6 mt-4">
                    {effectiveness.map((p, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2 text-sm font-medium">
                          <span className="truncate pr-2">{p.name}</span>
                          <span>{p.rate}% completed</span>
                        </div>
                        <div className="w-full bg-secondary-foreground/20 rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full" style={{ width: `${p.rate}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </main>
      </div>
    </div>
  );
}
