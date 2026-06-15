import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PlayCircle, CheckCircle2, Calendar, Clock, ClipboardList } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

const MyExerciseProgramsPage = () => {
  const [activeTab, setActiveTab] = useState('active');
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrograms = async () => {
    if (!currentUser) return;
    try {
      const data = await apiServerClient.fetch('/program-assignments');
      setPrograms(Array.isArray(data) ? data : (data.data || []));
    } catch (error) {
      console.error("Error fetching patient programs:", error);
      toast.error("Failed to load your programs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [currentUser]);

  const activePrograms = programs.filter(p => p.status === 'Active');
  const completedPrograms = programs.filter(p => p.status === 'Completed');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* ... (kode yang sudah ada) ... */}
      <Helmet><title>My Programs | Physiome</title></Helmet>
      
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">My Exercise Programs</h1>
        <p className="text-muted-foreground mt-1">Manage and track your prescribed rehabilitation routines.</p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {isLoading ? (
            [1, 2].map(i => (
              <Card key={i} className="h-48 animate-pulse bg-muted/50 border-none shadow-sm" />
            ))
          ) : activePrograms.length > 0 ? (
            activePrograms.map(prog => (
              <Card key={prog.id} className="border-0 shadow-soft overflow-hidden">
                <div className="h-2 bg-primary w-full" />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">{prog.program_name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Ends on {new Date(prog.end_date).toLocaleDateString()}</p>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">Active</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-foreground/80 line-clamp-2">{prog.therapist_notes || 'Follow your daily routine to speed up recovery.'}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" /> Start: {new Date(prog.start_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" /> Next Session: Today
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Session Adherence</span>
                      <span>{prog.adherence_rate || 0}%</span>
                    </div>
                    <Progress value={prog.adherence_rate || 0} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 pt-4 border-t border-border/50 flex gap-3">
                  <Button 
                    className="flex-1 rounded-xl shadow-sm"
                    onClick={() => navigate(`/patient/programs/${prog.id}`)}
                  >
                    <PlayCircle className="w-4 h-4 mr-2" /> Start Session
                  </Button>
                  <Button 
                    variant="outline" 
                    className="rounded-xl"
                    onClick={() => navigate(`/patient/programs/${prog.id}`)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-16 bg-card rounded-2xl border border-border shadow-sm">
              <ClipboardList className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No active programs</h3>
              <p className="text-muted-foreground text-sm mt-1">Contact your therapist to assign a new program.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedPrograms.length > 0 ? (
            completedPrograms.map(prog => (
              <Card key={prog.id} className="border-0 shadow-soft opacity-80">
                <CardHeader>
                  <CardTitle className="text-xl mb-1">{prog.program_name}</CardTitle>
                  <p className="text-sm text-muted-foreground">Completed on {new Date(prog.updated_at).toLocaleDateString()}</p>
                </CardHeader>
                <CardFooter className="bg-muted/30 pt-4 border-t border-border/50">
                  <Button variant="outline" className="w-full rounded-xl" onClick={() => navigate(`/patient/programs/${prog.id}`)}>Review History</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-16 bg-card rounded-2xl border border-border shadow-sm">
              <CheckCircle2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No completed programs yet</h3>
              <p className="text-muted-foreground text-sm mt-1">Keep up the good work on your active programs!</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          <div className="text-center py-16 bg-card rounded-2xl border border-border shadow-sm">
            <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground">Program history is empty</h3>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyExerciseProgramsPage;
