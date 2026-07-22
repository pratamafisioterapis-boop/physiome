
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Dumbbell, Users, PlayCircle, Plus, Upload, BarChart, ClipboardList } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import apiServerClient from '@/lib/apiServerClient.js';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';

export default function ExerciseDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ exercises: 0, programs: 0, assigned: 0, active: 0 });
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await apiServerClient.fetch('/dashboard/admin-stats');
        setStats({
          exercises: data.exercises || 0,
          programs: data.programs || 0,
          assigned: data.assignedPrograms || 0,
          active: data.programs || 0
        });
        setRecent([]);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <Card className="border-0 shadow-soft">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`p-4 rounded-2xl ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold tracking-tight text-foreground">
            {loading ? <Skeleton className="h-8 w-16 mt-1" /> : value}
          </h3>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
        <Header title="Exercise Ecosystem" />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Overview</h2>
              <p className="text-muted-foreground">Manage your clinic's exercise library and programs.</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => navigate('/my-videos')} variant="outline" className="rounded-full shadow-sm">
                <Upload className="w-4 h-4 mr-2" /> Upload Video
              </Button>
              <Button onClick={() => navigate('/program-builder')} className="rounded-full shadow-glow-primary">
                <Plus className="w-4 h-4 mr-2" /> Create Program
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Exercises" value={stats.exercises} icon={Dumbbell} colorClass="bg-primary/10 text-primary" />
            <StatCard title="Programs Created" value={stats.programs} icon={Activity} colorClass="bg-accent-blue/10 text-accent-blue" />
            <StatCard title="Total Assigned" value={stats.assigned} icon={Users} colorClass="bg-secondary/10 text-secondary" />
            <StatCard title="Active Programs" value={stats.active} icon={PlayCircle} colorClass="bg-accent/20 text-accent-foreground" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="col-span-1 lg:col-span-2 border-0 shadow-soft">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="text-lg">Recent Assignments</CardTitle>
                <CardDescription>Latest programs assigned to your patients.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-6 space-y-4">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                  </div>
                ) : recent.length > 0 ? (
                  <div className="divide-y divide-border/50">
                    {recent.map((assignment) => (
                      <div key={assignment.id} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">{assignment.expand?.program_id?.name || 'Unnamed Program'}</span>
                          <span className="text-sm text-muted-foreground">Patient: {assignment.expand?.patient_id?.full_name || 'Unknown'}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground mb-1">{new Date(assignment.assigned_date).toLocaleDateString()}</span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                            assignment.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                          }`}>
                            {assignment.status || 'Active'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-muted-foreground">
                    <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No recent assignments found.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-0 shadow-soft bg-gradient-premium">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center mb-4">
                    <BarChart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">View Analytics</h3>
                  <p className="text-sm text-foreground/80 mb-6">Track program effectiveness and patient adherence.</p>
                  <Button onClick={() => navigate('/exercise-analytics')} variant="secondary" className="w-full rounded-full">
                    Open Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Button variant="outline" className="justify-start w-full" onClick={() => navigate('/exercise-library')}>
                    <Dumbbell className="w-4 h-4 mr-3 text-muted-foreground" /> Browse Library
                  </Button>
                  <Button variant="outline" className="justify-start w-full" onClick={() => navigate('/program-templates')}>
                    <Activity className="w-4 h-4 mr-3 text-muted-foreground" /> Browse Templates
                  </Button>
                  <Button variant="outline" className="justify-start w-full" onClick={() => navigate('/assigned-programs')}>
                    <Users className="w-4 h-4 mr-3 text-muted-foreground" /> Manage Assignments
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
