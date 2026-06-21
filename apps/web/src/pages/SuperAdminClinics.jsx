import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';

export default function SuperAdminClinics() {
  const [clinicsList, setClinicsList] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch clinics
  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      setLoading(true);
      const data = await apiServerClient.fetch('/super-admin/clinics');
      setClinicsList(data);
    } catch (err) {
      console.error('Failed to fetch clinics:', err);
      toast.error('Failed to fetch clinics');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectClinic = (clinic) => {
    setSelectedClinic(clinic.id);
    setFormData({
      name: clinic.name,
      phone: clinic.phone || '',
      address: clinic.address || '',
      city: clinic.city || ''
    });
    setMessage('');
  };

  const handleNewClinic = () => {
    setSelectedClinic(null);
    setFormData({
      name: '',
      phone: '',
      address: '',
      city: ''
    });
    setMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      if (!formData.name.trim()) {
        toast.error('Clinic name is required');
        return;
      }

      setSaving(true);
      let result;

      if (selectedClinic) {
        // Update existing
        await apiServerClient.fetch(`/super-admin/clinics/${selectedClinic}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        setClinicsList(prev =>
          prev.map(c => c.id === selectedClinic ? { ...c, ...formData } : c)
        );
        toast.success('Clinic updated successfully');
      } else {
        // Create new
        const result = await apiServerClient.fetch('/super-admin/clinics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        setClinicsList(prev => [...prev, result]);
        toast.success('Clinic created successfully');
        handleNewClinic();
      }

      setMessage('Changes saved successfully');
    } catch (err) {
      console.error('Failed to save clinic:', err);
      toast.error('Failed to save clinic');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this clinic?')) return;

    try {
      await apiServerClient.fetch(`/super-admin/clinics/${id}`, {
        method: 'DELETE'
      });
      setClinicsList(prev => prev.filter(c => c.id !== id));
      if (selectedClinic === id) {
        handleNewClinic();
      }
      toast.success('Clinic deleted successfully');
    } catch (err) {
      console.error('Failed to delete clinic:', err);
      toast.error('Failed to delete clinic');
    }
  };

  const handleRefresh = () => {
    fetchClinics();
    toast.success('Clinics refreshed');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background md:ml-64">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading clinics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background md:ml-64">
      <Sidebar />
      <div className="flex-1 overflow-auto w-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Clinics Management</h1>
            <p className="text-muted-foreground">Manage all clinics in the system</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.4fr] gap-6">
            {/* Clinics List */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Clinics List</h2>
                  <p className="text-sm text-muted-foreground">Pilih klinik atau buat baru</p>
                </div>
                <Button
                  onClick={handleNewClinic}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New
                </Button>
              </div>

              {clinicsList.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No clinics found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clinicsList.map((clinic) => (
                        <TableRow
                          key={clinic.id}
                          className={`cursor-pointer transition-colors ${
                            selectedClinic === clinic.id
                              ? 'bg-blue-50 hover:bg-blue-50'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleSelectClinic(clinic)}
                        >
                          <TableCell className="font-medium">{clinic.name}</TableCell>
                          <TableCell>{clinic.city || '-'}</TableCell>
                          <TableCell>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(clinic.id);
                              }}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>

            {/* Edit Form */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h2 className="text-lg font-semibold mb-4">
                {selectedClinic ? 'Edit Clinic' : 'Create New Clinic'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Clinic Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter clinic name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Address
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    City
                  </label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className="w-full"
                  />
                </div>

                {message && (
                  <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">
                    {message}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {saving ? 'Saving...' : selectedClinic ? 'Update' : 'Create'}
                  </Button>
                  <Button
                    onClick={handleRefresh}
                    variant="outline"
                    className="flex-1"
                  >
                    Refresh
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
