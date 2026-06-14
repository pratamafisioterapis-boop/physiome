
import React, { useState, useEffect } from 'react';
import { Presentation, Clock, Dumbbell, ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ProgramTemplatesPage() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await apiServerClient.fetch('/exercise-programs/templates');
        // Tambahkan pengecekan format array untuk berjaga-jaga jika API membungkus data dalam objek
        const templateData = Array.isArray(data) ? data : (data.data || []);
        setTemplates(templateData);
      } catch (error) {
        console.error("Error fetching templates:", error);
        toast.error("Failed to load program templates");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
        <Header title="Program Templates" />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-foreground mb-2">Clinical Templates</h2>
            <p className="text-muted-foreground text-lg">Start faster with evidence-based rehabilitation protocols.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              [1, 2, 3].map(i => (
                <Card key={i} className="border-0 shadow-soft flex flex-col h-full">
                  <CardHeader><Skeleton className="h-6 w-24 mb-2" /><Skeleton className="h-8 w-full" /></CardHeader>
                  <CardContent className="flex-1"><Skeleton className="h-20 w-full" /></CardContent>
                </Card>
              ))
            ) : templates.length > 0 ? (
              templates.map(t => (
                <Card key={t.id} className="border-0 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col h-full">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{t.body_region || 'General'}</Badge>
                      <Presentation className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl">{t.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground mb-6 line-clamp-3">{t.description}</p>
                    <div className="flex gap-4 text-sm font-medium text-foreground">
                      <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-lg">
                        <Dumbbell className="w-4 h-4 text-muted-foreground" /> {t.exercisesCount || 0} exercises
                      </div>
                      <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-lg">
                        <Clock className="w-4 h-4 text-muted-foreground" /> {t.expected_duration}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-border/50">
                    <Button className="w-full" variant="secondary" onClick={() => navigate(`/program-builder?template=${t.id}`)}>
                      Use Template <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
                <p className="text-muted-foreground">No clinical templates found in database.</p>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
