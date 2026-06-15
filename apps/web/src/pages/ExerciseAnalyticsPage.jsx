
import React from 'react';
import { Download, BarChart2, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const mockTopExercises = [
  { name: 'Bridging', assigned: 120 },
  { name: 'Clamshells', assigned: 98 },
  { name: 'Chin Tucks', assigned: 86 },
  { name: 'SLR', assigned: 75 },
  { name: 'Wall Slides', assigned: 62 },
];

export default function ExerciseAnalyticsPage() {
  const { t } = useTranslation();

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
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockTopExercises} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                    <XAxis type="number" axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                    <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                    <Bar dataKey="assigned" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft bg-secondary text-secondary-foreground">
              <CardHeader>
                <CardTitle>Program Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 mt-4">
                  {[
                    { name: 'Post-Op Knee', rate: 94 },
                    { name: 'Low Back Stabilize', rate: 88 },
                    { name: 'Cervical Mobility', rate: 82 }
                  ].map((p, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2 text-sm font-medium">
                        <span>{p.name}</span>
                        <span>{p.rate}% success</span>
                      </div>
                      <div className="w-full bg-secondary-foreground/20 rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: `${p.rate}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

        </main>
      </div>
    </div>
  );
}
