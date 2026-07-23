import React, { useState, useEffect } from 'react';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import StatCard from '@/components/admin/StatCard.jsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Helmet } from 'react-helmet';
import { Activity, Users, CheckCircle } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';

const normalizeRate = (v) => (v == null ? null : Math.round(v <= 1 ? v * 100 : v));

const ExerciseStatisticsPage = () => {
  const [topExercises, setTopExercises] = useState([]);
  const [stats, setStats] = useState({ totalAssignments: 0, avgCompletion: 0, activePatients: 0 });

  useEffect(() => {
    (async () => {
      try {
        const [exercises, admin] = await Promise.all([
          apiServerClient.fetch('/exercises'),
          apiServerClient.fetch('/dashboard/admin-stats').catch(() => ({})),
        ]);
        const list = Array.isArray(exercises) ? exercises : [];

        setTopExercises(
          list
            .filter((e) => (e.times_assigned || 0) > 0)
            .sort((a, b) => (b.times_assigned || 0) - (a.times_assigned || 0))
            .slice(0, 6)
            .map((e) => ({ name: e.name, assigned: e.times_assigned || 0 })),
        );

        const totalAssignments = list.reduce((s, e) => s + (e.times_assigned || 0), 0);
        const rates = list.map((e) => normalizeRate(e.completion_rate)).filter((r) => r != null);
        const avgCompletion = rates.length ? Math.round(rates.reduce((s, r) => s + r, 0) / rates.length) : 0;

        setStats({ totalAssignments, avgCompletion, activePatients: admin?.patients ?? 0 });
      } catch (err) {
        console.error('Failed to load exercise statistics:', err);
      }
    })();
  }, []);

  return (
    <>
      <Helmet><title>Statistics | Admin</title></Helmet>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">

              <h1 className="text-3xl font-bold text-foreground tracking-tight">Exercise Statistics</h1>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard title="Total Assignments" value={stats.totalAssignments.toLocaleString()} icon={Activity} />
                <StatCard title="Avg Completion Rate" value={`${stats.avgCompletion}%`} icon={CheckCircle} />
                <StatCard title="Active Patients" value={stats.activePatients.toLocaleString()} icon={Users} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="admin-card">
                  <h2 className="font-semibold mb-4">Most Assigned Exercises</h2>
                  <div className="h-64">
                    {topExercises.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-muted-foreground text-sm text-center px-6">
                        No exercises assigned yet.
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={topExercises} layout="vertical" margin={{ left: 40 }}>
                          <XAxis type="number" hide allowDecimals={false} />
                          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                          <Tooltip cursor={{ fill: 'transparent' }} />
                          <Bar dataKey="assigned" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

                <div className="admin-card flex items-center justify-center text-muted-foreground">
                  More charts coming soon
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ExerciseStatisticsPage;
