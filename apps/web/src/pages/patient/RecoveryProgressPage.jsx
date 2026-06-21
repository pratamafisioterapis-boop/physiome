
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Select from '@/components/Select.jsx';
import { Download, TrendingUp, Activity, Target, Flame, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const RecoveryProgressPage = () => {
  const { currentUser } = useAuth();
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('30days');
  const [stats, setStats] = useState({
    overallRecovery: 0, painReduction: 0, avgAdherence: 0, streak: 0
  });

  useEffect(() => {
    const fetchLogs = async () => {
      if (!currentUser?.id) return;
      setIsLoading(true);
      try {
        const allLogs = await apiServerClient.fetch(`/exercise-logs`);
        setLogs(allLogs);

        // Hitung statistik ringkasan dari log
        if (allLogs.length > 0) {
          const totalPainBefore = allLogs.reduce((sum, log) => sum + (log.pain_before || 0), 0);
          const totalPainAfter = allLogs.reduce((sum, log) => sum + (log.pain_after || 0), 0);
          const avgPainReduction = (totalPainBefore - totalPainAfter) / allLogs.length;
          
          const totalAdherence = allLogs.reduce((sum, log) => sum + (log.adherence_rate || 0), 0);
          const avgAdherence = Math.round(totalAdherence / allLogs.length);

          // Streak (logic from PatientDashboardWidgets)
          let currentStreak = 0;
          const uniqueLogDates = [...new Set(allLogs.map(log => new Date(log.session_date).toISOString().split('T')[0]))].sort().reverse();
          let currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);

          for (const logDate of uniqueLogDates) {
              const date = new Date(logDate);
              date.setHours(0, 0, 0, 0);
              const diffDays = Math.round(Math.abs((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)));
              if (diffDays === currentStreak) {
                  currentStreak++;
                  currentDate.setDate(currentDate.getDate() - 1);
              } else if (diffDays > currentStreak) {
                  break;
              }
          }

          setStats({
            overallRecovery: avgAdherence, // Menggunakan adherence sebagai proxy recovery
            painReduction: avgPainReduction.toFixed(1),
            avgAdherence: avgAdherence,
            streak: currentStreak
          });
        }
      } catch (error) {
        console.error('Error fetching exercise logs:', error);
        toast.error('Failed to load recovery progress.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, [currentUser, timePeriod]); // Refresh data jika periode waktu berubah

  // Filter logs berdasarkan timePeriod
  const getFilteredLogs = () => {
    const now = new Date();
    let startDate = new Date();
    if (timePeriod === '7days') startDate.setDate(now.getDate() - 7);
    else if (timePeriod === '30days') startDate.setDate(now.getDate() - 30);
    else if (timePeriod === '90days') startDate.setDate(now.getDate() - 90);
    else return logs; // All time

    return logs.filter(log => new Date(log.session_date) >= startDate);
  };

  const filteredLogs = getFilteredLogs();

  // Data untuk grafik Pain Trend
  const painTrendData = filteredLogs.reduce((acc, log) => {
    const date = new Date(log.session_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!acc[date]) acc[date] = { date, totalPain: 0, count: 0 };
    acc[date].totalPain += (log.pain_after || 0);
    acc[date].count++;
    return acc;
  }, {});
  const formattedPainData = Object.values(painTrendData).map(data => ({
    date: data.date,
    score: Math.round(data.totalPain / data.count)
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  // Data untuk grafik Adherence Rate
  const adherenceData = filteredLogs.reduce((acc, log) => {
    const date = new Date(log.session_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!acc[date]) acc[date] = { date, totalAdherence: 0, count: 0 };
    acc[date].totalAdherence += (log.adherence_rate || 0);
    acc[date].count++;
    return acc;
  }, {});
  const formattedAdherenceData = Object.values(adherenceData).map(data => ({
    date: data.date,
    rate: Math.round(data.totalAdherence / data.count)
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Helmet><title>Recovery Progress | Physiome</title></Helmet>
      
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Recovery Progress</h1>
          <p className="text-muted-foreground mt-1">Track your improvements over time.</p>
        </div>
        <div className="flex gap-3">
          <Select 
            value={timePeriod} 
            onValueChange={setTimePeriod}
            placeholder="Time Period"
            className="w-[140px]"
            options={[
              { label: "Last 7 Days", value: "7days" },
              { label: "Last 30 Days", value: "30days" },
              { label: "Last 90 Days", value: "90days" },
              { label: "All Time", value: "all" }
            ]}
            isSearchable={false}
          />
          <Button variant="outline" size="icon" className="rounded-xl shrink-0">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3].map(i => <Skeleton key={i} className="h-28 rounded-xl" />)
        ) : (
          <>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><TrendingUp className="w-6 h-6" /></div>
                <div><p className="text-sm text-muted-foreground">Overall Recovery</p><h3 className="text-2xl font-bold">{stats.overallRecovery}%</h3></div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-destructive/10 rounded-xl text-destructive"><Activity className="w-6 h-6" /></div>
                <div><p className="text-sm text-muted-foreground">Pain Reduction</p><h3 className="text-2xl font-bold">{stats.painReduction} pts</h3></div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-success/10 rounded-xl text-success"><Target className="w-6 h-6" /></div>
                <div><p className="text-sm text-muted-foreground">Avg Adherence</p><h3 className="text-2xl font-bold">{stats.avgAdherence}%</h3></div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Pain Trend</CardTitle>
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading chart...
              </div>
            )}
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%" debounce={1}>
              <LineChart data={formattedPainData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                <Line type="monotone" dataKey="score" stroke="hsl(var(--destructive))" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Exercise Adherence</CardTitle>
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading chart...
              </div>
            )}
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%" debounce={1}>
              <BarChart data={formattedAdherenceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecoveryProgressPage;
