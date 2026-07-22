import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import Select from '@/components/Select.jsx';
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

export default function SuperAdminUsers() {
  const [usersList, setUsersList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    role: 'therapist',
    clinic_id: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [clinicsList, setClinicsList] = useState([]);

  // Fetch users and clinics
  useEffect(() => {
    fetchUsers();
    fetchClinics();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await apiServerClient.fetch('/super-admin/users');
      setUsersList(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchClinics = async () => {
    try {
      const data = await apiServerClient.fetch('/super-admin/clinics');
      setClinicsList(data);
    } catch (err) {
      console.error('Failed to fetch clinics:', err);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUserId(user.id);
    setFormData({
      email: user.email,
      fullName: user.fullName,
      password: '', // Don't show password in edit mode
      role: user.role,
      clinic_id: user.clinic_id || '',
      phone: user.phone || ''
    });
    setMessage('');
  };

  const handleNewUser = () => {
    setSelectedUserId(null);
    setFormData({
      email: '',
      fullName: '',
      password: '',
      role: 'therapist',
      clinic_id: '',
      phone: ''
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
      if (!formData.email.trim() || !formData.fullName.trim()) {
        toast.error('Email and fullName are required');
        return;
      }

      if (!selectedUserId && !formData.password.trim()) {
        toast.error('Password is required for new users');
        return;
      }

      const roleRequiresClinic = formData.role !== 'super_admin';
      if (roleRequiresClinic && !formData.clinic_id) {
        toast.error('Clinic is required for admin, therapist, and patient roles');
        return;
      }

      setSaving(true);
      let result;
      const payload = {
        email: formData.email,
        fullName: formData.fullName,
        role: formData.role,
        clinic_id: formData.role === 'super_admin' ? null : formData.clinic_id,
        phone: formData.phone || null
      };

      if (selectedUserId) {
        // Update existing - don't send password if empty
        await apiServerClient.fetch(`/super-admin/users/${selectedUserId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        setUsersList(prev =>
          prev.map(u => u.id === selectedUserId ? { ...u, ...payload } : u)
        );
        toast.success('User updated successfully');
      } else {
        // Create new - must have password
        const createPayload = { ...payload, password: formData.password };
        result = await apiServerClient.fetch('/super-admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(createPayload)
        });
        setUsersList(prev => [...prev, result]);
        toast.success('User created successfully');
        handleNewUser();
      }

      setMessage('Changes saved successfully');
    } catch (err) {
      console.error('Failed to save user:', err);
      toast.error(err.message || 'Failed to save user');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await apiServerClient.fetch(`/super-admin/users/${id}`, { method: 'DELETE' });
      setUsersList(prev => prev.filter(u => u.id !== id));
      if (selectedUserId === id) {
        handleNewUser();
      }
      toast.success('User deleted successfully');
    } catch (err) {
      console.error('Failed to delete user:', err);
      toast.error('Failed to delete user');
    }
  };

  const handleRefresh = () => {
    fetchUsers();
    toast.success('Users refreshed');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          <div className="flex-1 flex items-center justify-center w-full p-8">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading users...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
        <Header />
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Users Management</h1>
            <p className="text-muted-foreground">Manage all users (admins, therapists, and patients)</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.4fr] gap-6">
            {/* Users List */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Users List</h2>
                  <p className="text-sm text-muted-foreground">Pilih user atau buat baru</p>
                </div>
                <Button
                  onClick={handleNewUser}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New
                </Button>
              </div>

              {usersList.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No users found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersList.map((user) => (
                        <TableRow
                          key={user.id}
                          className={`cursor-pointer transition-colors ${
                            selectedUserId === user.id
                              ? 'bg-blue-50 hover:bg-blue-50'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleSelectUser(user)}
                        >
                          <TableCell>
                            <div>
                              <p className="font-medium">{user.fullName}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              user.role === 'super_admin' ? 'bg-red-100 text-red-700' :
                              user.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {user.role}
                            </span>
                          </TableCell>
                          <TableCell>
                            {user.role !== 'super_admin' && (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(user.id);
                                }}
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
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
                {selectedUserId ? 'Edit User' : 'Create New User'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    disabled={selectedUserId ? true : false}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full"
                  />
                </div>

                {!selectedUserId && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Password *
                    </label>
                    <Input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      className="w-full"
                    />
                  </div>
                )}

                <div>
                  <Select
                    label="Role *"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    disabled={formData.role === 'super_admin'}
                    options={
                      formData.role === 'super_admin'
                        ? [{ label: 'Super Admin', value: 'super_admin' }]
                        : [
                            { label: 'Therapist', value: 'therapist' },
                            { label: 'Admin', value: 'admin' },
                            { label: 'Patient', value: 'patient' },
                          ]
                    }
                  />
                  {formData.role === 'super_admin' && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      There is only one super_admin account and its role cannot be changed.
                    </p>
                  )}
                </div>

                {formData.role !== 'super_admin' && (
                  <div>
                    <Select
                      label="Clinic *"
                      name="clinic_id"
                      value={formData.clinic_id}
                      onChange={handleInputChange}
                      options={clinicsList.map((clinic) => ({ label: clinic.name, value: clinic.id }))}
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      Clinic is required for admin, therapist, and patient roles.
                    </p>
                  </div>
                )}

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
                    {saving ? 'Saving...' : selectedUserId ? 'Update' : 'Create'}
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
