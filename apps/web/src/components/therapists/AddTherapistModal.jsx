import React, { useState } from 'react';
import Modal from '@/components/Modal.jsx';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { toast } from 'sonner';

const AddTherapistModal = ({ isOpen, onClose, onSuccess }) => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    specialization: '',
    licenseNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiServerClient.fetch('/therapists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          clinic_id: currentUser.clinic_id,
          role: 'therapist'
        })
      });
      toast.success('Therapist added successfully');
      onSuccess();
      onClose();
      setFormData({ 
        fullName: '', 
        email: '', 
        phone: '', 
        password: '',
        specialization: '',
        licenseNumber: '',
      });
    } catch (error) {
      toast.error(error.message || 'Failed to add therapist');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Add New Therapist"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSubmit} isLoading={isLoading}>Add Therapist</Button>
        </div>
      }
    >
      <form className="space-y-4">
        <Input
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="e.g. Dr. John Doe"
          required
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
        />
        <Input
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Input
          label="Initial Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          label="Specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder="e.g. Musculoskeletal Physiotherapy"
        />
        <Input
          label="License Number (STR)"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
          placeholder="e.g. STR-123456"
        />
      </form>
    </Modal>
  );
};

export default AddTherapistModal;