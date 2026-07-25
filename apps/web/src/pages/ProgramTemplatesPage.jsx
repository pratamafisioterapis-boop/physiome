
import React, { useState, useEffect } from 'react';
import { Presentation, Clock, Dumbbell, ArrowRight, Eye, ShieldAlert, Target, Repeat } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import Modal from '@/components/Modal.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext.jsx';

export default function ProgramTemplatesPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState(null);

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
            <p className="text-muted-foreground text-lg">
              {isLoading
                ? 'Start faster with evidence-based rehabilitation protocols.'
                : `${templates.length} protokol rehabilitasi siap pakai, lengkap dengan dosis, kriteria progresi, dan sumber bukti.`}
            </p>
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
                    {t.indication && <p className="text-sm text-muted-foreground mt-1">{t.indication}</p>}
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground mb-4 line-clamp-3">{t.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm font-medium text-foreground">
                      <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-lg">
                        <Dumbbell className="w-4 h-4 text-muted-foreground" /> {t.exercisesCount || 0} exercises
                      </div>
                      <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-lg">
                        <Clock className="w-4 h-4 text-muted-foreground" /> {t.expected_duration}
                      </div>
                      {t.frequency && (
                        <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-lg">
                          <Repeat className="w-4 h-4 text-muted-foreground" /> {t.frequency}
                        </div>
                      )}
                      {t.evidence_level && (
                        <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-lg" title={t.evidence_source || ''}>
                          Bukti {t.evidence_level}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-border/50 flex flex-wrap gap-2">
                    <Button variant="ghost" size="sm" className="w-full justify-center" onClick={() => setPreview(t)}>
                      <Eye className="w-4 h-4 mr-2" /> Lihat detail protokol
                    </Button>
                    {currentUser?.role === 'super_admin' ? (
                      <>
                        <Button className="flex-1" variant="outline" onClick={() => navigate(`/program-builder?program=${t.id}`)}>
                          Edit Template
                        </Button>
                        <Button className="flex-1" onClick={() => navigate(`/program-builder?template=${t.id}`)}>
                          Use Template <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </>
                    ) : (
                      <Button className="w-full" variant="secondary" onClick={() => navigate(`/program-builder?template=${t.id}`)}>
                        Use Template <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
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

      {preview && (
        <Modal isOpen={!!preview} onClose={() => setPreview(null)} title={preview.name} size="xl">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {preview.body_region && <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">{preview.body_region}</Badge>}
              {preview.phase && <Badge variant="outline">{preview.phase}</Badge>}
              {preview.difficulty && <Badge variant="outline">{preview.difficulty}</Badge>}
              {preview.frequency && <Badge variant="outline">{preview.frequency}</Badge>}
            </div>

            <p className="text-foreground leading-relaxed">{preview.description}</p>

            {preview.clinical_goal && (
              <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Tujuan klinis
                </h4>
                <p className="text-foreground">{preview.clinical_goal}</p>
              </div>
            )}

            {Array.isArray(preview.exercises) && preview.exercises.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" /> Isi program ({preview.exercises.length} latihan)
                </h4>
                <ol className="space-y-2">
                  {preview.exercises.map((item, index) => (
                    <li key={item.id || index} className="bg-card border border-border rounded-xl p-3">
                      <div className="flex justify-between gap-3">
                        <span className="font-semibold text-foreground">{index + 1}. {item.name}</span>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {[
                            item.sets && `${item.sets} set`,
                            item.reps > 1 && `${item.reps} rep`,
                            item.hold_duration > 0 && `tahan ${item.hold_duration}s`,
                          ].filter(Boolean).join(' · ')}
                        </span>
                      </div>
                      {item.notes && <p className="text-sm text-muted-foreground mt-1">{item.notes}</p>}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {preview.precautions && (
              <div className="bg-destructive/5 p-5 rounded-2xl border border-destructive/20">
                <h4 className="text-xs font-bold uppercase tracking-widest text-destructive mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" /> Perhatian &amp; tanda bahaya
                </h4>
                <p className="text-foreground whitespace-pre-wrap">{preview.precautions}</p>
              </div>
            )}

            {preview.progression_criteria && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Kriteria progresi</h4>
                <p className="text-foreground">{preview.progression_criteria}</p>
              </div>
            )}

            {preview.patient_education && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Edukasi pasien</h4>
                <p className="text-foreground">{preview.patient_education}</p>
              </div>
            )}

            {preview.evidence_source && (
              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Sumber bukti{preview.evidence_level ? ` (tingkat ${preview.evidence_level})` : ''}: </span>
                  {preview.evidence_source}
                </p>
              </div>
            )}

            <Button className="w-full" onClick={() => navigate(`/program-builder?template=${preview.id}`)}>
              Use Template <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
