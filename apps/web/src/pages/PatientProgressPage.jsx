
import React, { useState, useEffect } from 'react';
import { TrendingUp, Activity, CheckCircle, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const mockPainData = [
  { day: 'Mon', score: 6 }, { day: 'Tue', score: 5 }, { day: 'Wed', score: 5 },
  { day: 'Thu', score: 4 }, { day: 'Fri', score: 3 }, { day: 'Sat', score: 2 }, { day: 'Sun', score: 2 }
];

const mockAdherence = [
  { week: 'W1', rate: 60 }, { week: 'W2', rate: 75 }, { week: 'W3', rate: 90 }, { week: 'W4', rate: 85 }
];

export default function PatientProgressPage() {
  const { t } = useTranslation();

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><CheckCircle className="w-6 h-6" /></div>
                <div><p className="text-sm text-muted-foreground">Avg Completion Rate</p><h3 className="text-2xl font-bold text-foreground">82%</h3></div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-xl text-secondary"><Activity className="w-6 h-6" /></div>
                <div><p className="text-sm text-muted-foreground">Avg Pain Reduction</p><h3 className="text-2xl font-bold text-foreground">-3.2 pts</h3></div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-accent-blue/10 rounded-xl text-accent-blue"><TrendingUp className="w-6 h-6" /></div>
                <div><p className="text-sm text-muted-foreground">Program Adherence</p><h3 className="text-2xl font-bold text-foreground">Excellent</h3></div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-soft">
              <CardHeader><CardTitle>Pain Score Trend (Recent Patient)</CardTitle></CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockPainData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 10]} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                    <Line type="monotone" dataKey="score" stroke="hsl(var(--destructive))" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardHeader><CardTitle>Adherence Rate (%)</CardTitle></CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAdherence}>
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

        </main>
      </div>
    </div>
  );
}
