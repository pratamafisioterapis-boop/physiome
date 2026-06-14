import React, { useState } from 'react';
import ConfirmDialog from '@/components/ConfirmDialog.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { toast } from 'sonner';

const DeleteExerciseConfirmation = ({ isOpen, onClose, onSuccess, exercise }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await apiServerClient.fetch(`/exercises/${exercise.id}`, { method: 'DELETE' });
      toast.success('Exercise deleted successfully');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to delete exercise');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Delete Exercise"
      message={`Are you sure you want to delete "${exercise?.name}"? This action cannot be undone.`}
      isLoading={isLoading}
      isDestructive
    />
  );
};

export default DeleteExerciseConfirmation;