import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import Select from '@/components/Select.jsx';
import RichTextEditor from '@/components/admin/RichTextEditor.jsx';
import TagInput from '@/components/admin/TagInput.jsx';
import ImageUpload from '@/components/admin/ImageUpload.jsx';
import VideoUpload from '@/components/admin/VideoUpload.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';

const AddExercisePage = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    body_region: '',
    category: '',
    difficulty: 'Beginner',
    target_muscles: [],
    equipment_needed: [],
    instructions: '',
    video_url: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.body_region) {
      toast.error('Please fill required fields');
      return;
    }
    setIsSaving(true);
    try {
      const { target_muscles, ...rest } = formData;
      const data = {
        ...rest,
        equipment_needed: formData.equipment_needed,
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      };
      await apiServerClient.fetch('/exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      toast.success('Exercise created successfully');
      navigate('/admin/exercises');
    } catch (error) {
      toast.error('Failed to create exercise');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Helmet><title>Add Exercise | Admin</title></Helmet>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => navigate('/admin/exercises')} className="p-2 hover:bg-muted rounded-full"><ArrowLeft className="w-5 h-5" /></button>
                  <h1 className="text-2xl font-bold text-foreground">Add New Exercise</h1>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => navigate('/admin/exercises')}>Cancel</Button>
                  <Button onClick={handleSubmit} disabled={isSaving} className="gap-2"><Save className="w-4 h-4" /> Publish</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="admin-card space-y-4">
                    <h2 className="text-lg font-semibold border-b border-border pb-2">Basic Info</h2>
                    <Input label="Exercise Name *" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} />
                    <RichTextEditor label="Description" value={formData.description} onChange={val=>setFormData({...formData, description: val})} />
                    <RichTextEditor label="Instructions" value={formData.instructions} onChange={val=>setFormData({...formData, instructions: val})} />
                  </div>
                  
                  <div className="admin-card space-y-4">
                    <h2 className="text-lg font-semibold border-b border-border pb-2">Classification</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <Select label="Body Region *" value={formData.body_region} onChange={e=>setFormData({...formData, body_region: e.target.value})} options={[{label:'Neck',value:'Neck'},{label:'Shoulder',value:'Shoulder'},{label:'Knee',value:'Knee'}]} />
                      <Select label="Category *" value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} options={[{label:'Strengthening',value:'Strengthening'},{label:'Stretching',value:'Stretching'}]} />
                      <Select label="Difficulty *" value={formData.difficulty} onChange={e=>setFormData({...formData, difficulty: e.target.value})} options={[{label:'Beginner',value:'Beginner'},{label:'Intermediate',value:'Intermediate'},{label:'Advanced',value:'Advanced'}]} />
                    </div>
                    <TagInput label="Target Muscles" value={formData.target_muscles} onChange={val=>setFormData({...formData, target_muscles: val})} />
                    <TagInput label="Equipment Needed" value={formData.equipment_needed} onChange={val=>setFormData({...formData, equipment_needed: val})} />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="admin-card space-y-4">
                    <h2 className="text-lg font-semibold border-b border-border pb-2">Media</h2>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Thumbnail Image</label>
                      <ImageUpload onChange={() => {}} />
                    </div>
                    <VideoUpload value={formData.video_url} onChange={val=>setFormData({...formData, video_url: val})} />
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AddExercisePage;