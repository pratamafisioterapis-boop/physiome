
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import Select from '@/components/Select.jsx';
import RichTextEditor from '@/components/admin/RichTextEditor.jsx';
import TagInput from '@/components/admin/TagInput.jsx';
import VideoManagementModal from '@/components/exercises/VideoManagementModal.jsx';
import VideoPlayerComponent from '@/components/exercises/VideoPlayerComponent.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import { ArrowLeft, Save, Trash2, Video } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const EditExercisePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exercise, setExercise] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    body_region: '',
    category: '',
    difficulty: 'Beginner',
    target_muscles: [],
    instructions: ''
  });

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const record = await apiServerClient.fetch(`/exercises/${id}`);
        setExercise(record);
        setFormData({
          name: record.name || '',
          description: record.description || '',
          body_region: record.body_region || '',
          category: record.category || '',
          difficulty: record.difficulty || 'Beginner',
          target_muscles: record.target_muscles ? record.target_muscles.split(', ') : [],
          instructions: record.instructions || ''
        });
      } catch (error) {
        toast.error('Failed to load exercise');
      } finally {
        setIsLoading(false);
      }
    };
    fetchExercise();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { target_muscles, ...rest } = formData;
      const data = { ...rest };
      await apiServerClient.fetch(`/exercises/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      toast.success('Exercise updated successfully');
      navigate('/admin/exercises');
    } catch (error) {
      toast.error('Failed to update exercise');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this exercise?')) return;
    try {
      await apiServerClient.fetch(`/exercises/${id}`, { method: 'DELETE' });
      toast.success('Exercise deleted successfully');
      navigate('/admin/exercises');
    } catch (error) {
      toast.error('Failed to delete exercise');
    }
  };

  if (isLoading) return <div className="min-h-screen bg-background flex justify-center items-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  const videoUrl = exercise?.video_url || null;

  return (
    <>
      <Helmet><title>Edit Exercise | Admin</title></Helmet>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => navigate('/admin/exercises')} className="p-2 hover:bg-muted rounded-full transition-colors"><ArrowLeft className="w-5 h-5" /></button>
                  <h1 className="text-2xl font-bold text-foreground">Edit Exercise</h1>
                </div>
                <div className="flex gap-3">
                  <Button variant="destructive" onClick={handleDelete} className="gap-2"><Trash2 className="w-4 h-4" /> Delete</Button>
                  <Button onClick={handleSubmit} disabled={isSaving} className="gap-2"><Save className="w-4 h-4" /> Save Changes</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-border shadow-sm">
                    <CardHeader>
                      <CardTitle>Basic Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input label="Exercise Name *" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select label="Body Region *" value={formData.body_region} onChange={e=>setFormData({...formData, body_region: e.target.value})} options={[{label:'Neck',value:'Neck'},{label:'Shoulder',value:'Shoulder'},{label:'Knee',value:'Knee'}]} />
                        <Select label="Difficulty *" value={formData.difficulty} onChange={e=>setFormData({...formData, difficulty: e.target.value})} options={[{label:'Beginner',value:'Beginner'},{label:'Intermediate',value:'Intermediate'},{label:'Advanced',value:'Advanced'}]} />
                      </div>
                      <TagInput label="Target Muscles" value={formData.target_muscles} onChange={val=>setFormData({...formData, target_muscles: val})} />
                      <RichTextEditor label="Instructions" value={formData.instructions} onChange={val=>setFormData({...formData, instructions: val})} />
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1 space-y-6">
                  <Card className="border-border shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle>Demonstration Video</CardTitle>
                      <Button variant="secondary" size="sm" onClick={() => setIsVideoModalOpen(true)}>
                        <Video className="w-4 h-4 mr-2" /> {videoUrl ? 'Manage' : 'Upload'}
                      </Button>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <VideoPlayerComponent videoUrl={videoUrl} thumbnailUrl={exercise?.thumbnail_url} />
                    </CardContent>
                  </Card>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>

      <VideoManagementModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        exercise={exercise}
        onUpdate={(updated) => setExercise(updated)}
      />
    </>
  );
};

export default EditExercisePage;
