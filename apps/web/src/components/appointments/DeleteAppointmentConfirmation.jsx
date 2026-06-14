
import React, { useState } from 'react';
import ConfirmDialog from '@/components/ConfirmDialog.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { toast } from 'sonner';

const DeleteAppointmentConfirmation = ({ isOpen, onClose, onSuccess, appointment }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!appointment) return;
    
    setIsLoading(true);
    try {
      await apiServerClient.fetch(`/appointments/${appointment.id}`, { method: 'DELETE' });
      toast.success('Appointment deleted successfully');
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete appointment.');
    } finally {
      setIsLoading(false);
    }
  };

  const patientName = appointment?.patients?.name || 'Unknown Patient';
  const date = appointment?.date ? new Date(appointment.date).toLocaleDateString() : '';

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Delete Appointment"
      message={`Are you sure you want to delete the appointment for ${patientName} on ${date} at ${appointment?.time}? This action cannot be undone.`}
      confirmText="Delete"
      isDestructive={true}
      isLoading={isLoading}
    />
  );
};

export default DeleteAppointmentConfirmation;
