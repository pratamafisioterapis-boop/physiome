import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal.jsx';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import Select from '@/components/Select.jsx';
import TextArea from '@/components/TextArea.jsx';
import VideoPlayerComponent from './VideoPlayerComponent.jsx';
import VideoManagementModal from './VideoManagementModal.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { toast } from 'sonner';
import { Video } from 'lucide-react';

const EditExerciseModal = ({ isOpen, onClose, onSuccess, exercise }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  // Video dikelola terpisah (tersimpan seketika), jadi form ini menyimpan
  // salinannya hanya untuk pratinjau - bukan untuk dikirim saat "Save".
  const [videoState, setVideoState] = useState({ video_url: null, thumbnail_url: null });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    body_region: '',
    difficulty: 'Beginner',
    instructions: '',
    contraindications: '',
    progression_tips: ''
  });

  useEffect(() => {
    if (isOpen && exercise) {
      setFormData({
        name: exercise.name || '',
        description: exercise.description || '',
        body_region: exercise.body_region || '',
        difficulty: exercise.difficulty || 'Beginner',
        instructions: exercise.instructions || '',
        contraindications: exercise.contraindications || '',
        progression_tips: exercise.progression_tips || ''
      });
      setVideoState({
        video_url: exercise.video_url || exercise.gif_url || null,
        thumbnail_url: exercise.thumbnail_url || null
      });
    }
  }, [isOpen, exercise]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiServerClient.fetch(`/exercises/${exercise.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      toast.success('Exercise updated successfully');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to update exercise');
    } finally {
      setIsLoading(false);
    }
  };

  // VideoManagementModal sudah menyimpan ke server; di sini cukup selaraskan
  // pratinjau lokal dan beri tahu daftar latihan agar ikut menyegarkan.
  const handleVideoUpdated = (updated) => {
    setVideoState({ video_url: updated?.video_url || null, thumbnail_url: updated?.thumbnail_url || null });
    onSuccess?.();
  };

  return (
    <>
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Edit Exercise"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSubmit} isLoading={isLoading}>Save Changes</Button>
        </div>
      }
    >
      <form className="space-y-4">
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
        <TextArea label="Description" name="description" value={formData.description} onChange={handleChange} />
        <TextArea 
          label="Instructions" 
          name="instructions" 
          value={formData.instructions} 
          onChange={handleChange} 
          placeholder="Step-by-step guide..."
        />
        <div className="grid grid-cols-2 gap-4">
          <TextArea 
            label="Contraindications" 
            name="contraindications" 
            value={formData.contraindications} 
            onChange={handleChange} 
          />
          <TextArea 
            label="Progression Tips" 
            name="progression_tips" 
            value={formData.progression_tips} 
            onChange={handleChange} 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Body Region" name="body_region" value={formData.body_region} onChange={handleChange} />
          <Select label="Difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange} options={[
            { label: 'Beginner', value: 'Beginner' },
            { label: 'Intermediate', value: 'Intermediate' },
            { label: 'Advanced', value: 'Advanced' }
          ]} />
        </div>
        <div className="space-y-2 rounded-xl border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">Video peragaan</p>
              <p className="text-xs text-muted-foreground">
                {videoState.video_url ? 'Video sudah terpasang untuk latihan ini.' : 'Belum ada video untuk latihan ini.'}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="shrink-0"
              onClick={() => setIsVideoModalOpen(true)}
            >
              <Video className="w-4 h-4 mr-2" /> {videoState.video_url ? 'Kelola video' : 'Tambah video'}
            </Button>
          </div>

          {videoState.video_url && (
            <VideoPlayerComponent
              videoUrl={videoState.video_url}
              thumbnailUrl={videoState.thumbnail_url}
              title={formData.name || 'Exercise Preview'}
            />
          )}

          <p className="text-[10px] text-muted-foreground">
            Perubahan video tersimpan langsung, terpisah dari tombol &ldquo;Save Changes&rdquo;.
          </p>
        </div>
      </form>
    </Modal>

    <VideoManagementModal
      isOpen={isVideoModalOpen}
      onClose={() => setIsVideoModalOpen(false)}
      exercise={{ ...exercise, ...videoState }}
      onUpdate={handleVideoUpdated}
    />
    </>
  );
};

export default EditExerciseModal;