import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal.jsx';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import Select from '@/components/Select.jsx';
import TextArea from '@/components/TextArea.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { toast } from 'sonner';

const EditExerciseModal = ({ isOpen, onClose, onSuccess, exercise }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    body_region: '',
    difficulty: 'Beginner',
    thumbnail_url: '',
    video_url: ''
  });

  useEffect(() => {
    if (isOpen && exercise) {
      setFormData({
        name: exercise.name || '',
        description: exercise.description || '',
        body_region: exercise.body_region || '',
        difficulty: exercise.difficulty || 'Beginner',
        thumbnail_url: exercise.thumbnail_url || '',
        video_url: exercise.video_url || exercise.gif_url || ''
      });
    }
  }, [isOpen, exercise]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiServerClient.fetch(`/exercises/${exercise.id}`, {
        method: 'PUT',
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

  return (
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
        <div className="grid grid-cols-2 gap-4">
          <Input label="Body Region" name="body_region" value={formData.body_region} onChange={handleChange} />
          <Select label="Difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange} options={[
            { label: 'Beginner', value: 'Beginner' },
            { label: 'Intermediate', value: 'Intermediate' },
            { label: 'Advanced', value: 'Advanced' }
          ]} />
        </div>
        <Input label="Thumbnail URL" name="thumbnail_url" value={formData.thumbnail_url} onChange={handleChange} />
        <Input label="Video/GIF URL" name="video_url" value={formData.video_url} onChange={handleChange} />
      </form>
    </Modal>
  );
};

export default EditExerciseModal;