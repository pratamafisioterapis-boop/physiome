import React, { useState } from 'react';
import Modal from '@/components/Modal.jsx';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import Select from '@/components/Select.jsx';
import TextArea from '@/components/TextArea.jsx';
import VideoPlayerComponent from './VideoPlayerComponent.jsx';
import VideoPickerModal from './VideoPickerModal.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { toast } from 'sonner';
import { Search } from 'lucide-react';

const AddExerciseModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoPickerOpen, setIsVideoPickerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    body_region: '',
    difficulty: 'Beginner',
    thumbnail_url: '',
    video_url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Otomatis isi thumbnail jika video_url adalah link YouTube dan thumbnail masih kosong
      if (name === 'video_url' && value) {
        const isYouTube = value.includes('youtube.com') || value.includes('youtu.be');
        if (isYouTube) {
          const videoId = value.includes('v=') 
            ? value.split('v=')[1]?.split('&')[0] 
            : value.split('/').pop();
          
          if (videoId && !prev.thumbnail_url) {
            newData.thumbnail_url = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
          }
        }
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return toast.error("Exercise name is required");
    
    setIsLoading(true);
    try {
      await apiServerClient.fetch('/exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      toast.success('Exercise added successfully');
      onSuccess();
      onClose();
      setFormData({ name: '', description: '', body_region: '', difficulty: 'Beginner', thumbnail_url: '', video_url: '' });
    } catch (error) {
      toast.error(error.message || 'Failed to add exercise');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoSelect = (video) => {
    setFormData(prev => ({
      ...prev,
      video_url: video.video_url,
      thumbnail_url: video.thumbnail_url || prev.thumbnail_url
    }));
    setIsVideoPickerOpen(false);
    toast.info(`Selected video: ${video.name}`);
  };

  return (
    <>
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Add New Exercise"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSubmit} isLoading={isLoading}>Add Exercise</Button>
        </div>
      }
    >
      <form className="space-y-4">
        <Input
          label="Exercise Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Quad Sets"
          required
        />
        <TextArea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Explain how to perform the exercise..."
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Body Region"
            name="body_region"
            value={formData.body_region}
            onChange={handleChange}
            placeholder="e.g. Knee, Back"
          />
          <Select
            label="Difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            options={[
              { label: 'Beginner', value: 'Beginner' },
              { label: 'Intermediate', value: 'Intermediate' },
              { label: 'Advanced', value: 'Advanced' }
            ]}
          />
        </div>
        <Input
          label="Thumbnail URL (Image)"
          name="thumbnail_url"
          value={formData.thumbnail_url}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Video/GIF URL</label>
          <div className="flex gap-2">
            <Input
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              placeholder="Paste link or browse library..."
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              className="shrink-0 h-10 border-dashed hover:border-primary hover:text-primary"
              onClick={() => setIsVideoPickerOpen(true)}
            >
              <Search className="w-4 h-4 mr-2" /> Browse
            </Button>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground -mt-3">Supports YouTube embeds and direct MP4/MOV links.</p>

        {formData.video_url && (
          <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Video Preview</label>
            <VideoPlayerComponent 
              videoUrl={formData.video_url} 
              thumbnailUrl={formData.thumbnail_url} 
              title={formData.name || 'Exercise Preview'} 
            />
          </div>
        )}
      </form>
    </Modal>

    <VideoPickerModal 
      isOpen={isVideoPickerOpen}
      onClose={() => setIsVideoPickerOpen(false)}
      onSelect={handleVideoSelect}
    />
    </>
  );
};

export default AddExerciseModal;