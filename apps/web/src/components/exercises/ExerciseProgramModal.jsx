
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';

export default function ExerciseProgramModal({ isOpen, onClose, onSuccess, editProgram = null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    clinical_goal: '',
    body_region: '',
    expected_duration: '4 weeks',
    status: 'Active'
  });
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    if (editProgram) {
      setFormData({
        name: editProgram.name || '',
        description: editProgram.description || '',
        clinical_goal: editProgram.clinical_goal || '',
        body_region: editProgram.body_region || '',
        expected_duration: editProgram.expected_duration || '4 weeks',
        status: editProgram.status || 'Active'
      });
      setExercises(editProgram.exercises);
    } else {
      setFormData({
        name: '',
        description: '',
        clinical_goal: '',
        body_region: '',
        expected_duration: '4 weeks',
        status: 'Active'
      });
      setExercises(null);
    }
  }, [editProgram, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = editProgram ? `/exercise-programs/${editProgram.id}` : '/exercise-programs';
      const method = editProgram ? 'PUT' : 'POST';
      
      const payload = {
        ...formData,
        exercises: exercises // Memastikan data latihan tidak hilang saat edit info dasar
      };

      await apiServerClient.fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      toast.success(editProgram ? 'Program updated' : 'Program created');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving program:', error);
      toast.error('Failed to save program');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editProgram ? 'Edit Program' : 'Create Exercise Program'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Program Name *</Label>
            <Input 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Clinical Goal *</Label>
            <Input 
              value={formData.clinical_goal} 
              onChange={(e) => setFormData({...formData, clinical_goal: e.target.value})} 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Body Region</Label>
              <Select 
                value={formData.body_region} 
                onValueChange={(val) => setFormData({...formData, body_region: val})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Neck">Neck</SelectItem>
                  <SelectItem value="Shoulder">Shoulder</SelectItem>
                  <SelectItem value="Lower Back">Lower Back</SelectItem>
                  <SelectItem value="Knee">Knee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Select 
                value={formData.expected_duration} 
                onValueChange={(val) => setFormData({...formData, expected_duration: val})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2 weeks">2 weeks</SelectItem>
                  <SelectItem value="4 weeks">4 weeks</SelectItem>
                  <SelectItem value="6 weeks">6 weeks</SelectItem>
                  <SelectItem value="8 weeks">8 weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Program'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
