
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { toast } from 'sonner';

const AssignToProgramModal = ({ isOpen, onClose, programId, programName, onAssigned }) => {
  const { currentUser } = useAuth();
  const [patients, setPatients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    therapist_notes: '',
    status: 'Active'
  });

  useEffect(() => {
    const fetchPatients = async () => {
      if (!currentUser?.clinic_id) return;
      try {
        const records = await apiServerClient.fetch('/patients');
        setPatients([...records].sort((a, b) => (a.name || '').localeCompare(b.name || '')));
      } catch (error) {
        console.error('Failed to load patients', error);
      }
    };
    if (isOpen) fetchPatients();
  }, [isOpen, currentUser]);

  const handleSubmit = async () => {
    if (!formData.patient_id || !formData.start_date || !formData.end_date) {
      toast.error('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiServerClient.fetch('/program-assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          program_id: programId,
          patient_id: formData.patient_id,
          start_date: formData.start_date,
          end_date: formData.end_date,
          therapist_notes: formData.therapist_notes,
          status: formData.status
        })
      });

      toast.success('Program successfully assigned to patient.');
      onAssigned();
      onClose();
    } catch (error) {
      toast.error('Failed to assign program.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Program</DialogTitle>
          <DialogDescription>Assign <span className="font-semibold text-foreground">{programName}</span> to a patient.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Patient *</Label>
            <Select value={formData.patient_id} onValueChange={v => setFormData({...formData, patient_id: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Select patient..." />
              </SelectTrigger>
              <SelectContent>
                {patients.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Input 
                type="date" 
                value={formData.start_date} 
                onChange={e => setFormData({...formData, start_date: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <Label>End Date *</Label>
              <Input 
                type="date" 
                value={formData.end_date} 
                onChange={e => setFormData({...formData, end_date: e.target.value})} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Therapist Notes</Label>
            <Textarea 
              placeholder="Instructions or notes for the patient..." 
              value={formData.therapist_notes} 
              onChange={e => setFormData({...formData, therapist_notes: e.target.value})} 
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Assigning...' : 'Assign Program'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignToProgramModal;
