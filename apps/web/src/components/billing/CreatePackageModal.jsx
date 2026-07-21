
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';

export default function CreatePackageModal({ isOpen, onClose, onSuccess, editPackage = null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sessions: 1,
    validity_days: 30,
    price: 0,
    description: '',
    active: true
  });

  useEffect(() => {
    if (editPackage) {
      setFormData({
        name: editPackage.name,
        sessions: editPackage.sessions,
        validity_days: editPackage.validity_days,
        price: editPackage.price,
        description: editPackage.description || '',
        active: editPackage.active
      });
    } else {
      setFormData({
        name: '',
        sessions: 1,
        validity_days: 30,
        price: 0,
        description: '',
        active: true
      });
    }
  }, [editPackage, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = { ...formData };

      if (editPackage) {
        await apiServerClient.fetch(`/packages/${editPackage.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        toast.success('Package updated successfully');
      } else {
        await apiServerClient.fetch('/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        toast.success('Package created successfully');
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving package:', error);
      toast.error('Failed to save package');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editPackage ? 'Edit Package' : 'Create New Package'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Package Name</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sessions">Number of Sessions</Label>
              <Input 
                id="sessions" 
                type="number" 
                min="1" 
                value={formData.sessions} 
                onChange={(e) => setFormData({...formData, sessions: parseInt(e.target.value)})} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validity">Validity (Days)</Label>
              <Input 
                id="validity" 
                type="number" 
                min="1" 
                value={formData.validity_days} 
                onChange={(e) => setFormData({...formData, validity_days: parseInt(e.target.value)})} 
                required 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input 
              id="price" 
              type="number" 
              min="0" 
              step="0.01" 
              value={formData.price} 
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})} 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="active" className="cursor-pointer">Active Status</Label>
            <Switch 
              id="active" 
              checked={formData.active} 
              onCheckedChange={(checked) => setFormData({...formData, active: checked})} 
            />
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Package'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
