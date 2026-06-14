import React, { useState, useEffect } from 'react';
import { Presentation, Clock, Dumbbell, ArrowRight, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/Button.jsx';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet';

export default function SavedProgramsPage() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrograms = async () => {
    try {
      const data = await apiServerClient.fetch('/exercise-programs');
      setPrograms(Array.isArray(data) ? data : (data.data || []));
    } catch (error) {
      console.error("Error fetching programs:", error);
      toast.error("Failed to load saved programs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program?")) return;
    try {
      await apiServerClient.fetch(`/exercise-programs/${id}`, { method: 'DELETE' });
      toast.success("Program deleted successfully");
      fetchPrograms();
    } catch (error) {
      toast.error("Failed to delete program");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Helmet><title>Saved Programs | Physiome</title></Helmet>
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
        <Header title="Saved Programs" />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground mb-2">My Saved Programs</h2>
              <p className="text-muted-foreground text-lg">Manage your custom exercise protocols.</p>
            </div>
            <Button onClick={() => navigate('/program-builder')}>Create New</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              [1, 2, 3].map(i => (
                <Card key={i} className="border border-border shadow-sm flex flex-col h-full animate-pulse">
                  <CardHeader><Skeleton className="h-6 w-24 mb-2" /><Skeleton className="h-8 w-full" /></CardHeader>
                  <CardContent className="flex-1"><Skeleton className="h-20 w-full" /></CardContent>
                </Card>
              ))
            ) : programs.length > 0 ? (
              programs.map(p => (
                <Card key={p.id} className="border border-border shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{p.body_region || 'General'}</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/program-builder?template=${p.id}`)} className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)} className="h-8 w-8 p-0 text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{p.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground mb-6 line-clamp-3">{p.description || 'No description provided.'}</p>
                    <div className="flex gap-4 text-sm font-medium">
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Dumbbell className="w-4 h-4 text-primary" /> {Array.isArray(p.exercises) ? p.exercises.length : 0} exercises
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-border/50">
                    <Button className="w-full" variant="outline" onClick={() => navigate(`/program-builder?template=${p.id}`)}>
                      Open in Builder <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
                <p className="text-muted-foreground">You haven't saved any custom programs yet.</p>
                <Button variant="link" onClick={() => navigate('/program-builder')} className="mt-2">Create your first program</Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}