
import React, { useState, useEffect } from 'react';
import { Search, Save, GripVertical, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import { toast } from 'sonner';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Select from '@/components/Select.jsx';



export default function ProgramBuilderPage() {

  const navigate = useNavigate();
  // const Select = SelectPrimitive.Root
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  const programId = searchParams.get('program');
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState('');
  const [programName, setProgramName] = useState('');
  const [programDesc, setProgramDesc] = useState('');
  const [clinicalGoal, setClinicalGoal] = useState('');
  const [bodyRegion, setBodyRegion] = useState('');
  const [expectedDuration, setExpectedDuration] = useState('');
  const [canvasItems, setCanvasItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTemplateEdit, setIsTemplateEdit] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await apiServerClient.fetch('/exercises');
        // Menangani jika API mengembalikan objek { data: [] } atau langsung array []
        setExercises(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        toast.error('Failed to load exercises library');
      }
    };
    fetchExercises();
  }, [currentUser]);

  // Load template data if templateId is present
  useEffect(() => {
    if (templateId || programId) {
      const fetchTemplate = async () => {
        setIsLoading(true);
        try {
          const data = await apiServerClient.fetch(`/exercise-programs/${templateId || programId}`);
          setProgramName(data.name || '');
          setProgramDesc(data.description || '');
          setClinicalGoal(data.clinical_goal || '');
          setBodyRegion(data.body_region || '');
          setExpectedDuration(data.expected_duration || '');
          
          if (programId && (!data.clinic_id || data.clinic_id === '')) {
            setIsTemplateEdit(true);
          }
          // Map exercises dari template ke format canvas
          const exercisesFromTemplate = Array.isArray(data.exercises) ? data.exercises : [];
          const items = exercisesFromTemplate.map(ex => ({
            ...ex,
            uniqueId: Math.random().toString(36).substr(2, 9),
            sets: ex.sets || 3,
            reps: ex.reps || 10,
            holdTime: ex.holdTime || 0,
            notes: ex.notes || ''
          }));
          setCanvasItems(items);
        } catch (error) {
          console.error('Error loading template:', error);
          toast.error('Failed to load template data');
        } finally {
          setIsLoading(false);
        }
      };
      fetchTemplate();
    }
  }, [templateId, programId]);

  const addToCanvas = (ex) => {
    const newItem = {
      ...ex,
      uniqueId: Math.random().toString(36).substr(2, 9),
      sets: 3,
      reps: 10,
      holdTime: 0,
      notes: ''
    };
    setCanvasItems([...canvasItems, newItem]);
  };

  const updateCanvasItem = (uniqueId, field, value) => {
    setCanvasItems(prev => prev.map(item => 
      item.uniqueId === uniqueId ? { ...item, [field]: value } : item
    ));
  };

  const removeFromCanvas = (uniqueId) => {
    setCanvasItems(canvasItems.filter(item => item.uniqueId !== uniqueId));
  };

  const handleSave = async () => {
    if(!programName) return toast.error("Please name the program.");
    if(canvasItems.length === 0) return toast.error("Add at least one exercise.");
    
    try {
      await apiServerClient.fetch('/exercise-programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: programId, // Sertakan ID untuk update
          name: programName,
          description: programDesc,
          clinical_goal: clinicalGoal,
          body_region: bodyRegion,
          expected_duration: expectedDuration,
          exercises: canvasItems,
          status: 'Active'
        })
      });
      toast.success("Program saved successfully.");
      setProgramName('');
      setProgramDesc('');
      setClinicalGoal('');
      setBodyRegion('');
      setExpectedDuration('');
      setCanvasItems([]);
      navigate('/exercise-programs');
    } catch(e) {
      toast.error(e.message);
    }
  };

  const handleEdit = async () => {
    if(!programName) return toast.error("Please name the program.");
    if(canvasItems.length === 0) return toast.error("Add at least one exercise.");
    
    try {
      await apiServerClient.fetch(`/exercise-programs/${programId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: programName,
          description: programDesc,
          clinical_goal: clinicalGoal,
          body_region: bodyRegion,
          expected_duration: expectedDuration,
          exercises: canvasItems,
          status: 'Active'
        })
      });
      toast.success("Program updated successfully.");
      setProgramName('');
      setProgramDesc('');
      setClinicalGoal('');
      setBodyRegion('');
      setExpectedDuration('');
      setCanvasItems([]);
      navigate(isTemplateEdit ? '/program-templates' : '/exercise-programs');
    } catch(e) {
      toast.error(e.message);
    }
  };

  const filteredLib = exercises.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col h-screen overflow-hidden">
        <Header title="Program Builder" />
        
        {/* Top Bar */}
        <div className="bg-card border-b border-border p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 z-10 shadow-sm">
          <div className="flex-1 flex flex-col sm:flex-row gap-4 max-w-full">
            <Input 
              placeholder="Program Name" 
              value={programName}
              onChange={e => setProgramName(e.target.value)}
              className="font-bold text-lg bg-background border-border" 
            />
            <Input 
              placeholder="Short Description" 
              value={programDesc}
              onChange={e => setProgramDesc(e.target.value)}
              className="bg-background border-border" 
            />
            <Input 
              placeholder="Clinical Goal" 
              value={clinicalGoal}
              onChange={e => setClinicalGoal(e.target.value)}
              className="bg-background border-border"
              required
            />
            <Select  
              value={bodyRegion}
              onValueChange={value => setBodyRegion(value)}
              className="bg-background border-border"
              placeholder="Select region"
              options={[
                { label: "Neck", value: "Neck" },
                { label: "Shoulder", value: "Shoulder" },
                { label: "Lower Back", value: "Lower Back" },
                { label: "Knee", value: "Knee" }
              ]}
            />
            <Select 
              value={expectedDuration}
              onValueChange={value => setExpectedDuration(value)}
              className="bg-background border-border"
              placeholder="Select duration"
              options={[
                { label: "1 Week", value: "1 Week" },
                { label: "2 weeks", value: "2 weeks" },
                { label: "4 weeks", value: "4 weeks" },
                { label: "6 weeks", value: "6 weeks" },
                { label: "8 weeks", value: "8 weeks" }
              ]}
            />
          </div>
          <Button onClick={programId ? handleEdit : handleSave} className="shadow-glow-primary rounded-full px-8 shrink-0" disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" /> {programId ? 'Update Program' : 'Save Program'}
          </Button>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Library Sidebar (Left) */}
          <div className="w-full lg:w-80 bg-muted/30 border-b lg:border-b-0 lg:border-r border-border flex flex-col h-2/5 lg:h-full overflow-hidden">
            <div className="p-4 border-b border-border/50 bg-card">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Find exercises..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 bg-background" 
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredLib.map(ex => (
                <Card key={ex.id} className="cursor-pointer hover:border-primary transition-colors shadow-sm" onClick={() => addToCanvas(ex)}>
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex-shrink-0 bg-cover bg-center" style={{backgroundImage: `url(${ex.thumbnail_url || ''})`}} />
                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-sm font-semibold truncate text-foreground">{ex.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">{ex.body_region}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary shrink-0"><Plus className="w-4 h-4" /></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Canvas (Right) */}
          <div className="flex-1 bg-background overflow-y-auto p-4 md:p-8">
            <div className="max-w-3xl mx-auto pb-20 lg:pb-0">
              {canvasItems.length === 0 ? (
                <div className="text-center py-24 border-2 border-dashed border-border rounded-2xl">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Program Canvas is Empty</h3>
                  <p className="text-muted-foreground">Click exercises from the library to add them to this program.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {canvasItems.map((item, idx) => (
                    <Card key={item.uniqueId} className="border border-border/50 shadow-soft relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center justify-center cursor-move text-muted-foreground hover:text-foreground opacity-50 group-hover:opacity-100 transition-opacity border-r border-border/50 bg-muted/50 rounded-l-xl">
                        <GripVertical className="w-4 h-4" />
                      </div>
                      <CardContent className="p-5 pl-12">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold text-lg text-foreground">{item.name}</h4>
                          <Button variant="ghost" size="sm" className="text-destructive h-8" onClick={() => removeFromCanvas(item.uniqueId)}>Remove</Button>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Sets</label>
                            <Input 
                              type="number" 
                              value={item.sets} 
                              onChange={e => updateCanvasItem(item.uniqueId, 'sets', parseInt(e.target.value) || 0)}
                              className="h-9 bg-card" 
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Reps</label>
                            <Input 
                              type="number" 
                              value={item.reps} 
                              onChange={e => updateCanvasItem(item.uniqueId, 'reps', parseInt(e.target.value) || 0)}
                              className="h-9 bg-card" 
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Hold (sec)</label>
                            <Input 
                              type="number" 
                              value={item.holdTime} 
                              onChange={e => updateCanvasItem(item.uniqueId, 'holdTime', parseInt(e.target.value) || 0)}
                              className="h-9 bg-card" 
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Notes for Patient</label>
                          <Textarea 
                            placeholder="Add specific instructions..." 
                            value={item.notes}
                            onChange={e => updateCanvasItem(item.uniqueId, 'notes', e.target.value)}
                            className="min-h-[60px] resize-none bg-card" 
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
