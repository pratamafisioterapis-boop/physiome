
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Search } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext';

export default function AssignProgramModal({ isOpen, onClose, programId }) {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    patient_id: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    therapist_notes: ''
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

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patient_id || !formData.start_date || !formData.end_date) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsLoading(true);
    try {
      await apiServerClient.fetch('/program-assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          program_id: programId,
          status: 'Active'
        })
      });
      
      toast.success('Program assigned successfully');
      onClose();
    } catch (error) {
      console.error('Error assigning program:', error);
      toast.error('Failed to assign program');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Program to Patient</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Patient *</Label>
            <Select 
              value={formData.patient_id} 
              onValueChange={(val) => setFormData({...formData, patient_id: val})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                <div className="flex items-center px-3 pb-2 pt-1 border-b sticky top-0 bg-popover z-10">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <input
                    placeholder="Search patient..."
                    className="flex h-8 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()} // Mencegah Select menutup saat mengetik spasi
                  />
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  {filteredPatients.length === 0 ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">No patient found.</div>
                  ) : (
                    filteredPatients.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))
                  )}
                </div>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Input 
                type="date" 
                value={formData.start_date} 
                onChange={(e) => setFormData({...formData, start_date: e.target.value})} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label>End Date *</Label>
              <Input 
                type="date" 
                value={formData.end_date} 
                onChange={(e) => setFormData({...formData, end_date: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Therapist Notes</Label>
            <Textarea 
              value={formData.therapist_notes} 
              onChange={(e) => setFormData({...formData, therapist_notes: e.target.value})} 
              placeholder="Special instructions for the patient..."
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Assigning...' : 'Assign Program'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
