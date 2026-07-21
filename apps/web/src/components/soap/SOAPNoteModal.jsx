
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RichTextEditor from '@/components/RichTextEditor.jsx';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext';

export default function SOAPNoteModal({ isOpen, onClose, onSuccess, editNote = null }) {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient_id: '',
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });

  useEffect(() => {
    const fetchPatients = async () => {
      if (!currentUser?.clinic_id) return;
      try {
        const records = await apiServerClient.fetch('/patients');
        setPatients(records);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    if (isOpen) fetchPatients();
  }, [currentUser, isOpen]);

  useEffect(() => {
    if (editNote) {
      setFormData({
        patient_id: editNote.patient_id,
        subjective: editNote.subjective || '',
        objective: editNote.objective || '',
        assessment: editNote.assessment || '',
        plan: editNote.plan || ''
      });
    } else {
      setFormData({
        patient_id: '',
        subjective: '',
        objective: '',
        assessment: '',
        plan: ''
      });
    }
  }, [editNote, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patient_id) {
      toast.error('Please select a patient');
      return;
    }

    setIsLoading(true);
    try {
      const data = { ...formData };

      if (editNote) {
        await apiServerClient.fetch(`/soap-notes/${editNote.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        toast.success('SOAP note updated');
      } else {
        await apiServerClient.fetch('/soap-notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        toast.success('SOAP note created');
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Failed to save SOAP note');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editNote ? 'Edit SOAP Note' : 'Create SOAP Note'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Patient</Label>
            <Select
              value={formData.patient_id}
              onValueChange={(val) => setFormData({...formData, patient_id: val})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <RichTextEditor 
            id="subjective"
            label="Subjective (S)" 
            value={formData.subjective} 
            onChange={(val) => setFormData({...formData, subjective: val})} 
            placeholder="Patient's chief complaints, history of present illness..."
          />
          <RichTextEditor 
            id="objective"
            label="Objective (O)" 
            value={formData.objective} 
            onChange={(val) => setFormData({...formData, objective: val})} 
            placeholder="Vital signs, physical exam findings, lab results..."
          />
          <RichTextEditor 
            id="assessment"
            label="Assessment (A)" 
            value={formData.assessment} 
            onChange={(val) => setFormData({...formData, assessment: val})} 
            placeholder="Diagnosis, clinical impression..."
          />
          <RichTextEditor 
            id="plan"
            label="Plan (P)" 
            value={formData.plan} 
            onChange={(val) => setFormData({...formData, plan: val})} 
            placeholder="Treatment plan, medications, follow-up..."
          />

          <DialogFooter className="pt-4 flex justify-between sm:justify-between">
            <Button type="button" variant="outline" onClick={handlePrint}>Print</Button>
            <div className="flex gap-2">
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Note'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
