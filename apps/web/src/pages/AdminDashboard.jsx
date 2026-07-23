
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import { Users, Activity, Calendar, Dumbbell, Plus, Key, FileText, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom'; // Pastikan useNavigate diimpor

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--destructive))'];

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    patients: 0, therapists: 0, programs: 0, appointments: 0, adherence: 0
  });
  const [therapists, setTherapists] = useState([]);
  const [patients, setPatients] = useState([]);
  const [activities, setActivities] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [data, patientList, assignments] = await Promise.all([
          apiServerClient.fetch('/dashboard/admin-stats'),
          apiServerClient.fetch('/patients').catch(() => []),
          apiServerClient.fetch('/program-assignments').catch(() => []),
        ]);
        setStats(data);

        const pts = Array.isArray(patientList) ? patientList : [];
        setPatients(pts);
        setTherapists([]);

        // Patient growth — new registrations per week over the last 6 weeks.
        const DAY_MS = 86400000;
        const now = Date.now();
        const weeks = Array.from({ length: 6 }, () => 0);
        pts.forEach((p) => {
          if (!p.created_at) return;
          const wk = Math.floor((now - new Date(p.created_at).getTime()) / (7 * DAY_MS));
          if (wk >= 0 && wk < 6) weeks[5 - wk] += 1;
        });
        setChartData(weeks.map((count, i) => ({ name: `W${i + 1}`, patients: count })));

        // Program status distribution from assignments.
        const asgs = Array.isArray(assignments) ? assignments : [];
        const statusCounts = {};
        asgs.forEach((a) => { statusCounts[a.status || 'Active'] = (statusCounts[a.status || 'Active'] || 0) + 1; });
        setPieData(Object.entries(statusCounts).map(([name, value]) => ({ name, value })));

        // Recent activity — real recent patient registrations.
        const recent = [...pts]
          .filter((p) => p.created_at)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 4)
          .map((p, i) => ({ id: i, type: 'user', desc: `New patient registered: ${p.name}`, time: new Date(p.created_at).toLocaleDateString() }));
        setActivities(recent);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  return (
    <>
      <Helmet><title>Admin Dashboard | Physiome</title></Helmet>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-8">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
                  <p className="text-muted-foreground">Manage your clinic's performance and staff.</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => navigate('/settings')} variant="outline"><Key className="w-4 h-4 mr-2"/> Invite Codes</Button>
                  <Button><Plus className="w-4 h-4 mr-2"/> Add Therapist</Button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { title: 'Active Patients', value: stats.patients, icon: Users },
                  { title: 'Therapists', value: stats.therapists, icon: Activity },
                  { title: 'Active Programs', value: stats.programs, icon: Dumbbell },
                  { title: 'Appointments Today', value: stats.appointments, icon: Calendar },
                  { title: 'Avg Adherence', value: `${stats.adherence}%`, icon: Activity },
                ].map((stat, i) => (
                  <Card key={i} className="border-none shadow-md bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <stat.icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="mt-4">
                        {isLoading ? <Skeleton className="h-8 w-16" /> : <h3 className="text-2xl font-bold">{stat.value}</h3>}
                        <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">New Patients (weekly)</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                        <Line type="monotone" dataKey="patients" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Program Status</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {pieData.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                        No programs assigned yet.
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" nameKey="name">
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* User Management & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="therapists">
                      <TabsList className="mb-4">
                        <TabsTrigger value="therapists">Therapists</TabsTrigger>
                        <TabsTrigger value="patients">Patients</TabsTrigger>
                      </TabsList>
                      <TabsContent value="therapists">
                        <div className="overflow-x-auto border rounded-md">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden sm:table-cell">Email</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {isLoading ? (
                                <TableRow><TableCell colSpan={3}><Skeleton className="h-12 w-full" /></TableCell></TableRow>
                              ) : therapists.map(t => (
                                <TableRow key={t.id}>
                                  <TableCell className="font-medium">{t.name}</TableCell>
                                  <TableCell className="hidden sm:table-cell">{t.email}</TableCell>
                                  <TableCell><span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">Active</span></TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TabsContent>
                      <TabsContent value="patients">
                        <div className="overflow-x-auto border rounded-md">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {isLoading ? (
                                <TableRow><TableCell colSpan={2}><Skeleton className="h-12 w-full" /></TableCell></TableRow>
                              ) : patients.map(p => (
                                <TableRow key={p.id}>
                                  <TableCell className="font-medium">{p.full_name}</TableCell>
                                  <TableCell><span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">{p.status}</span></TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-4">
                        {activities.map(act => (
                          <div key={act.id} className="flex gap-3 items-start">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                              <Activity className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{act.desc}</p>
                              <p className="text-xs text-muted-foreground">{act.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
}
