
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import ConversationHistory from '@/components/ai/ConversationHistory.jsx';
import AIResponseCard from '@/components/ai/AIResponseCard.jsx';
import ModifyProgramModal from '@/components/ai/ModifyProgramModal.jsx';
import AssignToProgramModal from '@/components/ai/AssignToProgramModal.jsx';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Sparkles, Trash2, Brain, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx'; // Pastikan useAuth diimpor
import { useIntegratedAi } from '@/hooks/use-integrated-ai.jsx';
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet';

const STORAGE_KEY = 'ai_generator_form';

const AIExerciseProgramGeneratorPage = () => {
  const { currentUser } = useAuth();
  const { messages, sendMessage, isStreaming, clearMessages } = useIntegratedAi();

  const [formState, setFormState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      diagnosis: '',
      painLevel: 5,
      age: '',
      bodyRegion: '',
      functionalLimitation: '',
      recoveryStage: '',
      additionalNotes: ''
    };
  });

  const [aiData, setAiData] = useState(null);
  const [activeProgramId, setActiveProgramId] = useState(null);
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [parseError, setParseError] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
  }, [formState]);

  // Extract JSON from latest assistant message
  useEffect(() => {
    if (isStreaming) {
      setParseError(false);
      return;
    }
    
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant') {
      try {
        const jsonMatch = lastMessage.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.program_goal && parsed.exercises) {
            setAiData(parsed);
            setParseError(false);
          } else {
            setParseError(true);
          }
        } else {
          setParseError(true);
        }
      } catch (err) {
        setParseError(true);
      }
    }
  }, [messages, isStreaming]);

  const handleGenerate = (e) => {
    if(e) e.preventDefault();
    if (!formState.diagnosis || !formState.bodyRegion || !formState.recoveryStage) {
      toast.error('Please fill in Diagnosis, Body Region, and Recovery Stage');
      return;
    }

    setAiData(null);
    setParseError(false);
    clearMessages();
    setActiveProgramId(null);

    const prompt = `Generate a rehabilitation program based on this patient profile:
    - Diagnosis: ${formState.diagnosis}
    - Pain Level: ${formState.painLevel}/10
    - Age: ${formState.age}
    - Body Region: ${formState.bodyRegion}
    - Functional Limitation: ${formState.functionalLimitation}
    - Recovery Stage: ${formState.recoveryStage}
    - Additional Notes: ${formState.additionalNotes}
    
    Return ONLY valid JSON matching the exact system instructions structure.`;

    sendMessage(prompt);
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleGenerate();
    }
  };

  const handleClearForm = () => {
    setFormState({
      diagnosis: '', painLevel: 5, age: '', bodyRegion: '', functionalLimitation: '', recoveryStage: '', additionalNotes: ''
    });
    localStorage.removeItem(STORAGE_KEY);
    clearMessages();
    setAiData(null);
    setActiveProgramId(null);
  };

  const saveProgramToDb = async (status = 'Active') => {
    if (!aiData) return null;
    try {
      const record = await pb.collection('exercise_programs').create({
        name: `${formState.diagnosis} Program`,
        description: aiData.program_goal,
        clinical_goal: aiData.program_goal,
        body_region: formState.bodyRegion,
        expected_duration: aiData.exercises[0]?.duration || '4 weeks',
        exercises: aiData.exercises,
        created_by: currentUser.id,
        clinic_id: currentUser.clinic_id,
        status: status,
        ai_generated: true,
        ai_confidence_score: aiData.confidence_score,
        ai_prompt: `Diagnosis: ${formState.diagnosis}, Stage: ${formState.recoveryStage}`
      }, { $autoCancel: false });
      
      setActiveProgramId(record.id);

      // Create history record
      await pb.collection('AIGenerationHistory').create({
        user_id: currentUser.id,
        diagnosis: formState.diagnosis,
        pain_level: formState.painLevel,
        age: parseInt(formState.age) || null,
        body_region: formState.bodyRegion,
        functional_limitation: formState.functionalLimitation,
        recovery_stage: formState.recoveryStage,
        program_id: record.id,
        confidence_score: aiData.confidence_score,
        clinic_id: currentUser.clinic_id
      }, { $autoCancel: false });

      return record.id;
    } catch (err) {
      toast.error('Failed to save program');
      console.error(err);
      return null;
    }
  };

  const handleAccept = async () => {
    const id = await saveProgramToDb('Active');
    if (id) toast.success('Program saved to library successfully');
  };

  const handleSaveDraft = async () => {
    const id = await saveProgramToDb('Draft');
    if (id) toast.success('Program saved as draft');
  };

  const handleAssign = async () => {
    let id = activeProgramId;
    if (!id) {
      id = await saveProgramToDb('Active');
    }
    if (id) {
      setIsAssignOpen(true);
    }
  };

  const getPainColor = (level) => {
    if (level <= 3) return 'bg-success';
    if (level <= 6) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <>
      <Helmet><title>AI Program Generator | Physiome</title></Helmet>
      <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 h-screen">
          <Header />
          <main className="flex-1 flex overflow-hidden">
            
            <ConversationHistory />

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              
              {/* Left Column: Form */}
              <div className="w-full lg:w-[450px] xl:w-[500px] border-r border-border bg-card p-6 overflow-y-auto">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-foreground display-font flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" /> AI Generator
                  </h1>
                  <p className="text-muted-foreground text-sm mt-1">
                    Describe clinical presentation to build a custom protocol.
                  </p>
                </div>

                <form onKeyDown={handleKeyDown} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="diagnosis">Clinical Diagnosis *</Label>
                      <Input 
                        id="diagnosis" 
                        placeholder="e.g. Rotator Cuff Tendinopathy"
                        value={formState.diagnosis}
                        onChange={e => setFormState({...formState, diagnosis: e.target.value})}
                        className="bg-background text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Current Pain Level: <span className="font-bold">{formState.painLevel}</span></Label>
                        <div className={`w-3 h-3 rounded-full ${getPainColor(formState.painLevel)}`}></div>
                      </div>
                      <Slider 
                        value={[formState.painLevel]} 
                        max={10} step={1}
                        onValueChange={v => setFormState({...formState, painLevel: v[0]})}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0 (None)</span><span>10 (Severe)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Age</Label>
                        <Input type="number" min="1" max="120" placeholder="e.g. 45" value={formState.age} onChange={e => setFormState({...formState, age: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label>Body Region *</Label>
                        <Select value={formState.bodyRegion} onValueChange={v => setFormState({...formState, bodyRegion: v})}>
                          <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                          <SelectContent>
                            {['Neck', 'Shoulder', 'Elbow', 'Wrist', 'Upper Back', 'Lower Back', 'Hip', 'Knee', 'Ankle'].map(r => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Recovery Stage *</Label>
                      <Select value={formState.recoveryStage} onValueChange={v => setFormState({...formState, recoveryStage: v})}>
                        <SelectTrigger><SelectValue placeholder="Select stage" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Acute (0-7 days)">Acute (0-7 days)</SelectItem>
                          <SelectItem value="Subacute (1-6 weeks)">Subacute (1-6 weeks)</SelectItem>
                          <SelectItem value="Chronic (>6 weeks)">Chronic (&gt;6 weeks)</SelectItem>
                          <SelectItem value="Return to Sport/Function">Return to Sport/Function</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Functional Limitations</Label>
                      <Textarea placeholder="e.g. Cannot reach overhead, pain when sleeping on side" value={formState.functionalLimitation} onChange={e => setFormState({...formState, functionalLimitation: e.target.value})} rows={2} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Additional Notes/Precautions</Label>
                      <Textarea placeholder="Any other clinical context..." value={formState.additionalNotes} onChange={e => setFormState({...formState, additionalNotes: e.target.value})} rows={2} />
                    </div>
                  </div>

                  <div className="pt-4 border-t flex gap-3">
                    <Button type="button" variant="outline" className="w-full text-muted-foreground" onClick={handleClearForm}>
                      <Trash2 className="w-4 h-4 mr-2" /> Clear
                    </Button>
                    <Button type="button" onClick={handleGenerate} disabled={isStreaming} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Sparkles className="w-4 h-4 mr-2" /> 
                      {isStreaming ? 'Generating...' : 'Generate (Ctrl+Enter)'}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Right Column: AI Output */}
              <div className="flex-1 bg-muted/10 p-6 overflow-y-auto">
                {messages.length === 0 && !isStreaming && !aiData && (
                  <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto opacity-50">
                    <Brain className="w-16 h-16 text-primary mb-4" />
                    <h3 className="text-xl font-medium text-foreground mb-2">Ready to Generate</h3>
                    <p className="text-muted-foreground">Fill out the clinical profile and hit generate to create a data-driven, structured rehabilitation program instantly.</p>
                  </div>
                )}

                {(isStreaming || aiData) && !parseError && (
                  <AIResponseCard 
                    data={aiData}
                    rawText={messages[messages.length-1]?.content}
                    isStreaming={isStreaming}
                    onAccept={handleAccept}
                    onModify={() => setIsModifyOpen(true)}
                    onRegenerate={handleGenerate}
                    onSaveDraft={handleSaveDraft}
                    onAssign={handleAssign}
                  />
                )}

                {parseError && !isStreaming && (
                  <div className="bg-destructive/10 border border-destructive text-destructive-foreground p-6 rounded-xl text-center">
                    <AlertTriangle className="w-10 h-10 mx-auto mb-4 text-destructive" />
                    <h3 className="font-semibold text-lg mb-2">Generation Failed</h3>
                    <p className="mb-4 text-sm">The AI output could not be parsed correctly. Please try regenerating.</p>
                    <Button onClick={handleGenerate} variant="outline">Retry Generation</Button>
                    <div className="mt-4 text-left p-4 bg-background rounded-lg border text-xs overflow-auto max-h-48 text-muted-foreground">
                      {messages[messages.length-1]?.content}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </main>
        </div>
      </div>

      <ModifyProgramModal 
        isOpen={isModifyOpen} 
        onClose={() => setIsModifyOpen(false)} 
        programData={aiData} 
        onSave={(newData) => { setAiData(newData); setIsModifyOpen(false); toast.success('Program modified successfully'); }} 
      />

      <AssignToProgramModal 
        isOpen={isAssignOpen} 
        onClose={() => setIsAssignOpen(false)} 
        programId={activeProgramId}
        programName={aiData?.program_goal}
        onAssigned={() => {}}
      />
    </>
  );
};

export default AIExerciseProgramGeneratorPage;
