import React, { useState } from 'react';
import Modal from '@/components/Modal.jsx';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import Select from '@/components/Select.jsx';
import TextArea from '@/components/TextArea.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { toast } from 'sonner';

const AddExerciseModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return toast.error("Exercise name is required");
    
    setIsLoading(true);
    try {
      await apiServerClient.fetch('/exercises', {
        method: 'POST',
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

  return (
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
        <Input
          label="Video/GIF URL"
          name="video_url"
          value={formData.video_url}
          onChange={handleChange}
          placeholder="https://example.com/video.mp4"
        />
      </form>
    </Modal>
  );
};

export default AddExerciseModal;